---
layout: default
title_mark_up: |
  <span class="type-l">Valentine's&nbsp;Day</span><br>
  <span class="type-l">Outsourced</span>
tags: [Video, Personal]
---

[% excerpt-begin %] So it's almost Valentine's day, and you still don't have any good ideas. As panic sets
in, you do the obvious thing... procrastinate. [% excerpt-end %]

Then while surfing the web and cleaning up some old bookmarks, you stumble upon <a href="http://waxy.org/2008/11/the_faces_of_mechanical_turk/">The Faces 
of Mechanical Turk</a> and suddenly wonder; _"What if I pay a bunch of complete strangers one dollar each to..."_

{% assign class = 'full-bleed' %}
{% assign name = "valentines-day-outsourced" %}
{% assign width = '720' %}
{% assign height = '400' %}
{% assign title = 'Valentine's Day Outsourced' %}
{% capture figcaption %}Download <i>{{ title }}</i> as 
<a href="/videos/{{ name }}.{{ width }}x{{ height }}.mp4">MP4</a>,
<a href="/videos/{{ name }}.{{ width }}x{{ height }}.webm">WebM</a>,
<a href="/videos/{{ name }}.{{ width }}x{{ height }}.ogv">Ogg</a>.{% endcapture %}
{% capture figcontent %}{% include component/video.html %}{% endcapture %}
{% assign ratio = '16x9' %}
{% include component/figure.html %}