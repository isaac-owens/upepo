export const AudioContext = window.AudioContext || window.webkitAudioContext
export const audioCtx = new AudioContext();

// await operator ensures we can only run subsequent code when it has finished executing
export async function getFile(audioContext, filepath) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

export async function setupSample(instrument) {
  const filePath = `../../sounds/${instrument}.wav`;
  const sample = await getFile(audioCtx, filePath);
  return sample;
}

export function playSample(audioContext, audioBuffer) {
  const sampleSource = audioContext.createBufferSource();
  sampleSource.buffer = audioBuffer;
  sampleSource.connect(audioContext.destination)
  sampleSource.start();
  return sampleSource;
}

export function stopSample(audioContext, audioBuffer) {
  const sampleSource = audioContext.createBufferSource();
  sampleSource.buffer = audioBuffer;
  sampleSource.connect(audioContext.destination)
  sampleSource.stop();
  return sampleSource;
}

// creates media element from background music <audio> tag for API manipulation
export const backgroundAudioCtx = new AudioContext();
const backgroundAudioElement = document.getElementById('background-audio');
window.audio = backgroundAudioElement;
const backgroundMusic = backgroundAudioCtx.createMediaElementSource(backgroundAudioElement);

// creates gain for background music volume control
const gainNode = backgroundAudioCtx.createGain();
backgroundMusic.connect(gainNode).connect(backgroundAudioCtx.destination);


const playButton = document.querySelector('play');

// play-pause button functionality 
document.addEventListener('DOMContentLoaded', () => {
  playButton.addEventListener('click', function() {
    if (backgroundAudioContext.state === 'suspended') {
      backgroundAudioContext.resume();
    }
  
    if (this.dataset.playing === 'false') {
      backgroundAudioElement.play();
      this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
      backgroundAudioElement.pause();
      this.dataset.playing = 'false';
    }
  }, false)
  
})

document.addEventListener('DOMContentLoaded', () => {
  // stops background music completely after it is done playing all the way through
  backgroundAudioElement.addEventListener('ended', () => {
    playButton.dataset.playing = 'false';
  }, false)
})

document.addEventListener('DOMContentLoaded', () => {
  const volumeControl = document.getElementById('volume');
  
  // updates the volume based on value on range <input> value
  volumeControl.addEventListener('input', function() {
    gainNode.gain.value = this.value;
  }, false);
})