const lazyImages = document.querySelectorAll('img[loading="lazy"]');

lazyImages.forEach((img) => {
  img.setAttribute("data-lazy-loaded", "true");
});
