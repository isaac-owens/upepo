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
