import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("site-mirror", "blog");
const OUT = path.resolve("redesign", "editorial", "BATCH_02_REAL_20.md");
const LIMIT = 20;

function stripTags(s) {
  return s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function sanitizeTitle(title) {
  return title
    .replace(/\s*\|\s*THE GLAM\s*$/i, "")
    .replace(/\s*-\s*미녀는\s*괴로워\s*$/i, "")
    .trim();
}

function pickType(slug, title, desc) {
  const text = `${slug} ${title} ${desc}`.toLowerCase();
  if (/(price|cost|coupon|event|biyong|gagyeog)/.test(text)) return "PRICE";
  if (/(side|risk|warning|complication|bujag|safe|anesthesia)/.test(text)) return "SAFETY";
  if (/(recovery|timing|day|postop|hoebog|care)/.test(text)) return "RECOVERY";
  return "CLINIC_CHOICE";
}

function templates(type) {
  if (type === "PRICE") {
    return {
      hook: "가격만 보면 쉬워 보이지만, 실제 만족도는 포함 항목과 회복 편의성에서 갈립니다.",
      points: [
        "이벤트가 적용 조건/기간",
        "마취·검사·사후관리 포함 여부",
        "추가 비용 발생 조건"
      ]
    };
  }
  if (type === "SAFETY") {
    return {
      hook: "예뻐지는 결정일수록 안전 기준이 먼저입니다. 불안은 체크리스트로 줄일 수 있습니다.",
      points: [
        "응급 신호 기준 정리",
        "야간/주말 연락 경로",
        "의료진 상담 전 질문"
      ]
    };
  }
  if (type === "RECOVERY") {
    return {
      hook: "결과보다 먼저 알아야 할 것은 회복 일정입니다. 일상 복귀 기준이 불안을 줄입니다.",
      points: [
        "1~14일 회복 포인트",
        "출근/운동/세안 복귀 기준",
        "재진/추적관리 일정"
      ]
    };
  }
  return {
    hook: "후기 수보다 중요한 것은 내 조건과 비슷한 사례를 찾는 방식입니다.",
    points: [
      "상담 질문 템플릿",
      "후기 신뢰도 판단 기준",
      "비교표 항목 통일"
    ]
  };
}

async function main() {
  const entries = await fs.readdir(ROOT, { withFileTypes: true });
  const slugs = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort().slice(0, LIMIT);

  const sections = [];
  for (let i = 0; i < slugs.length; i += 1) {
    const slug = slugs[i];
    const file = path.join(ROOT, slug, "index.html");
    const html = await fs.readFile(file, "utf8");

    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const descMatch = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/i);

    const title = stripTags(titleMatch?.[1] || slug.replace(/-/g, " "));
    const desc = stripTags(descMatch?.[1] || "");
    const type = pickType(slug, title, desc);
    const t = templates(type);

    const h1 = sanitizeTitle(title);
    const meta = desc || `${h1} 관련 핵심 정보를 여성 독자의 의사결정 관점에서 재정리했습니다.`;

    sections.push(`## ${String(i + 1).padStart(2, "0")}) ${type} - ${h1}\n` +
      `- Source slug: \`${slug}\`\n` +
      `- SEO Title: ${h1} | THE GLAM\n` +
      `- Meta: ${meta}\n` +
      `- Slug: ${slug}\n\n` +
      `### Hook\n${t.hook}\n\n` +
      `### 핵심 체크\n- ${t.points[0]}\n- ${t.points[1]}\n- ${t.points[2]}\n\n` +
      `### CTA\n- 바비톡 원문 확인: https://www.babitalk.com/\n- 강남언니 원문 확인: https://www.gangnamunni.com/\n- 상담 연결: tel:0233333539\n- 상담 메일: mailto:hello@theglam.kr\n\n` +
      `### 안전 문구\n본 내용은 외부 공개 후기의 공통 패턴을 재정리한 요약 정보이며, 원문은 각 플랫폼에서 직접 확인하세요.\n`);
  }

  const output = `# BATCH 02 - Real Source Transform (20)\n\n` +
    `Generated from first 20 mirrored source posts under \`site-mirror/blog/*/index.html\`.\n` +
    `Audience: young women interested in beauty procedures.\n` +
    `Goal: insight summary -> platform cross-check -> clinic contact action.\n\n` +
    sections.join("\n---\n\n");

  await fs.writeFile(OUT, output, "utf8");
  console.log(`Wrote ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
