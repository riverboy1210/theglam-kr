import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const START_URL = "https://minyeoneungoeroweo-efed5f.webflow.io/";
const OUT_DIR = path.resolve("site-mirror");
const MAX_PAGES = 120;
const ALLOWED_RESOURCE_HOSTS = new Set([
  "minyeoneungoeroweo-efed5f.webflow.io",
  "cdn.prod.website-files.com",
  "ajax.googleapis.com",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
]);
const ALLOWED_RESOURCE_EXT = new Set([
  ".css",
  ".js",
  ".json",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".svg",
  ".gif",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".mp4",
  ".webm",
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function normalizeUrl(input) {
  const u = new URL(input);
  let p = u.pathname || "/";
  if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
  return `${u.protocol}//${u.host}${p}${u.search}`;
}

function looksLikePage(input) {
  const u = new URL(input);
  const p = u.pathname;
  if (!p || p.endsWith("/")) return true;
  const base = path.posix.basename(p);
  if (!base.includes(".")) return true;
  return base.endsWith(".html");
}

function pageCanonical(input) {
  const u = new URL(input);
  let p = u.pathname || "/";
  if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
  return `${u.protocol}//${u.host}${p}`;
}

function looksLikeAllowedResource(input) {
  const u = new URL(input);
  const host = u.host.toLowerCase();
  if (!ALLOWED_RESOURCE_HOSTS.has(host)) return false;
  const ext = path.posix.extname(u.pathname || "").toLowerCase();
  if (ext && ALLOWED_RESOURCE_EXT.has(ext)) return true;
  // Some Webflow assets can be extensionless; keep only on cdn host.
  if (host === "cdn.prod.website-files.com") return true;
  return false;
}

function htmlOutPath(input) {
  const u = new URL(input);
  const p = u.pathname || "/";
  if (p === "/") return path.join(OUT_DIR, "index.html");
  const clean = p.replace(/^\/+/, "");
  const base = path.posix.basename(clean);
  if (base.includes(".")) return path.join(OUT_DIR, clean);
  return path.join(OUT_DIR, clean, "index.html");
}

function resourceOutPath(input) {
  const u = new URL(input);
  const host = u.host.toLowerCase();
  let p = u.pathname || "/";
  if (p.endsWith("/")) p += "index";
  const base = path.join(OUT_DIR, "external", host, p.replace(/^\/+/, ""));
  if (!u.search) return base;
  const qHash = crypto.createHash("sha1").update(u.search).digest("hex").slice(0, 10);
  return `${base}__q_${qHash}`;
}

function rel(fromFile, toFile) {
  return path.relative(path.dirname(fromFile), toFile).split(path.sep).join("/");
}

function extractUrls(html, baseUrl) {
  const found = new Set();

  const attrRe = /(?:href|src|poster)=['\"]([^'\"]+)['\"]/gi;
  const srcsetRe = /srcset=['\"]([^'\"]+)['\"]/gi;
  const cssUrlRe = /url\(([^)]+)\)/gi;

  for (const m of html.matchAll(attrRe)) {
    const c = m[1].trim();
    if (!c || c.startsWith("#") || c.startsWith("mailto:") || c.startsWith("tel:") || c.startsWith("javascript:")) continue;
    try {
      const abs = new URL(c, baseUrl).toString();
      if (abs.startsWith("http://") || abs.startsWith("https://")) found.add(abs);
    } catch {
      // ignore invalid url
    }
  }

  for (const m of html.matchAll(srcsetRe)) {
    const value = m[1];
    const parts = value.split(",").map((x) => x.trim()).filter(Boolean);
    for (const p of parts) {
      const c = p.split(/\s+/)[0]?.trim();
      if (!c) continue;
      try {
        const abs = new URL(c, baseUrl).toString();
        if (abs.startsWith("http://") || abs.startsWith("https://")) found.add(abs);
      } catch {
        // ignore invalid url
      }
    }
  }

  for (const m of html.matchAll(cssUrlRe)) {
    const c = m[1].trim().replace(/^['\"]|['\"]$/g, "");
    if (!c || c.startsWith("data:") || c.startsWith("#") || c.startsWith("mailto:") || c.startsWith("tel:") || c.startsWith("javascript:")) continue;
    try {
      const abs = new URL(c, baseUrl).toString();
      if (abs.startsWith("http://") || abs.startsWith("https://")) found.add(abs);
    } catch {
      // ignore invalid url
    }
  }

  return found;
}

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  const res = await fetch(url, {
    signal: controller.signal,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    },
  });
  clearTimeout(timer);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return { body: await res.text(), contentType: res.headers.get("content-type") || "" };
}

async function fetchBuffer(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  const res = await fetch(url, {
    signal: controller.signal,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    },
  });
  clearTimeout(timer);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const start = new URL(START_URL);
  const host = start.host.toLowerCase();

  const queue = [START_URL];
  const visited = new Set();
  const pages = new Map();
  const htmls = new Map();
  const resources = new Set();

  while (queue.length && visited.size < MAX_PAGES) {
    const current = queue.shift();
    const key = pageCanonical(current);
    if (visited.has(key)) continue;

    const u = new URL(current);
    if (u.host.toLowerCase() !== host) continue;

    try {
      const { body, contentType } = await fetchText(current);
      if (!contentType.includes("text/html")) continue;

      visited.add(key);
      const out = htmlOutPath(current);
      await ensureDir(out);
      await fs.writeFile(out, body, "utf8");
      pages.set(current, out);
      htmls.set(current, body);

      const discovered = extractUrls(body, current);
      for (const url of discovered) {
        try {
          const du = new URL(url);
          if (du.host.toLowerCase() === host && looksLikePage(url)) {
            queue.push(pageCanonical(url));
          }
          if ((url.startsWith("http://") || url.startsWith("https://")) && looksLikeAllowedResource(url)) {
            resources.add(url);
          }
        } catch {
          // ignore
        }
      }

      await sleep(100);
    } catch {
      // ignore page failures
    }
  }

  const pageKeys = new Set([...pages.keys()].map(pageCanonical));
  const resourceList = [...resources].filter((r) => !pageKeys.has(pageCanonical(r)));

  const downloaded = new Map();
  for (const r of resourceList) {
    try {
      const buf = await fetchBuffer(r);
      const out = resourceOutPath(r);
      await ensureDir(out);
      await fs.writeFile(out, buf);
      downloaded.set(r, out);
      await sleep(50);
    } catch {
      // ignore asset failures
    }
  }

  for (const [pageUrl, pagePath] of pages.entries()) {
    let html = htmls.get(pageUrl) || "";

    for (const [targetUrl, targetPath] of pages.entries()) {
      const local = rel(pagePath, targetPath);
      html = html.split(targetUrl).join(local);
      html = html.split(normalizeUrl(targetUrl)).join(local);
    }

    for (const [resourceUrl, resourcePath] of downloaded.entries()) {
      const local = rel(pagePath, resourcePath);
      html = html.split(resourceUrl).join(local);

      const ru = new URL(resourceUrl);
      const protocolRel = `//${ru.host}${ru.pathname}${ru.search}`;
      html = html.split(protocolRel).join(local);
    }

    await fs.writeFile(pagePath, html, "utf8");
  }

  console.log(`Mirrored pages: ${pages.size}`);
  console.log(`Downloaded assets: ${downloaded.size}`);
  console.log(`Output directory: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
