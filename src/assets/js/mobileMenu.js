/* -------------------------------------------------------------------------- */
/*                                 Mobile Menu                                */
/* -------------------------------------------------------------------------- */

let menuIsOpen = false;
const navToggle = document.querySelector("#nav-toggle");

const mobileMenu = document.querySelector("#mobile-menu");
const openMenuIcon = document.querySelector("#open-menu-icon");
const closeMenuIcon = document.querySelector("#close-menu-icon");

const bodyElement = document.querySelector("body");
const mainElement = document.querySelector("main");
const backToTopButton = document.querySelector("#back-to-top");

/* ---------------------- Show or hide the mobile menu ---------------------- */

const toggleMenu = () => {
  if (menuIsOpen) {
    closeMenu();
  } else {
    openMenu();
  }

  menuIsOpen = !menuIsOpen;
  openMenuIcon.classList.toggle("hide");
  closeMenuIcon.classList.toggle("hide");
  menuIsOpen ? disableScroll() : enableScroll();
};

const closeMenu = () => {
  mobileMenu.style.animation = "nav-slide-out 0.2s ease-in-out forwards";
  mainElement.style.filter = "blur(0px)";
  setTimeout(() => {
    mobileMenu.classList.toggle("show");
    backToTopButton.classList.toggle("hide");
  }, 200);
  setTimeout(() => {
    styleMenuIconsForOpen();
  }, 150);
};

const openMenu = () => {
  backToTopButton.classList.toggle("hide");
  mainElement.style.filter = "blur(4px)";

  setTimeout(() => {
    styleMenuIconsForClosed();
  }, 150);
  mobileMenu.style.animation = "nav-slide-in 0.2s ease-in-out";
  mobileMenu.classList.toggle("show");
};

/* ---------------------- Style icons when menu is open --------------------- */

const styleMenuIconsForOpen = () => {
  navToggle.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
};

/* --------------------- Style icons when menu is closed -------------------- */

const styleMenuIconsForClosed = () => {
  navToggle.setAttribute("aria-expanded", "true");
  mobileMenu.setAttribute("aria-hidden", "false");
};

/* ---------------- Disable page scrolling when menu is open ---------------- */

const disableScroll = () => {
  window.scrollTo(0, 0);
  bodyElement.style.height = "100%";
  bodyElement.style.overflow = "hidden";
};

const enableScroll = () => {
  bodyElement.style.height = "";
  bodyElement.style.overflow = "";
};

/* ------------------- Listen for click of the menu button ------------------ */

navToggle.addEventListener("click", () => {
  toggleMenu();
});

/* ----------- Let the submenu button be clickable ---------- */

const mobileMenuP = document.querySelector(".mobile-menu p");

mobileMenuP.addEventListener("click", () => {
  window.location.href = "/services";
});

/* -------------- Listen for click on background when menu open ------------- */

mainElement.addEventListener("click", () => {
  if (menuIsOpen) {
    closeMenu();

    menuIsOpen = false;
    openMenuIcon.classList.toggle("hide");
    closeMenuIcon.classList.toggle("hide");
    enableScroll();
  }
});

/* -------------------------------------------------------------------------- */
