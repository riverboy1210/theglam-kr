import hashlib
import os
import re
from collections import deque
from pathlib import Path
from typing import Dict, Set, Tuple
from urllib.parse import urljoin, urlparse

import requests


START_URL = "https://minyeoneungoeroweo-efed5f.webflow.io/"
OUT_DIR = Path("site-mirror")
MAX_PAGES = 500


def is_http_url(value: str) -> bool:
    return value.startswith("http://") or value.startswith("https://")


def normalize_url(url: str) -> str:
    parsed = urlparse(url)
    scheme = parsed.scheme.lower() or "https"
    netloc = parsed.netloc.lower()
    path = parsed.path or "/"
    if path != "/" and path.endswith("/"):
        path = path[:-1]
    return f"{scheme}://{netloc}{path}" + (f"?{parsed.query}" if parsed.query else "")


def looks_like_page(url: str) -> bool:
    parsed = urlparse(url)
    path = parsed.path
    if not path or path.endswith("/"):
        return True
    if "." not in os.path.basename(path):
        return True
    return path.endswith(".html")


def html_output_path(url: str) -> Path:
    parsed = urlparse(url)
    path = parsed.path or "/"
    if path == "/":
        return OUT_DIR / "index.html"

    clean = path.lstrip("/")
    base = os.path.basename(clean)
    if "." in base:
        return OUT_DIR / clean

    return OUT_DIR / clean / "index.html"


def resource_output_path(url: str) -> Path:
    parsed = urlparse(url)
    host = parsed.netloc.lower()
    path = parsed.path or "/"
    if path.endswith("/"):
        path = path + "index"

    file_path = OUT_DIR / "external" / host / path.lstrip("/")
    if parsed.query:
        qhash = hashlib.sha1(parsed.query.encode("utf-8")).hexdigest()[:10]
        file_path = file_path.with_name(f"{file_path.name}__q_{qhash}")
    return file_path


def rel_path(from_file: Path, to_file: Path) -> str:
    return os.path.relpath(to_file, start=from_file.parent).replace("\\", "/")


def extract_urls(html: str, base_url: str) -> Set[str]:
    found: Set[str] = set()

    attr_pattern = re.compile(r"(?:href|src|poster)=['\"]([^'\"]+)['\"]", re.IGNORECASE)
    srcset_pattern = re.compile(r"srcset=['\"]([^'\"]+)['\"]", re.IGNORECASE)
    css_url_pattern = re.compile(r"url\(([^)]+)\)", re.IGNORECASE)

    for match in attr_pattern.findall(html):
        candidate = match.strip()
        if not candidate or candidate.startswith(("#", "mailto:", "tel:", "javascript:")):
            continue
        absolute = urljoin(base_url, candidate)
        if is_http_url(absolute):
            found.add(absolute)

    for srcset in srcset_pattern.findall(html):
        parts = [p.strip() for p in srcset.split(",") if p.strip()]
        for part in parts:
            candidate = part.split(" ")[0].strip()
            absolute = urljoin(base_url, candidate)
            if is_http_url(absolute):
                found.add(absolute)

    for raw in css_url_pattern.findall(html):
        candidate = raw.strip().strip("'\"")
        if not candidate or candidate.startswith(("data:", "#", "mailto:", "tel:", "javascript:")):
            continue
        absolute = urljoin(base_url, candidate)
        if is_http_url(absolute):
            found.add(absolute)

    return found


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    start = urlparse(START_URL)
    allowed_host = start.netloc.lower()

    session = requests.Session()
    session.headers.update(
        {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        }
    )

    queue = deque([START_URL])
    visited_pages: Set[str] = set()
    html_pages: Dict[str, Path] = {}
    html_texts: Dict[str, str] = {}
    resource_urls: Set[str] = set()

    while queue and len(visited_pages) < MAX_PAGES:
        current = queue.popleft()
        normalized = normalize_url(current)
        if normalized in visited_pages:
            continue

        parsed = urlparse(current)
        if parsed.netloc.lower() != allowed_host:
            continue

        try:
            resp = session.get(current, timeout=25)
        except Exception:
            continue

        if resp.status_code >= 400:
            continue

        content_type = resp.headers.get("content-type", "")
        if "text/html" not in content_type:
            continue

        visited_pages.add(normalized)
        out_path = html_output_path(current)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(resp.text, encoding="utf-8")
        html_pages[current] = out_path
        html_texts[current] = resp.text

        discovered = extract_urls(resp.text, current)
        for item in discovered:
            item_parsed = urlparse(item)
            if item_parsed.netloc.lower() == allowed_host and looks_like_page(item):
                queue.append(item)
            if is_http_url(item):
                resource_urls.add(item)

    # Do not treat html pages as resources.
    page_norm = {normalize_url(p) for p in html_pages.keys()}
    resource_urls = {u for u in resource_urls if normalize_url(u) not in page_norm}

    downloaded_resources: Dict[str, Path] = {}
    for resource_url in sorted(resource_urls):
        try:
            resp = session.get(resource_url, timeout=30)
        except Exception:
            continue
        if resp.status_code >= 400:
            continue

        out_path = resource_output_path(resource_url)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_bytes(resp.content)
        downloaded_resources[resource_url] = out_path

    # Rewrite links in HTML to local paths.
    for page_url, page_path in html_pages.items():
        html = html_texts[page_url]

        # Rewrite page links.
        for target_url, target_path in html_pages.items():
            abs_a = target_url
            abs_b = normalize_url(target_url)
            if target_path.name == "index.html":
                local = rel_path(page_path, target_path.parent / "index.html")
            else:
                local = rel_path(page_path, target_path)

            if target_path.name == "index.html":
                clean_local = rel_path(page_path, target_path.parent / "index.html")
            else:
                clean_local = local

            html = html.replace(abs_a, clean_local)
            html = html.replace(abs_b, clean_local)

        # Rewrite resources.
        for resource_url, resource_path in downloaded_resources.items():
            local = rel_path(page_path, resource_path)
            html = html.replace(resource_url, local)

        # Protocol-relative resources.
        for resource_url, resource_path in downloaded_resources.items():
            parsed = urlparse(resource_url)
            protocol_relative = f"//{parsed.netloc}{parsed.path}" + (f"?{parsed.query}" if parsed.query else "")
            local = rel_path(page_path, resource_path)
            html = html.replace(protocol_relative, local)

        page_path.write_text(html, encoding="utf-8")

    print(f"Mirrored pages: {len(html_pages)}")
    print(f"Downloaded assets: {len(downloaded_resources)}")
    print(f"Output directory: {OUT_DIR.resolve()}")


if __name__ == "__main__":
    main()
