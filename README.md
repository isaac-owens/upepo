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


- getting an error I never saw before, keeping audio buffer from working
- researched and found out what a polyfill is
- plugged in the polyfill and got the audio to load

![](dist/images/snippets/runtime_error.png)
![](dist/images/snippets/runtime_error_solution.png)
