// ===========================
// === VARIÁVEIS PRINCIPAIS ===
// ===========================
const themeToggle = document.getElementById("themeToggle");
const languageToggle = document.getElementById("languageToggle");
const body = document.body;

// ===============================
// === DICIONÁRIO DE TRADUÇÕES ===
// ===============================
const translations = {
  pt: {
    logo: "🌀 Bryyan.Dev",
    titulo_pagina: "Portfólio | Bryyan",
    nav_inicio: "Início",
    nav_sobre: "Sobre",
    nav_habilidades: "Habilidades",
    nav_projetos: "Projetos",
    nav_contato: "Contato",
    botao_tema: "Alternar Tema",
    contato_lets_talk: "Vamos Conversar?",
    contato_intro: "Se quiser conversar, colaborar ou só trocar uma ideia, meus contatos estão abaixo:",
    contato_email: "Email",
    contato_github: "GitHub",
    contato_linkedin: "LinkedIn",
    contato_telefone: "Telefone",
    contato_instagram: "Instagram",
    contato_get_in_touch: "Entre em Contato",
    contato_view_projects: "Ver Projetos",
    contato_projetos_concluidos: "Projetos Concluídos",
    contato_dedicacao: "Dedicação",
    contato_vontade_aprender: "Vontade de aprender",
    contato_ready_to_collaborate: "Pronto para colaborar?",
    contato_cta_text: "Estou sempre aberto para novos desafios, ideias e projetos. Bora criar algo juntos?",
    contato_me_chame: "Me chame",
    footer_direitos: "© 2025 Bryyan.Dev • Todos os direitos reservados"
  },
  en: {
    logo: "🌀 Bryyan.Dev",
    titulo_pagina: "Portfolio | Bryyan",
    nav_inicio: "Home",
    nav_sobre: "About",
    nav_habilidades: "Skills",
    nav_projetos: "Projects",
    nav_contato: "Contact",
    botao_tema: "Toggle Theme",
    contato_lets_talk: "Let's Talk?",
    contato_intro: "If you want to chat, collaborate, or just hang out, my contacts are below:",
    contato_email: "Email",
    contato_github: "GitHub",
    contato_linkedin: "LinkedIn",
    contato_telefone: "Phone",
    contato_instagram: "Instagram",
    contato_get_in_touch: "Get in Touch",
    contato_view_projects: "View Projects",
    contato_projetos_concluidos: "Completed Projects",
    contato_dedicacao: "Dedication",
    contato_vontade_aprender: "Willingness to Learn",
    contato_ready_to_collaborate: "Ready to Collaborate?",
    contato_cta_text: "I am always open to new challenges, ideas, and projects. Let's create something together?",
    contato_me_chame: "Contact Me",
    footer_direitos: "© 2025 Bryyan.Dev • All rights reserved"
  }
};

// ================================
// === FUNÇÃO PARA APLICAR IDIOMA ===
// ================================
function applyLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = translations[lang][key];
      } else if (el.tagName === "TITLE") {
        document.title = translations[lang][key];
      } else {
        el.innerText = translations[lang][key];
      }
    }
  });
}

// ================================
// === FUNÇÕES DE TEMA E ARMAZENAMENTO ===
// ================================
function applyTheme(theme) {
  if (theme === "pb") {
    body.classList.add("pb");
    body.classList.remove("tron");
  } else {
    body.classList.add("tron");
    body.classList.remove("pb");
  }
  localStorage.setItem("tema", theme);
}

function toggleTheme() {
  const currentTheme = body.classList.contains("pb") ? "pb" : "tron";
  const newTheme = currentTheme === "pb" ? "tron" : "pb";
  applyTheme(newTheme);
}

function toggleLanguage(event) {
  const lang = event.target.value;
  localStorage.setItem("idioma", lang);
  applyLanguage(lang);
}

function restoreSettings() {
  const savedTheme = localStorage.getItem("tema") || "tron";
  applyTheme(savedTheme);

  const savedLang = localStorage.getItem("idioma") || "pt";
  languageToggle.value = savedLang;
  applyLanguage(savedLang);
}

// ===========================
// === EVENTOS PRINCIPAIS ===
// ===========================
themeToggle.addEventListener("click", toggleTheme);
languageToggle.addEventListener("change", toggleLanguage);

document.addEventListener("DOMContentLoaded", () => {
  restoreSettings();

  // Animação das seções
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.add("hidden");
    observer.observe(sec);
  });

  // Ativa ícones lucide
  if (window.lucide) lucide.createIcons();
});

// ===========================
// === SCROLL SUAVE ===
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ===========================
// === FEEDBACK VISUAL DE CLIQUE ===
// ===========================
document.querySelectorAll("button, .btn").forEach(btn => {
  btn.addEventListener("mousedown", () => btn.classList.add("ativo"));
  btn.addEventListener("mouseup", () => btn.classList.remove("ativo"));
});

// ===========================
// === OBSERVADOR PARA ANIMAÇÃO DAS SEÇÕES ===
// ===========================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
