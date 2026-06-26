document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeButton = document.querySelector(".modal-close");

  if (!modal || !modalImage || !closeButton) return;

  // Add click event listeners to all gallery images
  const galleryImages = document.querySelectorAll(".gallery-img");
  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      const imageSrc = img.getAttribute("data-modal-src");
      if (imageSrc) {
        modalImage.src = imageSrc;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close modal when clicking close button
  closeButton.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});
