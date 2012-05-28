---
layout: default
tags: [Technical]
title_mark_up: |
  <span class="type-xxl">Garbage</span><br>
  <span class="type-xxl">Collection</span>
---

Quoting from a post to the [Sweng GameDev](http://lists.midnightryder.com/listinfo.cgi/sweng-gamedev-midnightryder.com "Software Engineering, as it applies to Game Developers") mailing list...

> Seems like the death of C/C++ has been proclaimed for at
> least twenty years. The proposed benefits of higher level
> languages strike me as naive and theoretical. In practice
> those benefits don't materialize, in my experience anyway.
>
> Let me just pick on one thing today; garbage collection. Having made big-budget commercial games both with and without garbage
> collection, in my experience, these are myths:
>
>   1. C++ does not 'support' garbage collection.
>   2. Garbage collection reduces bugs.
>   3. Garbage collection saves development time.

Continuing:

> To me, "ownership and lifetime" is an important concept in software engineering.  When is something
> created, when is it destroyed and what higher level object is accountable for it? Garbage collection
> offers _one_ answer to the question of ownership and lifetime: Everyone referencing something share
> ownership and the lifetime lasts until it can't be referred to anymore.
> 
> I feel that having only one answer to the ownership and lifetime question is very
> limiting on expressive power. In many cases, a different approach to ownership and lifetime will give you a
> superior design. We sure don't want to live with inferior designs because the language has a dogmatic and
> limiting view of ownership and lifetime.
> 
> As far as development time and bugs, well in my experience a garbage collection system just gives you different
> sorts of bugs. With garbage collection, you will spend your debugging time trying to understand what link in super
> complex dependency chain is problematic, and even when it is identified you are left with only hacky approaches to
> breaking the undesirable links. Realize that with a console game, an object that does not get destroyed soon
> enough is just as fatal as an object that gets destroyed too soon, except the former is much harder to track down and fix.
> 
> In the end using garbage collection isn't a huge problem; I'm satisfied with the products I've made that use it.
> But I will say that whoever thinks garbage collection offer significant benefits to game development doesn't
> seem to be facing or solving the same problems that I confront.
 
I respect Gil's experience, and reading between the lines I suspect his actual stance on GC is quite a bit more
nuanced than appears from his email. But this email by itself shows he doesn't understand the fundamental advantage
of GC -- one you *will not* get with manual memory management.
 
Regretfully I don't have time to dissect Gil's email completely; if anybody wants to grab a room and whiteboard with me, I'd be more than happy to elaborate.
 
For now, I'm going to comment on one point only. Quoting Gil...
 
>To me, "ownership and lifetime" is an important concept in software engineering.  When is something created, when is it destroyed and what higher level object is accountable for it? Garbage collection offers _one_ answer to the question of ownership and lifetime: Everyone referencing something share ownership and the lifetime lasts until it can't be referred to anymore.
 
Read that last sentence again. Then, try to figure out what he means by "referencing" and "ownership"...

{% pullquote %}
  I don't care who owns what, I just want the resources...
{% endpullquote %}

When it comes to resources, only one thing matters: "any resource that is referred to from a piece of code that *might* still run at some point in the future *must* be alive."
 
Note this guarantee says nothing about ownership. I don't care who owns what, I just want the resources my code uses to be valid - regardless of whether subsystem X owns them,  or subsystem Y, or you, or my mom.
 
Some people will muddle this point by mentioning weak references, but actually the fact one can validate a weak reference corroborates the above.
 
Compare the above with: "any resource that is no longer referred to from any
piece of code that *might* still run at some point *may* be alive."
 
That's the point where ownership becomes important; because releasing
resources means other people can use them. This is particularly obvious for file- and
network-handles, because they have identity. Memory on the other hand is completely
anonymous. That 200 kB your system holds on to doesn't stop me from allocating the 200 kB that
I need, provided there is enough memory available (I'll come back to this caveat).
 
This distinction between resources with or without identity underlies why most
languages don't extend their GC mechanisms to cover file- and network-handles. It's why
C# has the using statement and `IDisposable` pattern, something that makes C++ programmers
invent smart-handle patterns in C# (and understandably so).
 
Now coming back to the caveat: _"...provided there is enough memory"_, which ultimately is the real
motivator for Gil's email. On most triple-A console titles, memory is at a premium. So that 200 kB
that you're still holding on to *does* matter to me, because the memory manager doesn't have
another 200 kB of memory lying around for me.
 
So we need those 200 kB back as soon as possible, and consequently we end up adding various manual memory management schemes back into our garbage collected code-base.
 
I'm totally sympathetic to that. Rewriting typical console titles using a garbage collecting C++ allocator (like Boehm) will probably end up with just as much manual memory tracking as they do already...
 
If we do that anyway, then why bother with GC...?
 
Remember the video where Steve Balmer cares about Developers?

{% assign class = 'full-bleed' %}
{% assign name = 'choice-surprise-focus' %}
{% assign title = 'Choice Surprise Focus' %}
{% capture figcaption %}Developers, Developers, Developers...<br><a href="http://www.youtube.com/watch?v=8To-6VIJZRE">Youtube Original</a>{% endcapture %}
{% capture figcontent %}
<img alt="Steve Balmer yelling 'Developers Developers Developers...'" src="/img/posters/steve-balmer-developers.jpg"
     width="400"
     height="300"/>
<div class="fig-content-stretch">
  <iframe width="400" height="300" src="http://www.youtube-nocookie.com/embed/8To-6VIJZRE?rel=0" frameborder="0" allowfullscreen>
  </iframe>
</div>{% endcapture %}
{% assign ratio = '4x3' %}
{% include component/figure.html %}
 
If you ask me: *"What's the purpose of garbage collection?"*, there's a good chance I'll go all Steve Balmer on you and scream: **"Concurrency, Concurrency, Concurrency"**...
 
Consider a program that runs entirely in a single thread. Between the allocation of a resource and all the places it is used, the code paths are defined in a purely lexical manner. That is to say; if you had enough time, you could search, stack-walk, code-step, and reason; until you had the fully deterministic flow between allocation and use of any resource.
 
And indeed, most of what we call "debugging" is precisely that activity: "...studying the code path to ensure ensuring that your resources are still valid at the point where you use them"
 
But even without a debugger, you could theoretically determine the flow from a lexical interpretation alone. Now consider a multi-threaded application; that program flow between allocation and use is no longer deterministic. Though theoretically your ability to reason from a lexical interpretation is still there, the complexity to do so grows exponentially with every additional thread - which means that in practice you no longer have a single lexical path between allocation and use; you have a large number of invisible temporal paths.

This is why concurrency is hard - we're not talking about a difference in degree; we're talking about a fundamental problem; you've lost your ability to reason about code lexically.
 
Wait a second, this email was about garbage collection, and now you're talking about concurrency?
 
Well, go back to the fundamental guarantee of resources, and notice I highlighted the word *might* when saying: "...piece of code that *might* still run at some point in the future..."
 
Depending on how smart you are, you can make a piece of code increasingly concurrent and still determine in your head when a piece of code *might* run. But even Donald Knuth has a breaking point, beyond which it becomes impossible to know if a resource might still be useful somewhere.
 
That's the point where Garbage Collection is no longer a luxury, but a necessity. Strictly speaking, garbage collection is dual (in the mathematical sense) to manual memory management - and through it, the computer can deterministically guarantee that any resource that is still referenced, is also available.
 
And if a resource that is referenced happens to be one that is needed; it'd better be available.
 
Does that mean that some resources may be referenced that are not actually needed? Yes, regretfully so; and for resources with identity, or on machines with limited anonymous resources (like memory); that implies we have to put some manual tracking back in again.
 
But GC with manual memory tracking put back in is a matter of performance. Whereas a sufficiently concurrent application without GC is not about performance, it's about correctness.
 
Consequently, future games will have to sacrifice memory to allow for conservative GC environments, if they want to leverage the available processing power.
 
Like I said above, I don't have time to dissect Gil's email completely. I wrote all of the above in a stream-of-conscious manner and I'm aware there's some hand-waving. If anybody's interested, drop me an email and I'll try to dig up some references when I have more time.