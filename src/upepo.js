// any javascript code imported here will be bundled into bundle.js by Webpack
// console.log('Hello from Webpack UPEPO!');

const webcam = document.getElementById('webcam');
let timeOut, lastImageData;

let canvasSource = document.getElementById('canvas-source');
let contextSource = canvasSource.getContext('2d');

let canvasBlended = document.getElementById('canvas-blended');
let contextBlended = canvasBlended.getContext('2d');

// render reversed video image so user's movement is mirrored
contextSource.translate(canvasSource.width, 0);
contextSource.scale(-1, 1);

// gains accesss to user's webcam
var constraints = { audio: false, video: { facingMode: "user" } };
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  const webcam = document.getElementById('webcam');
  webcam.srcObject = stream;
  webcam.onloadedmetadata = function(e) {
    // begin motion detection 
    startMotionDetection();
    // webcam.play();
  };
})
.catch(function(err) {
  console.log("Uh-oh! Looks like something went wrong.");
  console.log(err);
})

function startMotionDetection() {
  update();
}

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
    );
  })();
  
  function update() {
    drawVideo();
    // blend();
    // checkArea();
    requestAnimFrame(update);
  }

function drawVideo() {
  contextSource.drawImage(webcam, 0, 0, webcam.width, webcam.height);
}

// Ensures that the result of pixel subtraction is always positive. (~ Math.abs())
// sourced from https://www.adobe.com/devnet/archive/html5/articles/javascript-motion-detection.html

function fastAbs(value) {
  return (value ^ (value >> 31)) - (value >> 31);
}

function difference(target, pixelArray1, pixelArray2) {
  // target = flat array of pixels to store result of subtraction into
  // pixelArray1 = flat array of CURRENT WEBCAM FRAME pixels
  // pixelArray2 = flat array of PREVIOUS WEBCAM FRAME  pixels

  if (pixelArray1.length != pixelArray2.length) return null;

  let i = 0;

  while (i < pixelArray1.length * 0.25) {
    // red pixed check
    target[4 * i] =
      pixelArray1 === 0 ? 0 : fastAbs(pixelArray1[4 * i] - pixelArray2[4 * i]);
    // green pixel check
    target[4 * i + 1] =
      pixelArray1 === 0 ? 0 : fastAbs(pixelArray1[4 * i] - pixelArray2[4 * i]);
    // blue pixel check
    target[4 * i + 2] =
      pixelArray1 === 0 ? 0 : fastAbs(pixelArray1[4 * i] - pixelArray2[4 * i]);
    // auto set alpha/ transparency
    target[4 * i + 3] = 0xff;

    i++;
  }
}

function blend() {
  let canvasWidth = canvas.width;
  let canvasHeight = canvas.height;

  // ImageData = array of pixels

  // .getImageData returns ImageData object that copies pixel data
  // for specified rectangle of canvas context
  let canvasData = context.getImageData(0, 0, canvasWidth, canvasHeight);

  // creates an image if no previous image exists (i.e. first frame of stream)
  if (!lastImageData)
    lastImageData = context.getImageData(0, 0, canvasWidth, canvasHeight);

  // create ImageData instance to get blended result
  let blendedData = context.createImageData(canvasWidth, canvasHeight);

  // blend the images
  difference(blendedData.data, canvasData.data, lastImageData.data);

  // draw the result of the blend
  contextBlended.putImageData(blendedData, 0, 0);

  // save the current image
  lastImageData = canvasData;
}

function checkArea() {
  // loop over pixels in test area
}
