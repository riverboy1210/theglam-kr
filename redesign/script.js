function renderMap(content) {
  const root = document.getElementById("map-grid");
  if (!root || !Array.isArray(content?.map)) return;
  root.innerHTML = content.map
    .map((section) => {
      const items = (section.items || []).map((x) => `<li>${x}</li>`).join("");
      return `<article><h3>${section.title}</h3><ul>${items}</ul></article>`;
    })
    .join("");
}

function renderMethods(content) {
  const root = document.getElementById("method-stack");
  if (!root || !Array.isArray(content?.methods)) return;
  root.innerHTML = content.methods
    .map((line, idx) => {
      const order = String(idx + 1).padStart(2, "0");
      return `<div class="stack-item"><span>${order}</span><p>${line}</p></div>`;
    })
    .join("");
}

function renderScenarios(content) {
  const root = document.getElementById("lab-cards");
  if (!root || !Array.isArray(content?.scenarios)) return;
  root.innerHTML = content.scenarios
    .map((item) => `<article><h3>${item.title}</h3><p>${item.body}</p></article>`)
    .join("");
}

function renderIntents(content) {
  const root = document.getElementById("intent-grid");
  if (!root || !Array.isArray(content?.intents)) return;
  root.innerHTML = content.intents
    .map(
      (item) =>
        `<article><h3>${item.title}</h3><p>${item.body}</p><p class="intent-keyword">핵심 키워드: ${item.keyword}</p><a class="intent-link" href="${item.href || "#"}">${item.linkLabel || "자세히 보기"}</a></article>`
    )
    .join("");
}

function renderFunnel(content) {
  const steps = document.getElementById("funnel-steps");
  if (steps && Array.isArray(content?.funnel)) {
    steps.innerHTML = content.funnel
      .map((item, idx) => `<div class="funnel-item"><span>${idx + 1}</span><p>${item}</p></div>`)
      .join("");
  }

  const cta = document.getElementById("cta-surface");
  if (cta && content?.cta) {
    const points = (content.cta.points || []).map((p) => `<li>${p}</li>`).join("");
    cta.innerHTML = `
      <h3>${content.cta.headline}</h3>
      <ul>${points}</ul>
      <div class="cta-actions">
        <a class="btn primary" href="${content.cta.primaryHref || "#"}">${content.cta.primary}</a>
        <a class="btn" href="${content.cta.secondaryHref || "#"}">${content.cta.secondary}</a>
      </div>
    `;
  }
}

function renderLegal(content) {
  const box = document.getElementById("policy-box");
  if (!box || !Array.isArray(content?.legal)) return;
  box.innerHTML = `
    <h3>운영 전 체크리스트</h3>
    <ul>${content.legal.map((x) => `<li>${x}</li>`).join("")}</ul>
  `;
}

function renderFooter(content) {
  const brand = document.getElementById("footer-brand");
  const contact = document.getElementById("footer-contact");
  if (brand && content?.brand?.name && content?.brand?.year) {
    brand.textContent = `© ${content.brand.year} ${content.brand.name}`;
  }
  if (contact && content?.brand?.email) {
    const phone = content?.brand?.phone ? ` | ${content.brand.phone}` : "";
    contact.textContent = `contact: ${content.brand.email}${phone}`;
  }
}

function bindScrollButtons() {
  const buttons = document.querySelectorAll("[data-scroll]");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const selector = button.getAttribute("data-scroll");
      if (!selector) return;
      const target = document.querySelector(selector);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function applyContent() {
  const content = window.GLAM_CONTENT;
  if (!content) return;
  renderMap(content);
  renderMethods(content);
  renderScenarios(content);
  renderIntents(content);
  renderFunnel(content);
  renderLegal(content);
  renderFooter(content);
}

applyContent();
bindScrollButtons();
