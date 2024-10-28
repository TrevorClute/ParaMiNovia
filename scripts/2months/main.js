const video = document.querySelector("video");
const videoContainer = document.querySelector(".video-container");
const button = document.querySelector("#start-button");
const buttonContainer = document.querySelector(".start-button-container");
const canvas = document.querySelector("canvas");
const text = document.querySelector("#text");

const takePicture = () => {
  const ctx = canvas.getContext("2d");
  canvas.width = video.width;
  canvas.height = video.height;
  ctx.drawImage(video, 0, 0, video.width, video.height);
  const data = canvas.toDataURL("image/png");
  return data;
};

const startVideo = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    });
};

button.addEventListener("click", () => {
  startVideo();
  button.hidden = true;
  buttonContainer.hidden = true;
  text.hidden = false;
});

video.addEventListener("canplay", () => {
  const sizes = videoContainer.getBoundingClientRect();
  video.width = sizes.width;
  video.height = sizes.height;
});

const main = async () => {
  if (video.width) {
    takePicture();
  }
  requestAnimationFrame(main);
};

console.log(faceapi);
