---
layout: post
title: "Beamtree Optimizations"
tags: [Technical]
---

Talking about summer laziness, I haven't doubleclicked on my visual C++ icon for at least two weeks. I am ashamed. I have been thinking however. Especially after I a chat with Harmless on ICQ. 

He promised us some thoughts on beamtree optimizations in his third article. I decided to ask him about the optimizations and he gave me some hints. That got me to think up some major improvements on the beamtree scheme that I know so far. Let me describe what I want. I bet this has been thought of before but I just want to make things clear. 

First of all, you all have read the document Phantom wrote about using a c- or s-buffer to get a perfect visibility set ( not a PVS :) ). What I liked about the s-buffer variant is that you wouldn't have to clip faces against octree nodes (from now on octree means kd-tree too) and that the contents of the octree nodes wouldn't have to be sorted. On the other hand Harmless said that the s-buffer will only give you quake style complexity and that the c-buffer will allow way more advanced levels. 

What I want is complex levels without sorted octree nodes and without clipping against octree nodes. This is a stupid statement cause this is what everybody wants! Still however I keep searching. 

I already told many of you I like the beamtree approach. It is entirely in world space and is much more cleaner (IMHO) then other approaches. For those who don't know what a beamtree is I suggest reading Harmless second article first. 

There are however some flaws in the beamtree algo I know. First of all the beamtree algo consists of two portions. 

1. Clip the a new poly against the beamtree
2. Insert the new poly in the beamtree, if it's not entirely clipped away. 

I will try to adress both issues. My new solution completely separates these two tasks and utilizes two "sort of" trees. 

1. Clipping a new poly against the beamtree. 

Clipping a new poly against the beamtree means clipping it against the beam of every poly in the tree. But in what order. From the top down? From the bottom up. I suggest an entire (I believe, but think not) new approach. 

A beam of a poly has a certain volume. The bigger the volume of the part of the beam behind the poly the larger the chance that it occludes something. I think if you divide the size of the area of a poly by it's distance to the camera, you will get a measure for the size of the occluded space. I will have to think about this some more but it can be calculated. So maybe a small poly very near the camera occludes more then a large poly very far away. 

Suppose we have a measure for the occluded region (let's give this a name: "beamSize" ). Now for all polys that are already considered and in the beamtree we maintain another ordered list of beamSizes. Then when we clip a new poly we will check against other polyBeams in order of beamSize. This is because the larger the beamSize the bigger the chance of being culled away. For me this sounds pretty logical. But then again, who am I? 

This involves sorting the already inserted polys in order of beamSize but it makes sure you clip new poly in the most efficient way. 

2. Inserting a new poly in the current beamtree 

After the poly is clipped and something is left then what is left should be inserted in the beamtree. BUT, since we are not inserting poly's front to back it could be that the inserted poly occludes another already inserted poly away. This one should therefore be removed out of the beamtree. Therefore I have another solution: After the new poly is inserted in the beamtree (in the usual way) you check every poly above (and therefore behind) the new poly against the beam of the poly to test whether it is entirely clipped away. If so remove it from the beamtree. 

This involves a lot of checking but it makes sure you have the smallest and best beamtree at all times. 

A third optimization is when testing against the beam of clipped polys, just test against the already constructed beam of the entire poly. The only thing this does is that you will have overlapping occluded regions. No big problem I think but it makes the clipping faster and it keeps the occluded regions larger which again allows for faster ditching of polys. 

I just told you some of the ideas I had. I really don't know where to post this kind of stuff anymore :). Is it in newsgroups, on Conor's mailing list, over here, or even in the Fountain? 

Please give me some feedback on this (esspecially on the first improvement, clipping in order of beamSize, since I think is pretty neat) 

Thanks...