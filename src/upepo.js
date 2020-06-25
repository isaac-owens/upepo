// any javascript code imported here will be bundled into bundle.js by Webpack
import * as sound from '../src/scripts/sound';
import * as video from '../src/scripts/video';

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
  
  // runs following functions in a continual loop as long as webcam is active
  function update() {
    video.drawVideo();
    video.blend();
    video.checkArea();
    requestAnimFrame(update);
  }


sound.setupSample()
.then(sample => {
  console.log(`${sample} is locked and loaded!`)
  window.addEventListener('click', () => {
    sound.playSample(sound.audioCtx, sample);
  })
})

