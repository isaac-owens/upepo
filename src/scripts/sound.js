
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