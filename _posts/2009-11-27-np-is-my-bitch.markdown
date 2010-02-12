---
layout: post
title: "NP Is My Bitch"
tags: [conversation, future]
---

### Jaap
Let's put aside for a moment the existential risk from AI. I'd like to hear your thoughts
on how we might actually get there in the first place.

Because hey, what's the point of discussing extinction if we don't even run the
risk?

Three, two, one, see ya... -- right?

### Michael
Cooper's law strikes again.

### Jaap
Damn, we're so screwed... ;-)

### Michael
How we might get where?

### Jaap
Recursive self-optimization. I'll seed the topic...

We'll stay in the realm of traditional intuitive computing paradigms. E.g., we ignore quantum computing et al. for a minute.

Then again, a lot of qubits are **more Turing less NP-is-my-bitch** every day...    ;-)

### Michael
Agreed, quantum computing is a long ways out, and seems relatively specialized at
this point.

### Jaap
Furthermore, let's ignore the consequences of an AI ordering or manufacturing new hardware for itself.

So we have some fixed size
address space, and IO ports with fixed bandwidth and latency.

### Michael
Interesting...

I like your parameterization.

### Jaap

Furthermore, we have a processor with some kind of instruction set.

Alternatively, there'd be multiple processors, but really; any set of N parallel computers are just a
slow variation of an N times faster single computer.

By the way, I must say that *NP-is-my-bitch* would be an awesome band name.

### Michael
Haha -- great band name, agreed.

Well, there's something. In principle, it seems like we can boil this down to Turing machines.

In reality, I think we will see recognizable AI as a result of massive parallelism.

Because building things "wider" gives us exponential growth, whereas building them
"faster" gives linear growth.

### Jaap

As a result? You mean a practical result, not a theoretical result? I.e., embarrasingly parallel algorithms are 
trivially sped up by adding more hardware side-by-side.

### Michael
Roger.

### Jaap
The same practicality comes into play when we talk about turing machines, and study the consequences of a fixed size address space.

Barring a revolutionary paradigm shift in computer science, we'll have to fit both code and data in memory.

Insert obligatory *code is data is code* Lisp truism here.

We can execute the code on a turing machine, but you're going to need one hell of
a long tape (large address space) and one hell of a fast tape reader/writer/mover.

### Michael
Exactly.

### Jaap
In other words, by climbing up on the hierarchy of instruction complexity, we lower
the storage requirements for code, leaving more storage for data (memory of the
past, temporary buffers for simulation, etc.)

But, this gain comes from sacrificing code-generality through hardwired instruction set assumptions.

My intuition offers two plausible statements:

 1. Recursive self-improvement is easier is for software than for hardware.
 
 2. The difficulity of self-improving a constant size bit-string is proportional to the instruction set size.

In other words, **as the complexity (and *usefulness* for some definition thereof) of your instruction set goes up, the ease with which said instructions can introspect and self-improve goes down.**

I'm not confident enough to try and formalize this, but instinctively I think it's easier
to analyse and evolve simple Turing tape programs than it is to analyse and evolve x86
strings of the same length.

A supporting thought for this notion is that proper analysis of x86 bit strings
would require you to fill part of your address space with x86 definitions.

Let's see if I can put some bogus numbers on this to give an idea....

Take an address space of 1000 units. Then...

 * ...recursively self-improving Turing tape program: 200 for the current program,
10 for storing how the host turing machine works, 790 left to work with.

 * ...recursively self improving x86 executable: 20 for the current program, 580
for storing how an x86 host machine works, 400 left to work with.

### Michael
Interesting thought.

### Jaap

 * Perceived running speed of Turing machine, slow.
 * Perceived running speed of x86 machine, fast.
 
But what is perception? So what if a RISC machine runs at higher clock frequency, a CISC might run one useful instruction
in the same time that a RISC runs twenty supporting instructions.
 
 * Self-improvement rate Turing machine, small changes at high frequency.
 * Self-improvement rate of x86 machine, larger changes less often.

There are lots of holes in this idea I'm sure; and the numbers are worse than bogus. I'm just
trying to illustrate a curious thought here, which is that increases in computing-efficiency (through specialization in
CPU instruction dialects) may decrease computing-introspectability.

### Michael
Catching up...

### Jaap
Hang on, I worded that poorly.

I mean increases in complexity of models for computing.
