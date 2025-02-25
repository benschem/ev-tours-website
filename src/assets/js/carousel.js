document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const leftButton = document.querySelector(".control.left");
  const rightButton = document.querySelector(".control.right");
  const dots = document.querySelectorAll(".dot");
  const items = document.querySelectorAll(".carousel li");
  const scrollAmount = items[0].offsetWidth + 16; // Adjust for gap

  leftButton.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  rightButton.addEventListener("click", () => {
    carousel.scrollBy({ top: 0, left: scrollAmount, behavior: "smooth" });
  });

  function updateActiveDot() {
    const scrollLeft = carousel.scrollLeft;
    let index = Math.round(scrollLeft / scrollAmount);
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      carousel.scrollTo({ left: i * scrollAmount, behavior: "smooth" });
    });
  });

  carousel.addEventListener("scroll", updateActiveDot);
  updateActiveDot();
});
