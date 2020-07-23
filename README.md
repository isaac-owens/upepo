# Welcome to upepo! <img src="dist/images/bowl.png" height="30px">

Upepo is a motion detection app that let's you use soundtherapy instruments with nothing but you webcam!  

## Step one: 
Choose an instrument in the side panel

![](dist/images/snippets/upepo_step_one.gif)

## Step two: 
Wave your hand in the orange circle and hear the instrument play!

![](dist/images/snippets/upepo_step_two.gif)

## Step three: 
Add some soothing wind sounds by pressing the play button in the top right corner.

![](dist/images/snippets/upepo_step_three.gif)

# Technologies

## Libraries:

- `Web Audio API`
- `MediaDevices`

## Node Packages:

- `Node Sass`

# Challenges 

## Diff Algorithm:

In order to get upepo's webcam motion detection working I had to learn a lot about diff algorithms.  A lot.

This is the code that actually finds the difference in pixel values of frames within the orange circle and triggers the sound.

![](dist/images/snippets/diffing_algo.png)

## Sound buffering

Through the use of `Web Audio` Web API and a dynamic event listener callback I was able to load the appropriate sound associated with the instrument selected from the side panel.  When a user clicks on an instrument, a window variable `window.currentInstrument` is updated, which in turn updates an `<img>` elements's src attribute.

![](dist/images/snippets/upepo_current_instr.png)

Once that src attribute is updated, `window.currentInstrument` is passed to the setupSample function which creates the new Audio Context and returns the buffered sample ready to be manipulated in other functions (i.e. playSample, stopSample, etc)

![](dist/images/snippets/upepo_sample.png)

