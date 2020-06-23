// any javascript code imported here will be bundled into bundle.js by Webpack
console.log('Hello from Webpack UPEPO!');

// async function getMedia(constraints) {
//   let stream = null;

//   try {
//     stream = await navigator.mediaDevices.getUserMedia(constraints);
//   } catch(err) {
//     console.log('Uh-oh! Looks like something went terribly wrong.');
//     console.log(err);
//   }
// }

var constraints = { audio: false, video: { facingMode: "user" } };
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  var webcam = document.getElementById('webcam');
  webcam.srcObject = stream;
  webcam.onloadedmetadata = function(e) {
    webcam.play();
  };
})
.catch(function(err) {
  console.log("Uh-oh! Looks like something went wrong.");
  console.log(err);
})

// testing pull request on new branch

window.onLoad = () => {
  let testAreaPos = [115, 240];
  let timeOut, lastImageData;

  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  
  let canvasBlended = document.getElementById("canvas-blended");
  let contextBlended = canvasBlended.getContext("2d");
  
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
}

/* 
executed 60 times per second, calls functions to:
  draw webam stream onto canvas,
  blend the images,
  detect the motion 
 */

function update() {
  drawVideo();
  blend();
  timeOut = setTimeout(update, 1000 / 60);
}

function drawVideo() {
  context.drawImage(webcam, 0, 0, webcam.width, webcam.height);
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
  // loop over test area
  for (let i = 0; i < 2; i++) {
    // get pixes in area from blended image
    let blendedData = contextBlended.getImageData(
      test[i].area.x,
      test[i].area.y,
      test[i].area.width,
      test[i].area.height,
    )
    let j = 0;
    let average = 0;
    // loop over pixels
    while (j < (blendedData.data.length / 4)) {
      // make an average between color channel
      average += (blendedData.data[i * 4] + blendedData.data[i * 4 + 1] + blendedData.data[i * 4 + 2]) / 3;
      j++;
    }

    // calculate average between color values of note area
    average = Math.round(average / (blendedData.data.length / 4));
    if (average > 10) {
      console.log("Movement detected in test area!");
    }
  }
}
