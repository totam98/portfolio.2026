document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".project-list");
  const prevButton = document.querySelector(
    ".project-carousel .carousel-button.prev",
  );
  const nextButton = document.querySelector(
    ".project-carousel .carousel-button.next",
  );

  if (!list || !prevButton || !nextButton) return;

  const getScrollStep = () => {
    const card = list.querySelector(".project-item");
    const styles = window.getComputedStyle(list);
    const gap = parseFloat(styles.gap) || 20;
    return (card ? card.getBoundingClientRect().width : 360) + gap;
  };

  const updateButtons = () => {
    prevButton.disabled = list.scrollLeft <= 10;
    nextButton.disabled =
      list.scrollLeft + list.clientWidth >= list.scrollWidth - 10;
  };

  prevButton.addEventListener("click", () => {
    list.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    list.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  });

  list.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  updateButtons();
});
