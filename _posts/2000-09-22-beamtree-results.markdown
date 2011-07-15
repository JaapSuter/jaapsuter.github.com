---
layout: post
title: "Beamtree Results"
tags: [Image, Technical]
---

Take a look at this:

{% assign src = "beamtree-results.jpg" %}
{% assign alt = "Engine Screenshots" %}
{% include figure-with-caption.html %}

...that's four screenshots from some things I'm busy with currently. They might not be that spectacular at first glance but let me explain. 

The project I was doing is finished (well, at least for me) and I'm still waiting for the new project specifications. This means that currently I have some time left for a little "re-search" (pronounce each syllable exaggerated, like Dr. Evil pronounces "giant la-ser" in Austin Powers, The Spy Who Shagged Me). 

Anyway, I finally started implementing these beamtrees i've been talking about for so long. The idea was to throw in occluders and then test octree-nodes against the beamtree (all in realtime ofcourse). 

Jacco was working on a C-Buffer approach at the same time and quickly he and I realized that the C-Buffer approach was going to be way faster (after some neat optimizations you wouldn't think of until you implement it). Even though the C-Buffer works in screenspace and the beamtree in world- or camera-space, the C-Buffer is a lot faster. 

Since I had written the code for the beamtree already, I rewrote it to return the perfect visible polygon set from a given viewpoint and frustum. When you supply no frustum at all then the viewpoint is a 360 degree omni view (for lack of a better description). Try that with screenspace methods (and don't start me about a cube with six 90 degree frustums). 

At first I wanted to create a beamtree where you could insert the polygons in random order. This turned out to be way too complex (read: slow), because inserting a new node would also mean updating every other node again. So I opted for the good ol' front to back insertion again, which meant I would be needing a BSPtree, to obtain the front to back polygon list before inserting them into the beamtree. Yike, I never wrote a BSPtree before, but it's essentially the same as a beamtree, so I had it up and running in no-time at all. 

Okay, now the process is this. I insert the entire scene into the BSPtree. I obtain the front to back ordering of all polygons in the BSPtree. I insert these polygons front to back into the beamtree and presto: the perfect visible polygon set. 

Before I get to the screenshots, I would like to ask what is wrong with D3D's wireframe routines. Tristrips don't seem to be rendered correctly even when the line isn't clipped at all. Any ideas? This and the fact that I had to scale these pictures down, is why those wireframe shots in these pictures aren't quite right. I'm sorry. 

In the above scene you see 500 randomly placed, rotated and scaled cubes each containing 12 triangles. This means 6000 triangles to draw. This can be seen in the two left pictures. One in solid mode and one in wireframe mode. Each triangle has an alpha value of 0.1 so you can detect overdraws up to 10 pixels (completely white). Notice there is lots and lots of overdraw (even way more then 10 in some places). 

The right two pictures contain the perfect visible set. Notice that there is no overdraw at all. (Only at some edges, but that are probably precision errors of both my clipping routines (need to check my epsilons) and the edge interpolation of D3D). The wireframe mode however still seems to contain lots of polygons which is not very weird. First of all the BSPtree chops my triangles into lots an lots of pieces, and after that my beamtree chops them all up some more. 

I had to turn up the brightness and contrast of the right two pictures by the way, cause otherwise you wouldn't see a thing. You might have to adjust the brightness and constrast on your monitor as well to see something. I'm sorry about that. 

Let's show you some numbers. The scene starts of with 500 cubes. That means 6000 triangles. After inserting them into the BSPtree I ended up with 10344 polygons in the front to back list. That may seem a lot but you must remember that these cubes have been placed in the craziest way possible. That means lots of intersections of planes and polygons. Normal scenes (indoor stuff) end up with a lot less (but still a lot). I could optimize the BSPtree a lot by choosing the polygon that causes the least amount of splits at each treedepth. But that's is something for tomorrow. 
After putting these polygons into the beamtree I got... 

(sounds of trumpets).... 

2252 

polygons to draw. Which is a lot less then 10344 but even a lot less then 6000. Ofcourse I should mention that the 6000 were triangles and the 2162 were polygons which does make a difference. Maybe I should give vertex numbers next time. But it still is a nice achievement imho. Further more, calculating the perfect set doesn't take as much time as I expected. Way too much time for realtime applications, but for preprocessing purposes it's not much at all. 

After optimizing the BSPtree insertion routines (for minimal split counts) and using normal scenes this number could be improved even more. 

So we have a perfect visible set from a static scene as seen from a static viewpoint. What use is that? Well, here are some ideas: 

1. Use it to calculate the lightmaps. The viewpoint of the beamtree will be your light. This way you only calculate values for lumels that are visible from the light. This will get you perfect shadows and might be a lot faster then casting a ray from each lumel to the light to check for shadows. This approach does create multiple lightmaps for each polygon which have to be merged into one (during the preprocess), but at least your not doing calculations for lumels that won't be affected by a light. 

2. How about storing the beamtree for every light and inserting dynamic (downscaled) objects to obtain information about what lights should be used to light the object. This way dynamic objects will become darker in shadows. You could even test only one point of the object (as an approximation) , which is something that can be done very fast. 

3. You can mark beams in the tree not as occluders but as shaders as these beams pass trough translucent polygons. This means that these gothic windows you see in churches (with all the different colors) will light the ground accordingly. This all will be a lot faster then the lumel-light ray approach. 

4. Imagine a static security camera in a game. Create a beamtree from the camera and the static scenery. Then test for dynamic objects whether they can be seen from the camera. This can be done the same way as in 2, even using a single point as an approximation for the dynamic object. 

5. You can even rotate the camera by creating a 360 omni view beamtree and then first testing the object against the beamtree and then, if it is still visible, testing it against the current frustum of the camera. 

There are lots and lots of applications for a perfect set I suppose, but for now I hope my boss is going to let me implement a lightmap/shadow compiler. (hint hint :). 
