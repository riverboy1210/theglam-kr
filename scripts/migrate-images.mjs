import { createWriteStream } from 'node:fs';
import { mkdir, readdir, readFile, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'site-mirror', 'blog');
const IMAGES_DIR = path.join(ROOT, 'redesign', 'images');
const DATA_DIR = path.join(ROOT, 'redesign', 'data');
const MAP_FILE = path.join(DATA_DIR, 'image-map.json');

const CONCURRENCY = 10;
const MAX_ATTEMPTS = 2;
const URL_REGEX = /https:\/\/cdn\.prod\.website-files\.com\/[^\s"'()<>]+?\.(?:jpeg|jpg|png|webp|svg|gif)(?:\?[^\s"'<>)]*)?/gi;
const INVALID_FILE_CHARS = /[<>:"/\\|?*\x00-\x1F]/g;

async function getBlogIndexFiles() {
  const entries = await readdir(BLOG_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(BLOG_DIR, entry.name, 'index.html'))
    .sort();
}

function extractUniqueImageUrls(html) {
  const matches = html.match(URL_REGEX) || [];
  return matches.map((url) => url.replace(/[),.;]+$/, ''));
}

function safeDecode(value) {
  let current = value;
  for (let i = 0; i < 5; i += 1) {
    try {
      const decoded = decodeURIComponent(current);
      if (decoded === current) {
        break;
      }
      current = decoded;
    } catch {
      break;
    }
  }
  return current;
}

function sanitizeFilename(name) {
  const cleaned = name.replace(INVALID_FILE_CHARS, '_').trim();
  if (!cleaned || cleaned === '.' || cleaned === '..') {
    return 'image';
  }
  return cleaned;
}

function baseFilenameFromUrl(cdnUrl, fallbackIndex) {
  const parsed = new URL(cdnUrl);
  const rawSegment = parsed.pathname.split('/').pop() || '';
  const decoded = safeDecode(rawSegment);
  const sanitized = sanitizeFilename(path.basename(decoded));
  if (sanitized === 'image') {
    return `image-${fallbackIndex}`;
  }
  return sanitized;
}

function buildUniqueFilename(baseName, usedNames) {
  if (!usedNames.has(baseName)) {
    usedNames.add(baseName);
    return baseName;
  }

  const parsed = path.parse(baseName);
  let index = 2;
  while (true) {
    const candidate = `${parsed.name}-${index}${parsed.ext}`;
    if (!usedNames.has(candidate)) {
      usedNames.add(candidate);
      return candidate;
    }
    index += 1;
  }
}

function downloadFile(url, destinationPath, attempt = 1) {
  const fsPath = process.platform === 'win32' ? path.toNamespacedPath(destinationPath) : destinationPath;
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          referer: 'https://www.theglam.kr/',
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        },
      },
      (response) => {
        const statusCode = response.statusCode || 0;

        if (statusCode >= 300 && statusCode < 400 && response.headers.location) {
          response.resume();
          const redirected = new URL(response.headers.location, url).toString();
          downloadFile(redirected, destinationPath, attempt).then(resolve).catch(reject);
          return;
        }

        if (statusCode !== 200) {
          response.resume();
          reject(new Error(`HTTP ${statusCode}`));
          return;
        }

        const fileStream = createWriteStream(fsPath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close(() => resolve());
        });

        fileStream.on('error', async (error) => {
          response.destroy();
          try {
            await unlink(fsPath);
          } catch {
            // ignore cleanup errors
          }
          reject(error);
        });
      }
    );

    request.setTimeout(30000, () => {
      request.destroy(new Error('Request timeout'));
    });

    request.on('error', async (error) => {
      try {
        await unlink(fsPath);
      } catch {
        // ignore cleanup errors
      }

      if (attempt < MAX_ATTEMPTS) {
        downloadFile(url, destinationPath, attempt + 1).then(resolve).catch(reject);
        return;
      }

      reject(error);
    });
  });
}

async function runWithConcurrency(items, limit, worker) {
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const current = nextIndex;
      nextIndex += 1;
      if (current >= items.length) {
        break;
      }
      await worker(items[current], current);
    }
  });

  await Promise.all(workers);
}

async function main() {
  await mkdir(IMAGES_DIR, { recursive: true });
  await mkdir(DATA_DIR, { recursive: true });

  const blogIndexFiles = await getBlogIndexFiles();
  const uniqueUrls = new Set();

  for (const indexFile of blogIndexFiles) {
    const html = await readFile(indexFile, 'utf8');
    const urls = extractUniqueImageUrls(html);
    for (const url of urls) {
      uniqueUrls.add(url);
    }
  }

  const urlList = [...uniqueUrls].sort();
  const usedFilenames = new Set();
  const planned = [];
  const imageMap = {};

  for (let i = 0; i < urlList.length; i += 1) {
    const cdnUrl = urlList[i];
    const baseName = baseFilenameFromUrl(cdnUrl, i + 1);
    const filename = buildUniqueFilename(baseName, usedFilenames);
    planned.push({ cdnUrl, filename, destination: path.join(IMAGES_DIR, filename) });
    imageMap[cdnUrl] = filename;
  }

  let downloaded = 0;
  let failures = 0;

  console.log(`Found ${blogIndexFiles.length} blog files`);
  console.log(`Found ${planned.length} unique CDN images`);

  await runWithConcurrency(planned, CONCURRENCY, async (item) => {
    try {
      await downloadFile(item.cdnUrl, item.destination);
      downloaded += 1;
    } catch (error) {
      failures += 1;
      console.error(`Failed: ${item.cdnUrl} (${error.message})`);
    }

    console.log(`Downloaded ${downloaded}/${planned.length} images, ${failures} failures`);
  });

  await writeFile(MAP_FILE, JSON.stringify(imageMap, null, 2), 'utf8');
  console.log('Done');
  console.log(`Downloaded ${downloaded}/${planned.length} images, ${failures} failures`);
  console.log(`Image map written to ${MAP_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
