---
layout: post
title: "GBA Development"
tags: [Image, Technical]
---

Here are some shots of my very first Gameboy Advance (GBA) programming adventure. The past few weeks I've been on vacation in France, and every afternoon I would do some GBA programming on my laptop. Lying by the side of the pool, programming, with a view on the mountains. Very nice! 

<img src="/images/2001-8-17-gameboy-digressed/animated.gif" alt="Socrates Demo Screenshots" width="640"/>

Anyway, I started working on a project called Socrates. It's an object oriented library for the GBA written completely in C. Object Orientation in C? Yes, it's possible. 

The library is written for MODE-4 graphics. This is the only full-screen video mode that supports double buffering. The only drawback is that it's a 8 bits palettized mode, and that you can only plot two pixels at a time. So if you have to write one pixel, you must read-modify-write. However, this proved to be quite a funny obstacle in my polygon drawing routines. 

<img src="/images/2001-8-17-gameboy-digressed/screens.jpg" alt="Socrates Demo Screenshots" width="640"/>

About the images, from top to bottom, left to right.

 1. Crossfading, speeding this up was tricky. It's still not at full speed. I probably gonna need some ASM for this.
 2. Shows a couple of flatshaded cubes, with frustum clipping as well.
 3. A couple of flatshaded cubes without frustum clipping.
 4. Title-screen.
 5. Some kind of texturemapping, plasma-ish effect.
 6. Two texturemapped cubes with frustum clipping.
 7. More...
 8. ...Of
 9. The...
 10. Same.

The 3D engine is completely fixed point and I'm quite happy with the speed raw C delivers. Soon I'll add some inline ASM to speed thing up, but for now I'm focusing on getting some more functionality done. Though, Quake like 6DOF is not gonna happen on GBA. Unless somebody proves me wrong. 

Currently I'm working on a voxel landscape on GBA but I'm rather pessimistic on performance issues. I suppose I'll have to start doing some sprite, tile, background scrolling stuff soon. 

Overall, I love it. Working for a machine with low performance but a complete set of fixed functionality. No more compatibility issues. Jippie. 

By the way, it works on the real thing as well. Thanks DarkFader. 