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

function blend() {

}