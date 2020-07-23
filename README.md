# Welcome to upepo! <img src="dist/images/bowl.png" height="30px">

Upepo is a motion detection app that let's you play soundtherapy instruments with nothing but your webcam!  

## Step one: 
Choose an instrument from the side panel 
- singing bowl
- wind chimes
- gong

![](dist/images/snippets/upepo_step_one.gif)

## Step two: 
Wave your hand in the orange circle and hear your instrument play! Magic!

![](dist/images/snippets/upepo_step_two.gif)

## Step three: 
Add some soothing wind sounds in the background by pressing the play button in the top left corner. Aaah, that's nice.

![](dist/images/snippets/upepo_step_three.gif)

# Technologies

## Languages

- `Javascript`
-  `Node.js` (npm)
- `HTML`
- `Sass`

## Web APIs:

- `Web Audio API`
- `MediaDevices`

## Node Packages:

- `Node Sass`

# Challenges 

## Diff Algorithm:

In order to get upepo's webcam motion detection functioning I had to learn a lot about diff algorithms.  A lot.

Simply put, this is the code that actually finds the difference in pixel values of video frames within the orange circle and triggers the sound.

![](dist/images/snippets/diffing_algo.png)

## Sound buffering

Through the use of `Web Audio` Web API and a dynamic event listener callback I was able to load the appropriate sound associated with the instrument selected from the side panel.  When a user clicks on an instrument, a window variable `window.currentInstrument` is updated, which in turn updates an `<img>` elements's src attribute within the orange circle.

![](dist/images/snippets/upepo_current_instr.png)

Once that src attribute is updated, `window.currentInstrument` is passed to the setupSample function which creates the new Audio Context and returns the buffered sample ready to be manipulated in other functions (i.e. playSample, stopSample, etc)

![](dist/images/snippets/upepo_sample.png)

## I really hope you enjoy upepo and that it can bring you piece, joy, and fun in your meditations, on your breaks, and any other way you see fit to use it!

Created by Isaac Owens 2020 &#169;

