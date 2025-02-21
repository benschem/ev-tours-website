// Images that swap on hover need to be accessible
document.addEventListener("DOMContentLoaded", () => {
  const hoverElements = document.querySelectorAll(".hover-target");

  hoverElements.forEach((hoverElement) => {
    const images = hoverElement.querySelectorAll("img");

    hoverElement.addEventListener("mouseenter", () => {
      images[0].setAttribute("aria-hidden", "true");
      images[1].removeAttribute("aria-hidden");
    });

    hoverElement.addEventListener("mouseleave", () => {
      images[0].removeAttribute("aria-hidden");
      images[1].setAttribute("aria-hidden", "true");
    });

    hoverElement.addEventListener("focus", () => {
      images[0].setAttribute("aria-hidden", "true");
      images[1].removeAttribute("aria-hidden");
    });

    hoverElement.addEventListener("blur", () => {
      images[0].removeAttribute("aria-hidden");
      images[1].setAttribute("aria-hidden", "true");
    });
  });
});
