/* ----------- Highlight the link for the current page in the menu ---------- */

const setActiveLink = () => {
  const currentLocation = window.location.pathname.replace(/\/$/, "");
  const links = document.querySelectorAll("nav ul li a");
  links.forEach((link) => {
    const linkPath = new URL(link.getAttribute("href"), window.location.origin).pathname.replace(/\/$/, "");
    link.classList.toggle("active", linkPath === currentLocation);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setActiveLink();
});
