const lazyImages = document.querySelectorAll('img[loading="lazy"]:not([data-above-the-fold="true"])');

lazyImages.forEach(function (img) {
  img.addEventListener("load", function () {
    img.setAttribute("data-opt-lazy-loaded", "true");
  });
});
