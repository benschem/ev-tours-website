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

/* ----------- Make the submenu accessible ---------- */

const submenuBtn = document.querySelector("#submenu-btn");
const submenu = document.querySelector("#submenu");

function expandTheMenu() {
  submenu.classList.add("show-menu");
  submenuBtn.classList.add("rotate-chevron");

  submenuBtn.setAttribute("aria-expanded", "true");
}

function closeTheMenu() {
  submenu.classList.remove("show-menu");
  submenuBtn.classList.remove("rotate-chevron");

  submenuBtn.setAttribute("aria-expanded", "false");
}

// Handle enter and escape on the button
submenuBtn.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    expandTheMenu();
    submenu.querySelector("a").focus();
  }
  if (event.key === "Escape") {
    closeTheMenu();
  }
});

// Handle escape inside the submenu
submenu.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    closeTheMenu();
    submenuBtn.focus();
  }
});

// Close menu if focus moves away (focusout)
submenu.addEventListener("focusout", (event) => {
  if (!submenu.contains(event.relatedTarget)) {
    closeTheMenu();
  }
});

// Close menu if user clicks outside
document.addEventListener("click", (event) => {
  if (!submenu.contains(event.target) && !submenuBtn.contains(event.target)) {
    closeTheMenu();
  }
});

// Stop the menu from closing if the user clicks inside the submenu:
submenu.addEventListener("click", (event) => {
  event.stopPropagation();
});

/* ----------- Let the submenu button be clickable ---------- */
submenuBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  // window.location.href = "/services";
  if (submenu.classList.contains("show-menu")) {
    closeTheMenu();
  } else {
    expandTheMenu();
  }
});

// Do hover with JS instead of CSS, but only if user has a mouse
if (window.matchMedia("(hover: hover)").matches) {
  let isHoveringMenu = false;

  submenuBtn.addEventListener("mouseenter", expandTheMenu);
  submenuBtn.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!isHoveringMenu) closeTheMenu();
    }, 100); // Small delay to allow moving to submenu
  });

  submenu.addEventListener("mouseenter", () => {
    isHoveringMenu = true;
  });

  submenu.addEventListener("mouseleave", () => {
    isHoveringMenu = false;
    closeTheMenu();
  });
}
