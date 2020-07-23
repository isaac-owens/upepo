# Welcome to upepo! ![](dist/images/bowl.png)
An interactive meditation app

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


# Challenges 

## Diffing algorithm:

In order to get upepo's webcam motion detection working I had to learn a lot about diffing algorithms.  A lot.

This is the code that actually finds the difference in pixel values of frames withing the orange circle and triggers the sound.
![](dist/images/snippets/diffing_algo.png)

## Sound buffering


