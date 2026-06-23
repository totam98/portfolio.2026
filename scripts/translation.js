(function () {
  const switcher = document.querySelector(".language-switcher");
  if (!switcher) return;
  const buttons = switcher.querySelectorAll(".lang");
  const saved = localStorage.getItem("site-cv-lang") || "fr";

  function apply(lang) {
    buttons.forEach((btn) => {
      const is = btn.dataset.lang === lang;
      btn.classList.toggle("active", is);
    });
    const cta = document.querySelector(".cta");
    if (cta) {
      cta.href =
        lang === "en"
          ? "https://drive.google.com/uc?export=download&id=1PaB48AdJ1ISL61sThgpuCQjT3fVMShoJ"
          : "https://drive.google.com/uc?export=download&id=1WdFIeWmRwFlpC6grM_0GVmGVx2A7xeOz";
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      localStorage.setItem("site-cv-lang", lang);
      apply(lang);
      applyTranslations(lang);
    });
  });

  const translations = TRANSLATIONS;

  function applyTranslations(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const txt =
        (translations[lang] && translations[lang][key]) || el.textContent;
      el.textContent = txt;
    });
  }

  apply(saved);
  applyTranslations(saved);
})();
