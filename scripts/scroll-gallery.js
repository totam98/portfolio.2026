document.addEventListener("DOMContentLoaded", () => {
  const galleryCarousel = document.querySelector(".gallery-carousel");
  if (!galleryCarousel) return;

  const galleryList = galleryCarousel.querySelector(".gallery-list");
  const prevButton = galleryCarousel.querySelector(".carousel-button.prev");
  const nextButton = galleryCarousel.querySelector(".carousel-button.next");

  if (!galleryList || !prevButton || !nextButton) return;

  const updateButtons = () => {
    const isAtStart = galleryList.scrollLeft < 10;
    const isAtEnd =
      galleryList.scrollLeft + galleryList.clientWidth >=
      galleryList.scrollWidth - 10;

    prevButton.disabled = isAtStart;
    nextButton.disabled = isAtEnd;
  };

  const getScrollStep = () => {
    const firstItem = galleryList.querySelector(".gallery-item");
    if (!firstItem) return 0;

    const itemWidth = firstItem.offsetWidth;
    const gap = 20;
    return itemWidth + gap;
  };

  prevButton.addEventListener("click", () => {
    const step = getScrollStep();
    galleryList.scrollBy({ left: -step, behavior: "smooth" });
    setTimeout(updateButtons, 300);
  });

  nextButton.addEventListener("click", () => {
    const step = getScrollStep();
    galleryList.scrollBy({ left: step, behavior: "smooth" });
    setTimeout(updateButtons, 300);
  });

  galleryList.addEventListener("scroll", updateButtons, { passive: true });

  updateButtons();
});
