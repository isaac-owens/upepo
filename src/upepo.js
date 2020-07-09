// any javascript code imported here will be bundled into bundle.js by Webpack
import * as sound from '../src/scripts/sound';

import './images/bowl.png';
import './images/chimes.png';
import './images/gong.png';
import './sounds/wind.wav';

import bowlImage from './images/bowl.png';
import chimesImage from './images/chimes.png';
import gongImage from './images/gong.png';

import * as video from '../src/scripts/video';

const icons = {
  'bowl': bowlImage,
  'chimes': chimesImage,
  'gong': gongImage,
}
// gains accesss to user's webcam
var constraints = { audio: false, video: { facingMode: "user" } };
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  const webcam = document.getElementById('webcam');
  webcam.srcObject = stream;
  webcam.onloadedmetadata = function(e) {
    // begin motion detection 
    startMotionDetection();
  };
})
.catch(function(err) {
  console.log("Uh-oh! Looks like something went wrong.");
  console.log(err);
})

function startMotionDetection() {
  update();
}

// creates animations for canvas webcam 'drawings'
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
  
  // sets currently selected instrument on icon click
  window.currentInstrument = 'bowl';

  Array.from(document.getElementsByClassName('instrument-icon')).forEach(instrument => {
    // debugger
    instrument.addEventListener('click', (e) => {
      window.currentInstrument = e.target.id;
      document.getElementById("test-area").innerHTML =
        `<img id=${window.currentInstrument} class="instrument-icon" src=${icons[window.currentInstrument]} alt=${window.currentInstrument}>`;
    })
  })

  // runs following functions in a continual loop as long as webcam is active
  function update() {
    video.drawVideo();
    video.blend();
    video.checkArea();
    requestAnimFrame(update);
  }

  window.onload = function() {
    // get modal element
    const modal = document.getElementById('modal');
  
    // get close button
    const closeBtn = document.getElementById('closeBtn');

    // get open button
    const instructionBtn = document.getElementById('instructionBtn');
  
    closeBtn.addEventListener('click', closeModal)

    instructionBtn.addEventListener('click', openModal);
  
  function closeModal() {
    modal.style.display = 'none';
  }
  
  function openModal() {
    modal.style.display = 'block';
  }
}