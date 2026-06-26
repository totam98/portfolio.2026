document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".experience-list");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");

  if (!list || !prevButton || !nextButton) return;

  const cards = list.querySelectorAll(".experience-item");
  const activateCard = (activeCard) => {
    const alreadyActive = activeCard.classList.contains("expanded");
    cards.forEach((card) => {
      const shouldExpand = !alreadyActive && card === activeCard;
      card.classList.toggle("expanded", shouldExpand);
      card.setAttribute("aria-expanded", shouldExpand ? "true" : "false");
    });
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => activateCard(card));
  });

  const getScrollStep = () => {
    const card = list.querySelector(".experience-item");
    const styles = window.getComputedStyle(list);
    const gap = parseFloat(styles.gap) || 20;
    return (card ? card.getBoundingClientRect().width : 320) + gap;
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
