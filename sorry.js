import * as faceapi from "face-api.js";
import melaImage from "/images/mela.png";

async function init() {
  const videoElement = document.getElementById("camera-stream");
  const loadingMessage = document.getElementById("loading-message");
  const scanningText = document.getElementById("scanning-text");
  const diag = document.getElementById("sorry-dialog");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 },
      audio: false,
    });

    videoElement.srcObject = stream;

    // Hide loading message and show video and scanning text once stream is ready
    videoElement.addEventListener("loadeddata", () => {
      loadingMessage.style.display = "none";
      videoElement.style.display = "block";
      scanningText.style.display = "block"; // Show scanning text after camera is ready
    });
  } catch (error) {
    console.error("Error accessing camera:", error);
    loadingMessage.textContent = "Error: Could not access camera";
    loadingMessage.style.color = "red";
  }
  const modelPath = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights"
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(modelPath),
    faceapi.nets.faceLandmark68Net.loadFromUri(modelPath),
    faceapi.nets.faceRecognitionNet.loadFromUri(modelPath),
    faceapi.nets.ageGenderNet.loadFromUri(modelPath),
    faceapi.nets.faceExpressionNet.loadFromUri(modelPath),
  ]);

  const canvas = document.getElementById("camera-canvas");
  canvas.style.left = videoElement.offsetLeft;
  canvas.style.top = videoElement.offsetTop;
  canvas.height = videoElement.height;
  canvas.width = videoElement.width;

  const melaFace = document.createElement("img");
  melaFace.src = melaImage;
  let melaFaceAiData = await faceapi.detectAllFaces(melaFace).withFaceLandmarks().withFaceDescriptors();
  let faceMatcher = new faceapi.FaceMatcher(melaFaceAiData);

  let foundMela = false
  let loop = async () => {
    let faceAIData = await faceapi
      .detectAllFaces(videoElement)
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withAgeAndGender()
      .withFaceExpressions();
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceAIData = faceapi.resizeResults(faceAIData, videoElement);
    faceapi.draw.drawFaceLandmarks(canvas, faceAIData);

    faceAIData.forEach((face) => {
      const { descriptor} = face;
      let label = faceMatcher.findBestMatch(descriptor).toString();
      let text = "";
      if (label.includes("unknown")) {
        text = "unknown";
      } else {
        text = "Melany More";
        foundMela = true
        scanningText.innerHTML = "ok now that i know its you mela.\n can you smile for me?"
      }
      const textField = new faceapi.draw.DrawTextField([text], face.detection.box.bottomLeft);
      textField.draw(canvas);
      if(foundMela && face.expressions.happy > 0.9){
        scanningText.innerHTML = "wow tu eres super hermosa:)"
        diag.showModal();
      }
    });
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

document.addEventListener("DOMContentLoaded", init);
