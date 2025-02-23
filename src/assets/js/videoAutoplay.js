document.body.addEventListener("DOMContentLoaded", () => {
  let allVideos = document.querySelectorAll("video");

  allVideos.forEach((video) => {
    video.play();
  });
});
