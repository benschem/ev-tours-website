document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const leftButton = document.querySelector(".control.left");
  const rightButton = document.querySelector(".control.right");
  const dots = document.querySelectorAll(".dot");
  const items = document.querySelectorAll(".carousel li");
  const scrollAmount = items[0].offsetWidth + 16; // Adjust for gap

  function updateActiveDot() {
    const scrollLeft = carousel.scrollLeft;
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    let index = Math.round(scrollLeft / scrollAmount);

    // Ensure index doesn't exceed the last item
    if (scrollLeft >= maxScrollLeft) {
      index = dots.length - 1;
    }

    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  leftButton.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  rightButton.addEventListener("click", () => {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      carousel.scrollTo({ left: i * scrollAmount, behavior: "smooth" });
    });
  });

  carousel.addEventListener("scroll", updateActiveDot);
  updateActiveDot(); // Set initial state
});
