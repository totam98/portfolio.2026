document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav a.nav-link[href^="#"]');
  const defaultId = "about";
  // ignore scroll-driven active updates for a short window after a nav click
  let ignoreScrollUntil = 0;

  // Make sure the default link is active if present
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === `#${defaultId}`)
      link.classList.add("active");

    link.addEventListener("click", (e) => {
      e.preventDefault();
      // prevent the scroll handler from overriding this manual click
      ignoreScrollUntil = Date.now() + 900;
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        // account for the sticky header so it doesn't cover the top of the
        // section after scrolling
        const header = document.querySelector(".site-header");
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const scrollTop =
          window.pageYOffset +
          target.getBoundingClientRect().top -
          headerHeight -
          8;
        window.scrollTo({ top: scrollTop, behavior: "smooth" });
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        // update the URL hash without jumping
        history.replaceState(null, "", `#${targetId}`);
      }
    });
  });

  // Update active link on scroll (optional enhancement)
  const sections = Array.from(navLinks)
    .map((l) => document.getElementById(l.getAttribute("href").slice(1)))
    .filter(Boolean);

  const onScroll = () => {
    if (Date.now() < ignoreScrollUntil) return;
    const offset = window.innerHeight * 0.25;
    let current = null;

    if (
      window.innerHeight + window.pageYOffset >=
      document.documentElement.scrollHeight - 1
    ) {
      current = sections[sections.length - 1];
    } else {
      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) {
          current = sec;
          break;
        }
      }
    }

    if (!current) current = sections[0];
    if (current) {
      const id = current.id;
      navLinks.forEach((l) =>
        l.classList.toggle("active", l.getAttribute("href") === `#${id}`),
      );
    }
  };

  const burgerButton = document.querySelector(".burger-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  const closeMobileMenu = () => {
    if (!burgerButton || !mobileMenu) return;
    burgerButton.classList.remove("active");
    burgerButton.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("active");
    mobileMenu.setAttribute("aria-hidden", "true");
  };

  if (burgerButton && mobileMenu) {
    burgerButton.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");
      burgerButton.classList.toggle("active", isOpen);
      burgerButton.setAttribute("aria-expanded", String(isOpen));
      mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    });

    document.addEventListener("click", (event) => {
      if (
        mobileMenu.classList.contains("active") &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".burger-button")
      ) {
        closeMobileMenu();
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
