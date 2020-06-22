let timeOut, lastImageData;

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let canvasBlended = document.getElementById('canvas-blended');
let contextBlended = canvasBlended.getContext('2d');

/* 
executed 60 times per second, calls functions to:
  draw webam stream onto canvas,
  blend the images,
  detect the motion 
 */

function update() {
  drawVideo();
  blend();
  timeOut = setTimeout(update, 1000/60);
}

function drawVideo() {
  contextSource.drawImage(video, 0, 0, video.width, video.height);
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

  while (i < (pixelArray1.length * 0.25)) {
    // red pixed check
    target[4 * i] = pixelArray1 === 0 ? 0 : fastAbs(pixelArray1[4 * i] - pixelArray2[4 * i]);
    // green pixel check
    target[4 * i + 1] = pixelArray1 === 0 ? 0 : fastAbs(pixelArray1[4 * i] - pixelArray2[4 * i]);
    // blue pixel check
    target[4 * i + 2] = pixelArray1 === 0 ? 0 : fastAbs(pixelArray1[4 * i] - pixelArray2[4 * i]);
    // auto set alpha/ transparency
    target[4 * i + 3] = 0xFF;
    
    i++;
  }
}

function blend() {
  
}