import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAnalytics,
  logEvent,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZkbpv06C025wpJDlFlUNBPWzIzBVVwaw",
  authDomain: "portfolio-5795a.firebaseapp.com",
  projectId: "portfolio-5795a",
  storageBucket: "portfolio-5795a.firebasestorage.app",
  messagingSenderId: "351349399358",
  appId: "1:351349399358:web:325128a116b95ee190d66f",
  measurementId: "G-ZR5M847MKQ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// App click tracking
document.querySelectorAll(".store-link, .card-links a").forEach((link) => {
  link.addEventListener("click", () => {
    const card = link.closest(".project-card");
    let appName = "Unknown App";
    if (card) {
      appName = card.querySelector(".project-title")?.textContent || "Unknown App";
    }

    let linkType = "Web";
    const text = link.textContent.toLowerCase();
    if (text.includes("play store")) {
      linkType = "Google Play";
    } else if (text.includes("app store")) {
      linkType = "App Store";
    }

    logEvent(analytics, "click_app", {
      app_name: appName,
      link_url: link.href,
      link_type: linkType,
    });
  });
});

// Certificate click tracking
document.querySelectorAll(".course-item a").forEach((link) => {
  link.addEventListener("click", () => {
    const item = link.closest(".course-item");
    let certName = "Unknown Certificate";
    if (item) {
      const titleEl = item.querySelector(".course-info h3");
      if (titleEl) certName = titleEl.textContent;
    }

    logEvent(analytics, "click_certificate", {
      certificate_name: certName,
      link_url: link.href,
    });
  });
});

// CV download tracking
document.querySelector(".btn-cv")?.addEventListener("click", () => {
  logEvent(analytics, "download_cv", { source: "hero_button" });
});

// Filter tracking
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    logEvent(analytics, "filter_projects", { category: btn.dataset.filter });
  });
});
