---
layout: default
tags: [Technical]
---

This article presents some non-technical thoughts that affect the process and structure of a tools and libraries group.

## Being a Benchmark

A building is only as strong as the foundation it is built on and the tools it is built with. This age old saying may apply to software engineering more than to building construction itself. Game teams are in construction, but they are using the foundations and tools we supply. Tools and library people have the responsibility to offer the best possible technology to enable other teams to work effectively. This may sound obvious, but this idea should be taken to the next step. Not only should our technology be the best, its quality should act as a benchmark that other developers strive for. Libraries are generally
better designed and implemented than most game specific code. As such, tools and libraries has ability to increase familiarity with modern patterns and idioms across the company.

If I cook just for myself, I often just throw something in the microwave and be done with it. If I have guests over however, I go above and beyond to make a good impression. The analogy is easily applied to tools and libraries. Because our code is seen by all teams worldwide, we should hold ourselves to a higher standard and demand only good quality software.

This ties in with a sense of pride as well. As the reputation of the software we write improves, we can be prouder of what we do. Not only does this improve morale immensely, it also creates a reinforcing effect that leads to even better software.

## Transparency

We need as much transparency as possible in the full decision making process. From the day a library is proposed all discussions need to be made available through a mailing list or newsgroup, preferably the latter; making it easy for any developer worldwide to catch up on the latest progress at his own
pace, without his inbox filling up.

I want to take this even further and strongly argue that any developer worldwide should be able to add to and comment in said newsgroup. This creates a level of involvement that can never be achieved through bare minimum requirements gathering.

One might think this would lead to chaos; once
every engineer is able to be involved in design and
implementation discussions. This does not need to
be the case, and we should welcome all contributions.

It is surprising how many engineers do not particularly care about these issues and are too involved in their responsibilities on the game team. For these people, our transparency removes some of our liability, giving us the ability to say in much friendlier words than I do here; "why didn't you complain about this when it was discussed two months ago?"

Other engineers will welcome the transparency and feel part of the process. Not only does this give us more information to base decisions on, it also provides future buy-in. Finally, the enthusiastically involved people can be headhunted and be potential team-members developers in the future.

To encourage cross pollination of ideas, I recommend minimizing the number of fora. Usually two suffice, one technical one for internal design issues, and a user one for customer 
support type issues. Developers of different libraries will get to see all discussion on other libraries and have a chance to get involved.

Obviously the merits of face-to-face contact and
white-board sessions should not be ignored. These
kind of meetings should continue, but we should
strive to always publish meeting notes afterwards.

The bottom-line is that every engineer should be considered a potential tools and library
developer. The people doing primary development just happen to get paid to work on tools and libraries full time,
whereas most other engineers have a game as their first priority and appear mostly as customers.

## Priorities

Obviously in-house development is different than voluntary open-source projects. What a library author
deems a high priority may not always be what is best for the game studio.

Typically, the product manager is the primary liaison with other teams and involved in requirements gathering and prioritizing tasks. This
role is perfectly suited to manage the balance between what the majority of customers wants and what the best priority for a studio is.

Furthermore, the forum is only intended for questions and advice. If a question points out a bug or a feature request, an official report
or request still needs to be logged through tracking software. These tasks can be prioritized in the traditional sense. For the sake of
transparency, it is recommended to publish a daily task and priority list.

## Architects

The role of an architect is an odd one. Traditionally,
this role is lumped together with the role of technical lead. However, a technical lead has responsibilities beyond those of an architect. He is responsible
for scheduling, requirements gathering, splitting up
tasks, people management and ultimately for a timely
delivery of the promised technology. Unfortunately,
the last requirement conflicts directly with the goals
of an architect. In the ideal world, the architect has
all the time of the world to come up with the best
possible architecture.

Obviously this luxury is not available to us, but
it is worth splitting off the role of an architect and
making him stand alone. This makes what is often an
internal dialogue an explicit discussion between people. Design and implementation trade-offs can now
be discussed. One group of people is concerned with
timely delivery of software, while the other group is
responsible for ensuring the quality of the software.

Obviously the chemistry between a technical lead
and an architect is more subtle in practice, but the
above illustrates the need for architects.

Unfortunately, architects are hard to justify. Their
contribution to technology is hard to measure and
their productivity can not easily be seen. Nevertheless, we should strive to create a group of dedicated
architects whose sole responsibility is to ensure that
we publish high quality technology. A single
architect can easily cover more than one library, and
it wouldn't take many of them to cover the current portfolio.

Among other things, the daily tasks of an architect
consist of the following activities.

* Being involved in all aspects of library design
and implementation, offering advice where necessary and asking hard questions where possible.
* Mentoring other engineers and encouraging discussion of software engineering and design practices.
* Managing formal reviews, making sure the entry
level barrier of an accepted library remains high.
* Managing forum discourse, moderating
them, providing answers or tracking down people that have the answers.
* Refactoring of existing technology.
* Writing additional tests for existing and new libraries.
* Keep an eye on practices and techniques being
used in the industry at large and making sure
we are aware of what the rest of the world is
doing.

## Formal Reviews

A library can be in one of two stages; it is being
developed or it has been released and is being maintained. The transition between the two stages needs
to be more than just a person uploading a zip-file
somewhere. An official release is a crucial event that
changes the interaction between customers and developers from an informal design and implementation
discussion to one where clients have to submit official bug and feature requests which developers must
manage and prioritize.

It is therefore important that we establish a release
procedure in the form of a formal review process. The
formal review separates the libraries that are being
developed from those that get the official 
seal of approval for outstanding quality, ease of use,
performance and robustness. Having passed a formal
review should be a significant accomplishment for the
library authors and offer a sense of pride.

Formal reviews provide a good opportunity for developers outside of the team to have a look at our
work, without having to spend too much time on involvement during the earlier design stages. It is a
single point in time where we can align all developers
and say; here's your chance to have a look, complain,
request changes and offer suggestions.

To fit the formal review process within the scheduled
nature of in-house developed (as opposed to open-source development), formal reviews need to be
scheduled well in advance of the actual library re-
lease. This way if changes are required coming out of
the formal review, they can be addressed before the
actual release.

A formal review should answer one question; "does
the quality and usefulness of this library warrant an
official release?" Reviews should comment
on the quality of the design, implementation, tests
and documentation, as well as the general usefulness
and applicability within the organization.

Failing a formal review should be rare occurrence,
given libraries undergo extensive informal discussions
earlier in their development. However, we should al-
low for review failures and this essentially puts a library back into a state of development. This doesn't
stop other teams from using the library, but it puts some restrictions on the support we offer and their
future stability.

## Testing

If we can only invest time and energy into one area,
testing should be it. As a tools and library team
only tests allow us to prove to our customers that
we can live up to our promises. Without tests we
are just releasing interfaces with unknown chunks of
bits and bytes that may or may not provide a valid
implementation.

Furthermore, as libraries are maintained and up-
graded, tests are the only possible way to prove
that new features or bug-fixes haven't introduced new
bugs. The proof is not conclusive, but it's the best
possible way to gain a level of coincidence.
All library development should be done with testability in mind and in many cases we should be writing the tests before implementing the interface. Test
driven development guides interface design and generally leads to minimalistic software that doesn't
over-promise and then under-deliver.

Our tests should be run continuously on dedicated
test machines. These machines should do constant
updates of our source control development branch
and run incremental tests and nightly full tests. Ideally, we have one or more dedicated test engineers
that will maintain and streamline these machines. It
is still up to library engineers and architects to actually write the tests.

We should publish continuous test results for each
platform on a website available to all developers worldwide,
not just for libraries that have passed a formal review,
but also for libraries that are in development and
official libraries that are being upgraded towards a
next release. This way teams can decide if it is worth
the risk to take a particular snapshot of a library. We
should not restrict them to just official releases but
offer the trust that they can decide what is best for
them. We need to give them the tools for this, and a
continuous status of our tests is the most important
one.

## Documentation

I have generally not been impressed with the documentation that typical in-house libraries offer. What is
often lacking is good introductory tutorials that not only provide an easy way into a library, but
also allow me to decide whether or not I want to use this library in the first place. Customers like it when
they can get a sense of what a library feels like just from looking at the documentation, without having
to actually install and try using it.

The second piece of documentation that is an absolute requirement for good libraries is a section dedicated
to rationales. It is here where the author can justify his design and implementation decisions. This
avoids a large amount of recurring questions that developers otherwise face. As a user of a library I want
to know why certain things are done the way they are and such rationales go a long way towards growing sympathy for a library and deciding to use it.

## Conclusion

This document has presented several non-technical
ideas on how a tools and library team can establish a
favorable reputation towards its clients and develop
better tools and libraries. Technical suggestions are
left for other articles.

First and foremost, the tools and libraries team
itself should hold up a mirror and decide if they are
the engineering benchmark they should be worldwide.

Transparency will increase discussions, enthusiasm
and buy-in among developers and customers. The
help of dedicated architects whose primary focus is
quality assurance and fostering discussion among developers will ease the task of technical leads and make
the dichotomy between quality and delivery more explicit.

Formal reviews allow us to create a seal of approval
that separates libraries whose quality and interface
we can blindly trust from libraries that are under
more active development. Extensive and continuous
test coverage and documentation that offers introductions and rationales will
further help us establish a reputation of delivering high quality industrial
strength tools and libraries.
