/* -------------------------------------------------------------------------- */
/*                                 Mobile Menu                                */
/* -------------------------------------------------------------------------- */

let menuIsOpen = false;
const navToggle = document.querySelector("#nav-toggle");

const mobileMenu = document.querySelector("#mobile-menu");
const openMenuIcon = document.querySelector("#open-menu-icon");
const closeMenuIcon = document.querySelector("#close-menu-icon");

const sunIcon = document.querySelector("#sun-icon");
const moonIcon = document.querySelector("#moon-icon");

const mainElement = document.querySelector("body");
const backToTopButton = document.querySelector("#back-to-top");

/* ---------------------- Show or hide the mobile menu ---------------------- */

const toggleMenu = () => {
  if (menuIsOpen) {
    mobileMenu.style.animation = "nav-slide-out 0.2s ease-in-out forwards";
    setTimeout(() => {
      console.log("click");

      mobileMenu.classList.toggle("show");
      backToTopButton.classList.toggle("hide");
    }, 200);
    setTimeout(() => {
      styleMenuIconsForOpen();
    }, 150);
  } else {
    backToTopButton.classList.toggle("hide");

    setTimeout(() => {
      styleMenuIconsForClosed();
    }, 150);
    mobileMenu.style.animation = "nav-slide-in 0.2s ease-in-out";
    mobileMenu.classList.toggle("show");
  }

  menuIsOpen = !menuIsOpen;
  openMenuIcon.classList.toggle("hide");
  closeMenuIcon.classList.toggle("hide");
  menuIsOpen ? disableScroll() : enableScroll();
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
  mainElement.style.height = "100%";
  mainElement.style.overflow = "hidden";
};

const enableScroll = () => {
  mainElement.style.height = "";
  mainElement.style.overflow = "";
};

/* ------------------- Listen for click of the menu button ------------------ */

navToggle.addEventListener("click", () => {
  toggleMenu();
});

/* -------------------------------------------------------------------------- */
