---
layout: default
tags: [Video, Technical]
title_mark_up: |
  <span class="type-m">Choice&nbsp;Surprise&nbsp;Focus</span>
---

{% assign class = 'full-bleed' %}
{% assign name = 'choice-surprise-focus' %}
{% assign width = '640' %}
{% assign height = '480' %}
{% assign title = 'Choice Surprise Focus' %}
{% capture figcaption %}Download <i>{{ title }}</i> as 
<a href="/videos/{{ name }}.{{ width }}x{{ height }}.mp4">MP4</a>,
<a href="/videos/{{ name }}.{{ width }}x{{ height }}.webm">WebM</a>,
<a href="/videos/{{ name }}.{{ width }}x{{ height }}.ogv">Ogg</a>.{% endcapture %}
{% capture figcontent %}{% include component/video.html %}{% endcapture %}
{% assign ratio = '4x3' %}
{% include component/figure.html %}

[% excerpt-begin %]

Recording of a talk I did in April of 2008 at Electronic Arts. I explain how
software development is influenced by psychology from three different angles.

[% excerpt-end %]

Segments that discussed proprietary EA technology have been
remoevd. About half the footage remains, mostly non-technical -- just
enough to entertain a small audience (e.g., some friends).

Credit where credit is due, this talk uses material from
Lawrence Lessig (presentation style and font), Guy Kawasaki, Barry
Schwartz (the Paradox of Choice), Jeff Atwood (microwaves), Jeff Hawkins,
JasonCooper, and Tipper (music).
