#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const TARGETS = {
  jeomsin: { name: '점신', appId: 'kr.co.techlabs.jeomsin' },
  postellar: { name: '포스텔러', appId: 'com.scatch.tica' },
  hellobot: { name: '헬로우봇', appId: 'com.hellobot.app' },
  unsudowon: { name: '운수도원 투데이', appId: 'com.unsudowon.today' },
  ozstarot: { name: '오즈의타로', appId: 'com.oz.tarot' },
  inyeon: { name: '인연궁합', appId: 'com.inyeon.gunghap' },
  unsebigul: { name: '운세비결', appId: 'com.unse.secret' },
  'hori-ai': { name: '호리AI', appId: 'ai.hori.app' },
  'ari-saju': { name: '아리사주', appId: 'com.ari.saju' }
};

function parseArgs(argv) {
  const args = { target: null, limit: 20, delayMs: 1200 };
  argv.forEach((arg) => {
    if (arg.startsWith('--target=')) args.target = arg.split('=')[1];
    if (arg.startsWith('--limit=')) args.limit = Number(arg.split('=')[1]) || 20;
    if (arg.startsWith('--delay=')) args.delayMs = Number(arg.split('=')[1]) || 1200;
  });
  return args;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function loadGooglePlayReviews(appId, limit) {
  let gplay;
  try {
    gplay = await import('google-play-scraper');
  } catch {
    throw new Error('google-play-scraper not installed');
  }

  const result = await gplay.default.reviews({
    appId,
    sort: gplay.default.sort.NEWEST,
    num: limit,
    lang: 'ko',
    country: 'kr'
  });

  return (result.data || []).map((item) => ({
    score: item.score ?? null,
    text: item.text ?? '',
    date: item.date ? new Date(item.date).toISOString().slice(0, 10) : null,
    thumbsUp: item.thumbsUp ?? 0,
    url: `https://play.google.com/store/apps/details?id=${appId}`
  }));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const targetIds = args.target ? [args.target] : Object.keys(TARGETS);
  const outputDir = path.resolve('boda/data/raw-reviews');
  await ensureDir(outputDir);

  for (const targetId of targetIds) {
    const target = TARGETS[targetId];
    if (!target) {
      console.error(`[skip] unknown target: ${targetId}`);
      continue;
    }

    const now = new Date().toISOString();
    let reviews = [];
    let mode = 'live';
    try {
      reviews = await loadGooglePlayReviews(target.appId, args.limit);
      await sleep(args.delayMs);
    } catch (error) {
      mode = 'fallback';
      reviews = [];
      console.warn(`[warn] ${targetId}: ${error.message}`);
    }

    const payload = {
      serviceId: targetId,
      serviceName: target.name,
      source: 'Google Play Store',
      sourceUrl: `https://play.google.com/store/apps/details?id=${target.appId}`,
      mode,
      crawledAt: now,
      delayMs: args.delayMs,
      reviews
    };

    const filePath = path.join(outputDir, `${targetId}.json`);
    await fs.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
    console.log(`[ok] ${targetId}: ${reviews.length} reviews -> ${filePath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
