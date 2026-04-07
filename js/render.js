// ============================================
// Link builders
// ============================================
const LINK_CONFIG = {
  play:   { icon: "fab fa-google-play",      label: "Play Store" },
  apple:  { icon: "fab fa-app-store-ios",    label: "App Store" },
  web:    { icon: "fas fa-globe",            label: "Website" },
  github: { icon: "fab fa-github",           label: "Preview" },
  demo:   { icon: "fas fa-video",            label: "Demo" },
};

function buildStoreLink(link) {
  if (link.type === "pending") {
    return '<span class="pending-badge">Pending Release</span>';
  }
  const cfg = LINK_CONFIG[link.type];
  return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="store-link"><i class="${cfg.icon}"></i> ${cfg.label}</a>`;
}

// ============================================
// Section renderers
// ============================================

function renderStats() {
  const grid = document.querySelector(".stats-grid");
  if (!grid) return;
  grid.innerHTML = DATA.stats
    .map(
      (s) => `
    <div class="stat-item reveal ${s.delayClass}">
      <span class="stat-number" data-target="${s.target}">0+</span>
      <span class="stat-label">${s.label}</span>
    </div>`
    )
    .join("");
}

function renderExperience() {
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;
  timeline.innerHTML = DATA.experience
    .map(
      (job) => `
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-date">${job.date}</div>
      <div class="timeline-content">
        <h3>${job.title}</h3>
        <h4>${job.company} ${job.badges.map((b) => `<span class="badge">${b}</span>`).join(" ")}</h4>
        <ul>${job.points.map((p) => `<li>${p}</li>`).join("")}</ul>
      </div>
    </div>`
    )
    .join("");
}

function renderFilterBar() {
  const bar = document.querySelector(".filter-bar");
  if (!bar) return;
  bar.innerHTML = DATA.filterCategories
    .map(
      (f) =>
        `<button class="filter-btn${f.key === "all" ? " active" : ""}" data-filter="${f.key}">${f.label}</button>`
    )
    .join("");
}

function renderProjects() {
  const grid = document.querySelector(".projects-grid");
  if (!grid) return;
  grid.innerHTML = DATA.projects
    .map(
      (p) => `
    <div class="project-card reveal" data-category="${p.category}">
      <div class="card-header">
        <img src="${p.icon}" alt="${p.name}" class="project-icon" loading="lazy" decoding="async" width="60" height="60" />
        <h3 class="project-title">${p.name}</h3>
        <span class="project-tag">${p.tag}</span>
      </div>
      <p class="project-desc">${p.desc}</p>
      <div class="tech-stack-mini">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
      <div class="card-links">${p.links.map(buildStoreLink).join("")}</div>
    </div>`
    )
    .join("");
}

function renderSkills() {
  const grid = document.querySelector(".skills-grid");
  if (!grid) return;
  grid.innerHTML = DATA.skills
    .map(
      (s) => `
    <div class="skill-category reveal">
      <h3>${s.title}</h3>
      <div class="skill-tags">${s.tags.map((t) => `<span>${t}</span>`).join("")}</div>
    </div>`
    )
    .join("");
}

function renderCourses() {
  const list = document.querySelector(".courses-list");
  if (!list) return;
  list.innerHTML = DATA.courses
    .map((c) => {
      let right = "";
      if (c.tags) {
        right = `<div class="course-tags">${c.tags.map((t) => `<a href="${t.url}" target="_blank" rel="noopener noreferrer">${t.label}</a>`).join("")}</div>`;
      } else if (c.certificates) {
        right = c.certificates
          .map((cert) => {
            if (cert.noLink) {
              return '<span class="icon-link"><img src="./assets/certificate.svg" alt="Certificate" loading="lazy" decoding="async" /></span>';
            }
            return `<a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="icon-link"><img src="./assets/certificate.svg" alt="View Certificate" loading="lazy" decoding="async" /></a>`;
          })
          .join("");
      }

      return `
    <div class="course-item reveal">
      <div class="course-info">
        <h3>${c.title}</h3>
        ${c.subtitle ? `<p>${c.subtitle}</p>` : ""}
        ${c.tags ? right : ""}
      </div>
      ${!c.tags ? right : ""}
    </div>`;
    })
    .join("");
}

function renderContact() {
  const ct = DATA.contact;
  const wrap = document.querySelector(".contact-links");
  if (!wrap) return;
  wrap.innerHTML = `
    <a href="tel:${ct.phone}" class="contact-btn">
      <img src="./assets/phone.svg" alt="Phone" loading="lazy" decoding="async" />
      <span>${ct.phone}</span>
    </a>
    <a href="mailto:${ct.email}" class="contact-btn">
      <img src="./assets/email.svg" alt="Email" loading="lazy" decoding="async" />
      <span>${ct.email}</span>
    </a>
    <a href="${ct.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-btn">
      <img src="./assets/linkedin.svg" alt="LinkedIn" loading="lazy" decoding="async" />
      <span>LinkedIn</span>
    </a>
    <a href="${ct.github}" target="_blank" rel="noopener noreferrer" class="contact-btn">
      <img src="./assets/github.svg" alt="GitHub" loading="lazy" decoding="async" />
      <span>GitHub</span>
    </a>`;
}

// ============================================
// Render all sections
// ============================================
function renderAll() {
  renderStats();
  renderExperience();
  renderFilterBar();
  renderProjects();
  renderSkills();
  renderCourses();
  renderContact();
}

renderAll();
