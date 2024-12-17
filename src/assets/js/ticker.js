document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".partner-logos");
  const logoGroups = document.querySelectorAll(".logo-group");

  if (!container || logoGroups.length === 0) return;

  const containerWidth = container.offsetWidth;
  const groupWidth = logoGroups[0].offsetWidth; // Assume all groups are the same width
  const marginRight = parseFloat(getComputedStyle(logoGroups[0]).getPropertyValue("margin-inline-end")) || 0;

  // Apply absolute positioning and stagger groups initially
  logoGroups.forEach((group, index) => {
    group.style.animation = "none"; // Disable CSS animation
    group.style.position = "absolute";
    group.style.left = `${index * (groupWidth + marginRight)}px`; // Include margin-right in position
  });

  // Scrolling function
  function scrollGroups() {
    logoGroups.forEach((group) => {
      let currentLeft = parseFloat(group.style.left || 0);

      // Move group left
      currentLeft -= 1; // Speed of scroll
      group.style.left = `${currentLeft}px`;

      // Reset group when it fully exits the left side
      if (currentLeft <= -groupWidth) {
        // Find the rightmost group's position
        const maxRight = Math.max(...Array.from(logoGroups).map((g) => parseFloat(g.style.left)));
        group.style.left = `${maxRight + groupWidth + marginRight}px`;
      }
    });

    requestAnimationFrame(scrollGroups);
  }

  // Start animation
  requestAnimationFrame(scrollGroups);
});
