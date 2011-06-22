---
layout: post
title: "Concurrent Jobs"
tags: [Image, Programming]
---

With thanks to Andrew Brownsword, Greg Underwood, Cliff Hammerschmidt and Ebor Folkertsma. 

>&#8220;...concurrency is hard! It's impossible to get right, difficult to debug, and
>we'll have problems that don't show up until three days before final. The picture below
>sums it up. The hardware manufacturers have created a monster, and it is up to us
>software developers to slay the beast.&#8221; 

<img src="/images/2007-4-10-parallel-fears/movie-poster.jpg" alt="Doom of Concurrency" width="640"/>
 
Or at least, that's a common perception.  But is it really so, or are things not as bad as they seem?
 
One of the sources of confusion regarding concurrency is that it covers a wide range of problems and solutions.  Parallelism exists at many levels, and lumping them all together has done more damage than good. Put the OpenMP guy in the same room as the Transactional Memory guy, and at best you'll have an acknowledgement that they're tackling two different problems. More often that not, they'll both claim to have the silver bullet that solves concurrency once and for all.
 
Luckily, the industry has begun to acknowledge there might not be a single, silver-bullet that will magically allow our software to leverage massively parallel hardware to the fullest. Instead, a taxonomy of parallelism is emerging that classifies different levels and corresponding solutions. As a result, subsets of the concurrency universe have become tractable.
 
One such classification within the developing taxonomy is at the instruction level. For example, SIMD operations that do arithmetic on vector registers. This is an extremely low level type of parallelism, operating on the data, and is consequently called data parallelism. That is; a form of parallelism that does a single thing to multiple pieces of data at once.
 
At the other extreme end is high level actor parallelism. This occurs when multiple independent actors run in parallel and communicate with each other through messages. An obvious example would be a game where each NPC executes within its own thread. That said, even the common architecture of having a separate sim- and render-thread is a form of actor parallelism.
 
Interestingly, it is actor parallelism that is often the most difficult to get right. It's where we run into deadlocks, starvation, race-conditions; all the usual suspects for threading bugs. Lower level data parallelism, however, is much easier to get right, and it tends to scale better. It is also what contemporary hardware is best at!  So we have a natural starting point for diving into the complicated realm of parallelism. What luck! The aim of this article is to highlight one particular level at which we can do data parallelism; the job level.
 
### What Are Jobs
 
The job concept appeals to most people's intuition. Nonetheless, the Job Manager team does occasionally receive a question that indicates a misunderstanding of what a job is. Often, this is the result of somebody trying to shoe-horn a threading model and its associated lessons into the job model. A key understanding to effective job use is to let go of threads and everything you learned with them. That is to say, if you find yourself considering scenarios of deadlock, messaging, & race conditions, you either really want to use threads and deal with those issues, or you're approaching the problem all wrong and should re-write using jobs.
 
A second misconception is that jobs are only for running things on the SPU. This too, is the wrong mental model. Jobs have a much larger motivation that we'll get to in a second. First, let's ask ourselves; what is a proper job then? Put simply...
 
Jobs are Asynchronous Function Calls.
 
That's all there is to it. You have some work that returns a result that you won't need until later. Therefore, it is a prime-candidate for jobification. Submit the job, let it run in the background, do some other work in the meanwhile and at some point in the future wait on the work to complete to get access to its results. 
 
### Why Jobs Make Sense
 
The claim that jobs are like asynchronous functions hints at the overarching motivation for writing jobs. Namely, that it allows us to spawn multiple asynchronous pieces of work and get dynamic load balancing for free. One analogy is to look at the hardware like a jar that you need to fill to the top with rocks. Overflowing it is like blowing your sixty frames per second budget. Having empty spots is like underutilizing the hardware.
 
If all you have a are two big irregular pieces of rock (like say, your sim- and render-thread), it'll be tricky to fill the jar without overflowing it, and simultaneously you'll have empty spots on the sides. If, on the other hand, you have a large collection of nice, regular, small-sized pebbles, you can fill the jar to the brim and have few empty spots on the inside. You'll stay within the sixty frames per second budget, and get maximum performance from the hardware.
 
Jobs, when seen as asynchronous functions, are the right level of granularity to use for today's number of cores. Based on performance measurements and the typical code we write, the job model strikes a good balance between being sufficiently fine-grained and balanceable without straying too far from our existing mental models. It is a development model that will continue to scale for the coming years until we enter the manycore era (over 200 cores) at which point we'll need compiler and languages support for parallelization.
 
Arguably there is more to jobs than them being asynchronous pieces of work. EATech's Job Manager has support for advanced use-cases like dependencies, forking, affinities, priorities, etcetera. 
 
However, at this point the major win for EA is in more people writing simple jobs, not in a select few writing complicated scenarios. This begs, the question; why aren't more people writing jobs?
 
### Why We Aren't Writing Jobs
 
There are three reasons we aren't jobifying enough of our games. First, transforming a problem such that it can easily run asynchronously remains a non-trivial matter. Second, we have indirectly been discouraging people from writing jobs. Lastly, writing, building and running a job has carried a significant overhead until recently. As of today, only one of these reasons remains a valid justification for not writing jobs, namely that we ran out of problems that are embarrassingly parallel.
 
Having to come up with solutions to problems that we've solved serially in the past decades is far from intuitive. We have decades of experience writing large bodies of code with side-effects that jump all over memory. Jobs are often better suited for problems that have little to no side-effects, take well-formed input, and produce singular outputs.
 
Unfortunately, tackling this particular obstacle is beyond the scope of this article. Andrew Brownsword does a great talk on designing for concurrency, the video of which can be found here: ? http://www.worldwide.ea.com/articles/view.aspx?id=2009. He allowed me to quote some valuable advice:
"When designing a piece of software we must aim to make it vectorizable.  What this means is that the API and architecture should be arranged in such a way that when (and if) the time comes to optimize it, the programmer doing the optimization can apply the techniques of both vectorization and jobification.  Vectorization is not like jumping off a cliff.  Techniques can be applied, usually incrementally, that make code more and more vectorized.  Jobification can also be done in stages of complexity, but the first step (pushing the work into a single job) is a bit of a leap.  Interestingly many of the first steps in vectorization also aid in jobification.  This includes:  encapsulating the work done over a set of objects in one function, privately organizing objects in an array (or arrays) instead of allocating them publicly from a heap, hiding direct access to object data from outside a system, separating request from result, avoiding touching globals and calling major functions and other systems, etc.  Once these things have been done, profiling should guide further iterations of optimization.  The nature of the problem will dictate whether pushing the function into one job, multiple jobs, a sequence of jobs, or the application of various vectorization techniques is most appropriate."
The aim of this particular article is to dispel the other two excuses that we use to avoid jobs. Once these two obstacles are removed we can spend our time studying the jobification of non-trivial problems.

The two excuses that are no more...
 
As recent as the November 2006 conference about PS3 and concurrency at EAC, it was the PS3 experts of the company who agreed that only a select few on each team would be the SPU experts. It was generally accepted that SPU voodoo meant that we had to limit their power and responsibility to only those with the skills to wield that power. In addition, we've been continually bombarded with messages about DMAs being slow, branches costing too many cycles, and scalar code running inefficiently on the SPUs. As a result, we've intimidated ourselves into believing that only by going to raw C and assembly can we use the SPUs. This resulted in a passive de-motivation for people to start writing jobs at all.
 
 We no longer think this is a good recommendation. Yes, there are limitations to the PS3 bus that limits DMA transfers. Indeed, there is reason to believe that heavily vectorized code can perform orders of magnitude faster than naively implemented scalar code. But the fact of the matter is; an SPU that runs slow code is still doing more work than an SPU that does no work at all. The average EA title is using the SPUs about thirty percent of the time. We now understand, better than before, that the SPUs are not utility processors. Instead, they are the PS3's main workhorses. Ask yourself not; what can I write on the SPU? Instead ask yourself; what can I not run on the SPU? This view has been confirmed by several presentations at the recent Sony PS3 DevCon in San Francisco.
 
Consider the picture on the left. The top bar is some amount of work before optimization has been done. The second red bar is what we've been focused on and obsessed with for the past two years. The green bars that run in parallel is what kind of times we could have, if instead we focused on jobification. Even if the code inside each individual job is inefficient, the overall result is a win. With our SPUs sitting idle seventy percent of the time, and similar numbers for Xenon cores, which strategy is better?
 
Another advantage of going widely parallel before we optimize an individual job is that we can continue to write cross platform code. One doesn't have to resort to SPU or Xenon specific data-structures. Instead, we develop a single code path that work across all  platforms. This saves us a lot of time, especially when it comes to debugging.  Each job may run abysmally slow compared to a platform-specific, optimized bit of hand-coded intrinsics, but your whole game will run faster.
 
One thing in particular has stopped us from writing jobs that run on the SPU, and that's the limitations of the local store. At this point, most people that work for the PS3 are familiar with the fact that the SPUs only have access to 256 kilobytes of memory. That means having to do DMAs from main-memory.
 
 After all the horror stories about limitations of the bus and DMAs being tapped out soon enough (admittedly, I took part in spreading these horror stories), we've collectively become so terrified of doing DMAs, that only the most daring of programmers dare to write SPU code. Well, I say: "No more!" The new mantra for DMAs on the SPUs should be:
 
DMAs on the SPUs are no worse than cache-misses on a Xenon core.
 
In some way, this makes manual DMAs more appealing than Xenon code can be. Sony forces us to be explicit about our cache misses, and hence gives us opportunities for future optimizations. Nonetheless, for the time being you should ignore the cost of DMAs, and use them on a scale from judicious to careless to full-on reckless. Let us first get our SPU usage up to a full hundred percent, and then worry about tapping out the DMA bus. Should a job be too costly on the SPU we can rewrite it, or we can move it to the PPU with a simple flick of a switch.
 
The second major excuse that stops people from using jobs is the fact that writing, building and running them has been quite a chore up to this point. There has been more than one job scheduling system in the company, building jobs for SPU used to be non-trivial, and having to learn the intricacies of SPU limitations turned off a lot of people. This is no longer an issue!
 
Today's technology to write, build and execute jobs on any platform, be it Xenon, PC, PPU or SPU, is standardized, available, and easy to use. With Job Manager and the Job Utilities that are available today, you can write cross-platform jobs that simplify all aspects of jobification, except one; the transformation of your problem from serial to parallel.
 
A good start to learn about this environment is the job_example package available on the EA open source server. It contains the canonical SPU build-pipeline, the simplest scheduler setup, and a trivial application of jobs to solve a problem in parallel.
 
### Conclusion
 
Jobs are here to stay, and it's best to think of them as asynchronous function calls. There used to be three excuses not to write jobs:

 * Jobifying a problem is hard.
 * SPU programming is only for experts.
 * Writing, building and running jobs is hard.

Today, only the first of these continues to be an issue. With the other two excuses out of the way, nothing stops us from getting better at jobification.
 
Actor level parallelism may continue to intimidate us (and rightly so, until we have better languages and tools), but data parallelism should not. The tools and technology are here and continue to improve on a daily basis. The sooner we pick it up, the sooner we'll all be writing jobs instead of becoming dinosaurs without jobs.

<img class="outline" src="/images/2007-4-12-synergistic-hide-and-seek/spu-pretend.jpg" alt="There is no SPU." width="640"/>

Go forth, and jobify.
