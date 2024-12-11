/* -------------------------------------------------------------------------- */
/*                                  Dark Mode                                 */
/* -------------------------------------------------------------------------- */

const darkModeToggle = document.querySelector("#dark-mode-toggle");

let darkMode = sessionStorage.getItem("darkMode");

/* ----------- Theme the Cloudflare Turnstile widget if it's shown ---------- */
// for Cloudflare Turnstile (not needed on netlify)

// const onContactPage = () => {
//   return window.location.pathname === "/contact/";
// };

// const cfTurnstile = onContactPage ? document.querySelector("#cf-turnstile") : null;

/* --------------- Apply dark mode on page load if applicable --------------- */

document.addEventListener("DOMContentLoaded", () => {
  if (darkMode === "true") {
    setDarkMode();
  } else if (darkMode === "false") {
    setLightMode();
  } else if (prefersDarkMode.matches) {
    setDarkMode();
  } else if (prefersLightMode.matches) {
    setLightMode();
  } else {
    setLightMode();
  }
});

/* --------------- Listen for browser theme preference change --------------- */

const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
const prefersLightMode = window.matchMedia("(prefers-color-scheme: light)");

prefersDarkMode.addEventListener("change", (e) => e.matches && setDarkMode());
prefersLightMode.addEventListener("change", (e) => e.matches && setLightMode());

/* --------------- Toggle on and off upon click of the toggle --------------- */

const toggleDarkMode = () => {
  console.log("dark modeee");

  darkMode === "true" ? setLightMode() : setDarkMode();
};

darkModeToggle.addEventListener("click", toggleDarkMode);

/* ----------------------------- Set light mode ----------------------------- */

const setLightMode = () => {
  moonIcon.classList.remove("hide");
  sunIcon.classList.add("hide");

  // for Cloudflare Turnstile (not needed on netlify)
  // if (window.location.pathname === "/contact/") {
  //   cfTurnstile.dataset.theme = "light";
  // }

  document.documentElement.classList.remove("dark-mode");

  darkMode = "false";
  sessionStorage.setItem("darkMode", darkMode);
};

/* ------------------------------ Set dark mode ----------------------------- */

const setDarkMode = () => {
  moonIcon.classList.add("hide");
  sunIcon.classList.remove("hide");

  // for Cloudflare Turnstile (not needed on netlify)
  // if (window.location.pathname === "/contact/") {
  //   cfTurnstile.dataset.theme = "dark";
  // }

  document.documentElement.classList.add("dark-mode");

  darkMode = "true";
  sessionStorage.setItem("darkMode", darkMode);
};

/* -------------------------------------------------------------------------- */
