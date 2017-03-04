# HTML5 Canvas Skywriter

My wife works in commercial real estate, and they had an ambitious idea to close one of their pitches: what if we could show an airplane writing “Hire us!” in the sky? As soon as I heard about it, I knew I wanted to animate the idea on an HTML5 canvas.

The basic idea is pretty simple: move an image of an airplane around the screen in the shape of some letters, and throw a bunch of sprites of a cloud puff behind the plane to look like smoke. But how should we express the shapes of the letters? Using a font was out of the question, so I ended up expressing the shapes of the letters as a series of mathematical functions. Luckily, most of the letters consisted of straight lines, but the curves in a few of the letters required a quick trigonometry refresher.

To add a touch of realism to the animation, each puff slowly fades away over time, so the letters eventually un-draw themselves!

[See this demo full-screen](https://ktbartholomew.github.io/skywriter/)

<iframe src="https://ktbartholomew.github.io/skywriter/" seamless style="width: 100%; height: 640px; border: none;"></iframe>
