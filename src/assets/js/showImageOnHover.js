document.querySelectorAll(".image-hover").forEach((el) => {
  const exterior = el.querySelector(".exterior");
  const interior = el.querySelector(".interior");

  const toggle = () => {
    const isToggled = el.classList.toggle("toggled");
    el.setAttribute("aria-pressed", isToggled ? "true" : "false");

    // Accessibility: show/hide correct image
    exterior.setAttribute("aria-hidden", isToggled ? "true" : "false");
    interior.setAttribute("aria-hidden", isToggled ? "false" : "true");
  };

  el.addEventListener("click", toggle);

  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });
});
