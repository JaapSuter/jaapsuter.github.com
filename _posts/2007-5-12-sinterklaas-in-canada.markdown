---
layout: default
tags: [Video, Personal]
title_mark_up: |
  <span class="type-xl">Sinterklaas</span><br>
  <span class="type-xl">In&nbsp;Canada</span><br>
---

[% excerpt-begin %] Rather than having Santa Claus show up for Christmas, in Holland the tradition
involves a similar looking guy called _Sinterklaas_ who, on December
5th, also goes from house to house to deliver presents. [% excerpt-end %]

When I convinced him to visit Canada, I invited my friends using this video.

{% assign name = "sinterklaas-2007-invitation" %}
{% assign width = 720 %}
{% assign height = 480 %}
{% assign ratio = '3x2' %}
{% assign title = 'Invitation for Sinterklaas 2007' %}

{% assign class = 'full-bleed' %}
{% capture figcaption %}Download <i>{{ title }}</i> as 
<a href="/videos/{{ name }}.{{ width }}x{{ height }}.mp4">MP4</a>,
<a href="/videos/{{ name }}.{{ width }}x{{ height }}.webm">WebM</a>,
<a href="/videos/{{ name }}.{{ width }}x{{ height }}.ogv">Ogg</a>.{% endcapture %}
{% capture figcontent %}{% include component/video.html %}{% endcapture %}
{% include component/figure.html %}