#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

function parseArgs(argv) {
  const args = { target: null, merge: false };
  argv.forEach((arg) => {
    if (arg.startsWith('--target=')) args.target = arg.split('=')[1];
    if (arg === '--merge') args.merge = true;
  });
  return args;
}

function classifySentiment(scores) {
  if (!scores.length) return 'neutral';
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  if (avg >= 4) return 'positive';
  if (avg <= 2.4) return 'negative';
  return 'neutral';
}

function topKeywords(texts) {
  const stop = new Set(['그리고', '하지만', '정말', '너무', '있는', '없는', '하는', '에서', '으로', '하면', '입니다']);
  const freq = new Map();
  texts.forEach((text) => {
    text.split(/[^\p{L}\p{N}]+/u).forEach((token) => {
      const word = token.trim();
      if (word.length < 2 || stop.has(word)) return;
      freq.set(word, (freq.get(word) || 0) + 1);
    });
  });
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([w]) => w);
}

function heuristicSummary(serviceName, count, sentiment) {
  if (!count) return `${serviceName}의 공개 리뷰가 충분하지 않아 요약 데이터를 수집 중입니다.`;
  if (sentiment === 'positive') return `${serviceName}은(는) 사용 편의성과 접근성 측면의 긍정 반응이 많았고, 세부 기능 완성도 관련 개선 의견이 일부 확인됩니다.`;
  if (sentiment === 'negative') return `${serviceName}은(는) 결제 체감과 기능 안정성에서 아쉬움을 언급하는 후기가 상대적으로 많았습니다.`;
  return `${serviceName}의 후기는 장단점이 혼재하며, 사용 목적과 예산에 따라 만족도가 달라지는 경향을 보입니다.`;
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const inputDir = path.resolve('boda/data/raw-reviews');
  const outputDir = path.resolve('boda/data/review-summaries');
  await ensureDir(outputDir);

  const files = (await fs.readdir(inputDir)).filter((f) => f.endsWith('.json'));
  const selected = args.target ? files.filter((f) => f === `${args.target}.json`) : files;

  const mergePayload = {};

  for (const file of selected) {
    const source = await readJson(path.join(inputDir, file));
    const reviews = Array.isArray(source.reviews) ? source.reviews : [];
    const texts = reviews.map((r) => String(r.text || '')).filter(Boolean);
    const scores = reviews.map((r) => Number(r.score)).filter((n) => Number.isFinite(n));

    const sentiment = classifySentiment(scores);
    const keywords = topKeywords(texts);
    const pros = keywords.slice(0, 3).map((k) => `${k} 관련 만족 의견`);
    const cons = keywords.slice(3, 6).map((k) => `${k} 관련 개선 의견`);

    const summary = {
      serviceId: source.serviceId,
      aiSummary: heuristicSummary(source.serviceName || source.serviceId, reviews.length, sentiment),
      sentiment,
      keywords,
      pros: pros.length ? pros : ['장점 데이터 수집 중'],
      cons: cons.length ? cons : ['개선 의견 데이터 수집 중'],
      sourceCount: 1,
      lastUpdated: new Date().toISOString().slice(0, 10),
      sources: [
        {
          name: source.source || 'Google Play Store',
          url: source.sourceUrl || 'https://play.google.com',
          reviewCount: reviews.length
        }
      ]
    };

    const outFile = path.join(outputDir, `${source.serviceId}.json`);
    await fs.writeFile(outFile, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
    mergePayload[source.serviceId] = summary;
    console.log(`[ok] ${source.serviceId}: summary generated -> ${outFile}`);
  }

  if (args.merge) {
    const mergePath = path.join(outputDir, 'merged-review-summary.json');
    await fs.writeFile(mergePath, `${JSON.stringify(mergePayload, null, 2)}\n`, 'utf8');
    console.log(`[ok] merged payload -> ${mergePath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
