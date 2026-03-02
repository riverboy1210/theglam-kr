import fs from 'fs';
import path from 'path';

const GOOGLE_TAG = '  <meta name="google-site-verification" content="ddkEOwCZrlrsWD8FW1dT7T9nLVVEKOM1Rdm8E5VuaOg" />';
const NAVER_TAG = '  <meta name="naver-site-verification" content="NAVER_VERIFICATION_CODE_HERE">';

const dirs = ['boda', 'boda/services'];

for (const d of dirs) {
  const files = fs.readdirSync(d).filter(f => f.endsWith('.html'));
  for (const f of files) {
    const fp = path.join(d, f);
    let content = fs.readFileSync(fp, 'utf8');

    // Remove any broken "undefined" lines from previous attempt
    content = content.replace(/\n\s*undefined\s*\n/g, '\n');

    // Skip if already has correct google tag
    if (content.includes('google-site-verification') && !content.includes('undefined')) {
      console.log('SKIP:', fp);
      continue;
    }

    // Remove broken google tags if any
    content = content.replace(/.*google-site-verification.*\n?/g, '');

    if (content.includes('naver-site-verification')) {
      // Existing pages: add google after naver
      content = content.replace(
        /( *<meta name="naver-site-verification"[^>]*>)/,
        `$1\n${GOOGLE_TAG}`
      );
      console.log('GOOGLE ADDED:', fp);
    } else {
      // Service pages: add both naver + google after charset
      content = content.replace(
        /( *<meta charset="UTF-8">)/,
        `$1\n${NAVER_TAG}\n${GOOGLE_TAG}`
      );
      console.log('NAVER+GOOGLE ADDED:', fp);
    }

    fs.writeFileSync(fp, content);
  }
}
