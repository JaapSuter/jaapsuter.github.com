---
layout: post
title: "Thousand Words"
tags: [conversation, code]
---

Sure, a picture is worth a 1000 words - but which 1000? I think most people don't realize how much information theoretic content fits in 1000 words...

<div markdown="1" class="quote">
I think that how much fits in 1000 words depends on which ones you already know, for one thing. :) 

Outside of a strictly academic sense of content.
</div>

Jup, and that's the source of many issues. 

The conflict between communicating more efficiently because one can make assumptions as to what the receiving end already knows - and communicating less efficiently because we make the wrong assumptions.

<div markdown="1" class="quote">
Certainly. Ongoing assessment is a gigantic part of teaching.
</div>

We had that conversation about paths of reasoning right? *A->B->C->...->Z*, and finding the longest common sub path? 

<div markdown="1" class="quote">
Yeah.
</div>

For the sake of comedy, let's pull some numbers from the internet...

The average word length in a typical English text is five letters.

The Shannon measure of entropy in the English language has an upperbound of roughly 1.3 bits per letter (i.e., the conjectured maximum compression level).

Not sure how spaces and punctuation factors into this, but let's assume and ignore. We calculate:

> *(5 \* 1.3 \* 1000) / 8*

And we conclude that a thousand words contains about 813 bytes of information.

<div markdown="1" class="quote">
Huh -- really? That's a lot lower than I'd expected. 

Ah, you know what, no it's not... :P 
</div>

I challenge you to give me a picture of 700 bytes or less that has a masturbation worthy quantity of erotic content... 

Whereas a thousand words, that could get you killed for most of history...    ;-) hah!

<div markdown="1" class="quote">
Hm, yeah, 700 bytes will be challenging. 

</div>
Shannon's estimate of 1.3 bits per letter feels low at first. I suspect it's caused by the multiplicative effect of the knowledge we bring to the table. 

Maybe a word like "democracy" is only *9 \* 1.3 = 11.7* bits, but the moment I read it, I prime a huge amount of associative data in my brain.

<div markdown="1" class="quote">

It does to you.

But that's all contextual. That's cheating.

Ooh -- I know I can get this down to 700 bytes. I've got 2075...  :-)

</div>

Right, it merely *feels* like "democracy" contains way more. For some people the amount of associative-information-content may feel close to what'd be needed for a book on the subject.

Conversely, the locality of images is why it suffers a problem that is almost opposite of the association-trigger we get from words. An image is a continuous representation of a local subspace. This is obvious for a painted portrait, but compressed digital imagery doesn't have much purpose until we expand it again - rendering the continuous locality it represented.

I agree, it's cheating; which is why I think the 1.1 bits number isn't as low as one might expect at first... 

I mean, ultimately a 700 byte text file contains just as much information as a 700 byte image.

How much?

Easy, 700 bytes...

But text can leverage priors, whereas images suffer from neighbouring pixels. Leave too much space between each pixel, and the image loses value rapidly.

Of course, leave too much space between words, and the text becomes useless... 

<div markdown="1" class="quote">

Hm. On the other hand, I'd accept that something like wavelet compression (and to a lesser extent, jpeg compression, I think) is a pretty meaningful representation of how we deal with images.

Which is kind of why I feel like a JPEG representation is a fair enough assessment of the actual content. It doesn't suffer as badly from those neighboring pixels. 

</div>

Acknowledging your wavelet comment...  

<div markdown="1" class="quote">

I assume you're familiar with [Isomap](http://isomap.stanford.edu/)? 

I ask because it was among the first things I thought of when you mentioned the idea of knowledge as a subspace way up there. 

</div>

I am not... searching. 

<div markdown="1" class="quote">

Plus, it's kind of my hammer-de-jour. 

</div>

Hey, nice! 

Bookmarked (... I'm in the middle of something currently that requires some focus, sorry)...

<div markdown="1" class="quote">

No worries. 

Sending an article back your way for when you've got a minute or two. 

It's an insane algorithm. 

</div>

Insane, how? 

<div markdown="1" class="quote">

Given a metric on the m-dimensional whole space, Isomap uses what is essentially a sort of SVD to develop an n-dimensional representation that "captures the essentials". 

What's insane is that in the paper I'm sending, their examples are 64x64 black and white images, using the obvious 4096-dimensional vector representation to give a metric, and the thing picks out (for example) a dimension in which a face in the image turns from right to left.

Anyway, as a metaphor, it makes me think that the problem of learning more about the world breaks into two parts. Easier is an extension in one or more dimensions (expanding spheres). Harder is an expansion into another dimension. 

The fun bit about Isomap is that if you ask it for a 2-dimensional representation, it'll feed back what (by the metric you give) are the 2 most important degrees of freedom. You ask for 3, it'll give you the exact same 2, plus another.

Similarly, I think that when we explore the world, there are dimensions that are required for survival, and there are dimensions that are required for further understanding. 

We kind of add as we go. 

</div>

Hey, thanks for observing the difference between extending along an existing dimension and discovering a new dimension...

Leveraging a previously unknown or misunderstood dimension is a better analogy than my portal reference to explain short-cuts.

<div markdown="1" class="quote">

I think the additional dimensions can be very profitable to. In as much as volume is a good representation of how much one understands, finding new dimensions offers exponential growth, where extending in existing dimensions is polynomial at best.

</div>

Hah, that's leveraging the non-linearity of higher-dimenional growth-rates to your advantage, instead of it being a source of despair and diminishing returns...

Of course, depending on how exactly one defines or measures dimensions, actually finding a new one is anywhere from a daily occurence to something that's only been done by a few well known historical figures (Plato, Newton, Einstein, etc. fill in the blanks, resolution-dependent)

<div markdown="1" class="quote">

Right. I think that we discover dimensions which are new to us quite frequently (annually, say), or can at any rate. New to humanity... I imagine that's a bigger deal.

Particularly because I guess there's no guarantee that we're finding them from highest eigenvalue to lowest.

</div>

I sense an opportunity for me to benefit from your math expertise. Tell me more about these **igon**-values...   ;-)
    
