import fs from 'fs';
import path from 'path';

const CHARSET = '  <meta charset="UTF-8">';
const NAVER = '  <meta name="naver-site-verification" content="NAVER_VERIFICATION_CODE_HERE">';
const GOOGLE = '  <meta name="google-site-verification" content="ddkEOwCZrlrsWD8FW1dT7T9nLVVEKOM1Rdm8E5VuaOg" />';

// Fix service pages (boda/services/*.html) — missing charset + verification tags
const serviceDir = 'boda/services';
const serviceFiles = fs.readdirSync(serviceDir).filter(f => f.endsWith('.html'));

for (const f of serviceFiles) {
  const fp = path.join(serviceDir, f);
  let content = fs.readFileSync(fp, 'utf8');

  // Check if charset is missing
  const hasCharset = content.includes('charset="UTF-8"');
  const hasNaver = content.includes('naver-site-verification');
  const hasGoogle = content.includes('google-site-verification');

  if (hasCharset && hasNaver && hasGoogle) {
    console.log('OK:', fp);
    continue;
  }

  // Insert after <head>
  const insertBlock = [CHARSET, NAVER, GOOGLE].join('\n');
  
  if (!hasCharset) {
    // charset was removed — insert charset + naver + google after <head>
    content = content.replace('<head>', '<head>\n' + insertBlock);
  } else if (!hasGoogle) {
    // has charset but missing google
    if (hasNaver) {
      content = content.replace(
        /( *<meta name="naver-site-verification"[^>]*>)/,
        '$1\n' + GOOGLE
      );
    } else {
      content = content.replace(
        /( *<meta charset="UTF-8">)/,
        '$1\n' + NAVER + '\n' + GOOGLE
      );
    }
  }

  fs.writeFileSync(fp, content);
  console.log('FIXED:', fp, { hasCharset, hasNaver, hasGoogle });
}

// Verify existing pages (boda/*.html)
const mainDir = 'boda';
const mainFiles = fs.readdirSync(mainDir).filter(f => f.endsWith('.html'));

for (const f of mainFiles) {
  const fp = path.join(mainDir, f);
  const content = fs.readFileSync(fp, 'utf8');
  const ok = content.includes('charset="UTF-8"') && 
             content.includes('naver-site-verification') && 
             content.includes('google-site-verification');
  console.log(ok ? 'OK:' : 'MISSING:', fp);
}
