import * as VideoUTIL from './video_utils';
import * as sound from "./sound";

import {
  webcam, 
  canvasSource,
  contextSource,
  contextBlended,
} from "./canvas";

let lastImageData;

// render reversed webcam feed for mirror effect
contextSource.translate(canvasSource.width, 0);
contextSource.scale(-1, 1);

// displays the reversed webcam feed
export function drawVideo() {
  contextSource.drawImage(webcam, 0, 0, webcam.width, webcam.height);
}

// 
export function blend() {
  let canvasWidth = canvasSource.width;
  let canvasHeight = canvasSource.height;

  // ImageData = array of pixels

  // .getImageData returns ImageData object that copies pixel data
  // for specified rectangle of canvas context
  let sourceData = contextSource.getImageData(0, 0, canvasWidth, canvasHeight);

  // creates an image if no previous image exists (i.e. first frame of drawn video stream)
  if (!lastImageData)
    lastImageData = contextSource.getImageData(0, 0, canvasWidth, canvasHeight);

  // .createImageData creates ImageData instance for blended result
  let blendedData = contextSource.createImageData(canvasWidth, canvasHeight);

  // blend the images (source is current frame, lastImage is prev frame)
  VideoUTIL.difference(blendedData.data, sourceData.data, lastImageData.data);

  // draw the result of the blend
  contextBlended.putImageData(blendedData, 0, 0);

  // save the current image
  lastImageData = sourceData;
}

export function checkArea() {
  const test = document.getElementById("test-area");
  // window.test = test;

  let rect = test.getClientRects();

  const testArea = {
    x: rect[0].x - 330,
    y: rect[0].y,
    width: test.clientWidth,
    height: test.clientHeight,
  };

  // window.testArea = testArea;

  let blendedData = contextBlended.getImageData(
    testArea.x,
    testArea.y,
    testArea.width,
    testArea.height
  );

  let i = 0;
  let average = 0;

  // loop over the pixels
  while (i < blendedData.data.length * 0.25) {
    // find average of the color channel values (red, green, blue)
    average +=
      (blendedData.data[i * 4] +
        blendedData.data[i * 4 + 1] +
        blendedData.data[i * 4 + 2]) / 3;

    i++;
  }

  // calculate average of test area color values
  average = Math.round(average / (blendedData.data.length * 0.25));
  // window.blendedData = blendedData;
  // window.average = average;

  // This is where the magic happens
  if (average > 10) {
    // if average is over the threshold (10) movement has happened
    sound.setupSample(window.currentInstrument).then((sample) => {
      // load and play current instrument's sample
      sound.playSample(sound.audioCtx, sample);
    });
  }
}