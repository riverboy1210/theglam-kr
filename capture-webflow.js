const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Use relative path from current working directory
const EVIDENCE_DIR = '.sisyphus/evidence';
const BASE_URL = 'https://minyeoneungoeroweo-efed5f.design.webflow.com/';

// Ensure directory exists
if (!fs.existsSync(EVIDENCE_DIR)) {
  fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
}

async function captureWebflowSite() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    pages: [],
    allImages: new Set(),
    allText: [],
    navigationLinks: [],
    colorScheme: [],
    typography: []
  };

  try {
    console.log('Starting Webflow site capture...');
    console.log('Evidence directory:', EVIDENCE_DIR);
    
    // Navigate to the site with longer timeout
    console.log(`Navigating to ${BASE_URL}`);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000);
    
    // Capture the homepage
    const homePageData = await capturePage(page, BASE_URL, 'home');
    report.pages.push(homePageData);
    
    // Merge data
    homePageData.images.forEach(img => report.allImages.add(img));
    report.allText.push(...homePageData.textContent);
    report.navigationLinks.push(...homePageData.navigationLinks);
    
    // Extract color scheme and typography
    const styles = await page.evaluate(() => {
      const colors = new Set();
      const fonts = new Set();
      
      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const bgColor = style.backgroundColor;
        const fontFamily = style.fontFamily;
        
        if (color && color !== 'rgba(0, 0, 0, 0)') colors.add(color);
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') colors.add(bgColor);
        if (fontFamily) fonts.add(fontFamily);
      });
      
      return {
        colors: Array.from(colors).slice(0, 20),
        fonts: Array.from(fonts).slice(0, 10)
      };
    });
    
    report.colorScheme = styles.colors;
    report.typography = styles.fonts;
    
    // Check for multiple pages
    const navLinks = await page.evaluate(() => {
      const links = [];
      document.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
          links.push({
            text: a.textContent.trim(),
            href: href
          });
        }
      });
      return links;
    });
    
    console.log(`Found ${navLinks.length} internal navigation links`);
    
    // Visit unique internal pages
    const visitedPages = new Set(['/']);
    for (const link of navLinks.slice(0, 10)) {
      const fullUrl = new URL(link.href, BASE_URL).href;
      const pathname = new URL(link.href, BASE_URL).pathname;
      
      if (!visitedPages.has(pathname) && fullUrl.startsWith(BASE_URL)) {
        visitedPages.add(pathname);
        console.log(`Visiting: ${link.text} (${pathname})`);
        
        try {
          await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
          await page.waitForTimeout(2000);
          
          const pageData = await capturePage(page, fullUrl, pathname.replace(/\//g, '-').slice(1) || 'index');
          report.pages.push(pageData);
          
          pageData.images.forEach(img => report.allImages.add(img));
          report.allText.push(...pageData.textContent);
        } catch (e) {
          console.error(`Failed to visit ${fullUrl}: ${e.message}`);
        }
      }
    }
    
    // Save comprehensive report
    const reportPath = path.join(EVIDENCE_DIR, 'site-capture-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      ...report,
      allImages: Array.from(report.allImages)
    }, null, 2));
    
    console.log(`Report saved to ${reportPath}`);
    console.log(`Total pages captured: ${report.pages.length}`);
    console.log(`Total unique images: ${report.allImages.size}`);
    
  } catch (error) {
    console.error('Error during capture:', error);
  } finally {
    await browser.close();
  }
}

async function capturePage(page, url, pageName) {
  console.log(`Capturing page: ${pageName}`);
  
  // Take full page screenshot
  const screenshotPath = path.join(EVIDENCE_DIR, `${pageName}-full.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Screenshot saved: ${screenshotPath}`);
  
  // Extract all content
  const pageData = await page.evaluate(() => {
    // Get all text content
    const textContent = [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (text && text.length > 0) {
        textContent.push(text);
      }
    }
    
    // Get all images
    const images = [];
    document.querySelectorAll('img').forEach(img => {
      if (img.src) images.push(img.src);
    });
    
    // Get background images from CSS
    document.querySelectorAll('[style*="background-image"]').forEach(el => {
      const style = el.getAttribute('style');
      const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (match) images.push(match[1]);
    });
    
    // Get navigation links
    const navigationLinks = [];
    document.querySelectorAll('nav a, .nav a, [role="navigation"] a').forEach(a => {
      navigationLinks.push({
        text: a.textContent.trim(),
        href: a.getAttribute('href')
      });
    });
    
    // Get page structure
    const structure = [];
    document.querySelectorAll('header, nav, main, section, footer, [role="main"], [role="navigation"]').forEach(el => {
      structure.push({
        tag: el.tagName.toLowerCase(),
        class: el.className,
        id: el.id,
        children: el.children.length
      });
    });
    
    return {
      textContent,
      images: [...new Set(images)],
      navigationLinks,
      structure
    };
  });
  
  // Save page HTML
  const htmlPath = path.join(EVIDENCE_DIR, `${pageName}-source.html`);
  const html = await page.content();
  fs.writeFileSync(htmlPath, html);
  console.log(`HTML saved: ${htmlPath}`);
  
  // Save text content
  const textPath = path.join(EVIDENCE_DIR, `${pageName}-text.txt`);
  fs.writeFileSync(textPath, pageData.textContent.join('\n'));
  console.log(`Text content saved: ${textPath}`);
  
  return {
    url,
    pageName,
    screenshotPath,
    htmlPath,
    textPath,
    ...pageData
  };
}

captureWebflowSite().catch(console.error);
