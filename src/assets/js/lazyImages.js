const lazyImages = document.querySelectorAll('img[loading="lazy"]');

lazyImages.forEach(function (img) {
  img.addEventListener("load", function () {
    img.setAttribute("data-opt-lazy-loaded", "true");
  });
});
