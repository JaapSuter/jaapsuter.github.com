---
layout: default
title_mark_up: |
  <span class="type-xxxl">Lab</span>
permalink: /lab/
---

<h1>&para;</h1>

<h3>I'm written in smallcaps "neat, eh?" or 'singles'</h3>
<h3>I'm written in smallcaps "neat, eh?" or 'singles'</h3>


<div class="center-fifty">
  <div class="rhythm">
    <div class="melody">
      <p class="leading-4x3">
        The remainder is merely filler text for testing various layout and typographical matters. The contents is pulled randomly from 
        other pages on this website, typically in paragraph-sized chunks.
      </p>
    </div>
    <div class="drum" role="presentational"></div>
  </div>
  <div class="rhythm">
    <div class="melody">
      <p class="leading-4x3">
        The remainder is merely filler text for testing various layout and typographical matters. The contents is pulled randomly from 
        other pages on this website, typically in paragraph-sized chunks.
      </p>
    </div>
    <div class="drum" role="presentational"></div>
  </div>
</div>

<div class="center-fifty">  
  <div class="rhythm">
    <img class="melody" src="/img/aspect-ratio-4x3.png" alt="" width="800" height="600">
    <div class="drum" role="presentational"></div>
  </div>
</div>

Testing underlines and descenders; [ep:/ajaqug, (3241527890); JaQ-$_@.a](#)

Here's a clog &para;, isn't that neat?

<div class="rhythm">
  <div class="drum-before"></div>    
  <div class="img-after">a b a b a b a b a b a b a</div>
</div>
  
[% excerpt-begin %]

Let's verify that various typographies are converted -- using [Smartypants](http://daringfireball.net/projects/smartypants/) -- by comparing
implicit 'single' and "double" quotes with their literal &lsquo;single&rsquo; and &ldquo;double&rdquo; entity counterpart. These
words are *emphasized* and **strong** as processed by [Markdown](http://daringfireball.net/projects/markdown/). Water is H2O and 
<span class="math"><i>e</i><sup><i>i</i>&pi;</sup>&nbsp;+&nbsp;1&nbsp;=&nbsp;0</span>, verifying sub- and superscript, as well
as the en&#8209;dash, the (non&#8209;breaking) hyphen, and the minus sign. Here's some
old-style numbers: 1018, 1997, 2012. And HTML5 would mark up TLA and HMLAA -- such as WYSIWYG and IOTD -- using
the `abbr` element, which [itself](http://en.wikipedia.org/wiki/Use-mention_distinction "Use Mention Distinction") should be
wrapped in `code`, ad infinitum. Or stack overflow, take your pick.

[% excerpt-end %]

{% assign pullquote = 'Pull&shy;quotes are used to &#x263A; grab &#x270C; attention.' %}
{% include component/pullquote.html %}

The remainder is merely filler text for testing various layout and typographical matters. The contents is pulled randomly from 
other pages on this website, typically in paragraph-sized chunks.

<div class="sidebar"><aside>
 <div class="rhythm">
    <div class="melody">
      <p class="leading-4x3">{% hyphenate %}
        This is a multi&#x2011;paragraph sidebar block. There's not much of interest in it, but it'll be just
        enough text to fill a sidebar alongside two main paragraphs.{% endhyphenate %}
      </p>
    </div>
    <div class="drum" role="presentational"></div>
  </div>
  <div class="rhythm">
    <div class="melody">
      <p class="leading-4x3">{% hyphenate %}
        Here's the second paragraph. It's about as boring as the first paragraph, but it manages
        to fill up this block to a useful height for testing.{% endhyphenate %}</p>
      </p>
    </div>
    <div class="drum" role="presentational"></div>
  </div>
</aside></div>

{% hyphenate %}
{% long_paragraph %}
{% endhyphenate %}

{% short_paragraph %}
{% medium_paragraph %}
{% short_paragraph %}

## Secondary Header

{% long_paragraph %}
{% short_paragraph %}
{% medium_paragraph %}

## Some typography

<span style="line-height: 0; font-family: tsi4n, serif; font-style: italic">0123456789 abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ</span><br>
<span style="line-height: 0; font-family: tsn4n, serif; font-style: italic">0123456789 abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ</span><br>
<span style="line-height: 0; font-family: tsn4n, serif;">0123456789 abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ</span><br>
<span style="line-height: 0; font-family: georgia, serif;">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>
<span style="line-height: 0; font-family: tsn4n, serif;">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>
<span style="line-height: 0; font-family: tsn4n-tnum-lnum, serif;">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>
<span style="line-height: 0; font-family: tsn4n-smcp, tsn4n, serif;">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>
<span style="line-height: 0; font-family: tsi4n, serif; font-style: italic;">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>
<span style="line-height: 0; font-family: tsi4n-tnum-lnum, serif; font-style: italic;">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>
<span style="line-height: 0; font-family: tsi4n-smcp, tsi4n, serif; font-style: italic;">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>

## Type metrics

{% hamlize %}
  .type-metrics-sample
    Jaap Suter bHxp
    .ascent
    .cap
    .ex
    .baseline
    .descent
{% endhamlize %}

## Lists

### Unordered List

<p class="line-before-list">Line before list, verifies indent match.</p>

* List item 01
    * List item 01 sublist a
    * List item 01 sublist b
* List item 02 is much longer and is very likely to wrap to the next line entirely. To improve the chances of this happening, I threw in some more 
  words to make up this sentence. Boring, I know -- but heck, why not repeat this sentence a few times? To improve the chances of this happening, I threw in some more 
  words to make up this sentence. Boring, I know -- but heck.
* Nested Ordered List
    1. List item 03 level 2
        * List item 03 level 3
        * List item 03 level 3
    2. List item 03 level 2
* List item 04

### Ordered List

<p class="line-before-list">Line before list, verifies indent match.</p>

1. List item
2. List item
3. List item
  1. Nested unordered list
      * Item 3.a.star
      * Item 3.b.star
          1. Item 3.b.star.1
          2. Item 3.b.star.2
      * Item 3.c.star
	2. List item level 2
4. List item

### Definition List

<dl>
	<dt>Term A</dt>
	<dd>Description A.1</dd>
  <dd>Description A.2</dd>
	<dt>Term B</dt>
	<dd>Description B</dd>
	<dt>Term C</dt>
	<dd>Description C.1</dd>
  <dd>Description C.2</dd>
  <dd>Description C.3</dd>
</dl>

## Blockquotes

### Singleton

> Duis autem vel eum iriure dolor in hendrerit in, vel illum dolore eu feugiat nulla facilisis.

### Multi Paragraph

> Metus diam sed tortor quam sit. Netus tempora sit. Habitasse velit nunc praesent ultrices porttitor dignissim sodales tincidunt orci morbi hymenaeos amet
> luctus porttitor nec nam fermentum.
> 
> Cursus et tempus. Egestas quod morbi. Proin maecenas praesent. Rhoncus dignissim viverra purus mauris sit. Metus eros nullam
> sed est ante facilisis adipiscing dolor. Libero nullam metus pulvinar eget nec. Etiam potenti ullamcorper.
>
> Elit suspendisse elit. Dolor congue eget. Ut eu vitae beatae lacus sed. Eros pellentesque odio. Erat euismod commodo vel nulla massa
> lacinia nunc massa arcu vitae urna semper aliquam mauris porta pellentesque tortor. Placerat velit nulla. Pede lacus feli.

## Images

Testing baseline...

{% assign class = 'full-bleed' %}
{% assign ratio = '16x9' %}
{% capture figcontent %}
  <img src="/img/aspect-ratio-16x9.png" alt="" width="800" height="480">
{% endcapture %}
{% capture figcaption %}
  16&times;9 'full-bleed' test image.
{% endcapture %}
{% include component/figure.html %}

This text should sit neatly on the baseline, typographical rhythm and all.

{% assign ratio = '4x3' %}
{% capture figcontent %}
  <img src="/img/aspect-ratio-4x3.png" alt="" width="800" height="600">
{% endcapture %}
{% capture figcaption %}
  4&times;3 test image, with a caption that is likely to span multiple lines, because it has a lot of nonsense text in it.
{% endcapture %}
{% include component/figure.html %}

This text should sit neatly on the baseline, typographical rhythm and all.

Now let's float a picture to the right and place some text to the left of it, unless of course there isn't really enough 
space, in which case we should switch to full bleed instead.

{% assign class = 'half-bleed-right' %}
{% assign ratio = '6x10' %}
{% capture figcontent %}
  <img src="/img/sgade-demo-screens.jpg" alt="" width="480" height="800">
{% endcapture %}
{% capture figcaption %}
  6&times;10 'half-bleed-right' test image.
{% endcapture %}
{% include component/figure.html %}

Metus diam sed tortor quam sit. Netus tempora sit. Habitasse velit nunc praesent ultrices porttitor dignissim sodales tincidunt orci morbi hymenaeos amet
luctus porttitor nec nam fermentum.

Cursus et tempus. Egestas quod morbi. Proin maecenas praesent. Rhoncus dignissim viverra purus mauris sit. Metus eros nullam
sed est ante facilisis adipiscing dolor. Libero nullam metus pulvinar eget nec. Etiam potenti ullamcorper.

Elit suspendisse elit. Dolor congue eget. Ut eu vitae beatae lacus sed. Eros pellentesque odio. Erat euismod commodo vel nulla massa
lacinia nunc massa arcu vitae urna semper aliquam mauris porta pellentesque tortor. Placerat velit nulla. Pede lacus feli.

## Video

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

## Type Specimen

<p>
  <span style="text-rendering: optimizeSpeed;">LYATAVAWAYA Ta Te To Tu Ty Va Ve Vo Vu Vy Ya Ye Yo Yu Yy</span><br>
  <span style="text-rendering: optimizeLegibility;">LYATAVAWAYA Ta Te To Tu Ty Va Ve Vo Vu Vy Ya Ye Yo Yu Yy</span><br>
  <span style="text-rendering: optimizeSpeed;">The flower in the file made the office staff sniffle.</span><br>
  <span style="text-rendering: optimizeLegibility;">The flower in the file made the office staff sniffle.</span><br>
</p>

<p>      
  <span style="font-size: 16px; text-rendering: optimizeSpeed;">LYATAVAWAYA Ta Te To Tu Ty Va Ve Vo Vu Vy Ya Ye Yo Yu Yy</span><br>
  <span style="font-size: 16px; text-rendering: optimizeLegibility;">LYATAVAWAYA Ta Te To Tu Ty Va Ve Vo Vu Vy Ya Ye Yo Yu Yy</span><br>
  <span style="font-size: 16px; text-rendering: optimizeSpeed;">The flower in the file made the office staff sniffle.</span><br>
  <span style="font-size: 16px; text-rendering: optimizeLegibility;">The flower in the file made the office staff sniffle.</span><br>
</p>

<p><em>     
  <span style="text-rendering: optimizeSpeed;">LYATAVAWAYA Ta Te To Tu Ty Va Ve Vo Vu Vy Ya Ye Yo Yu Yy</span><br>
  <span style="text-rendering: optimizeLegibility;">LYATAVAWAYA Ta Te To Tu Ty Va Ve Vo Vu Vy Ya Ye Yo Yu Yy</span><br>
  <span style="text-rendering: optimizeSpeed;">The flower in the file made the office staff sniffle.</span><br>
  <span style="text-rendering: optimizeLegibility;">The flower in the file made the office staff sniffle.</span><br>
</em></p>

### Lists

More...

<ol>
  <li>No block children.</li>
  <li><p>Single paragraph block child.</p></li>
  <li><p>Multi-paragraph block child.</p><p>Second of multi-paragraph block child.</p></li>
  <li>Nested list
    <ol>
      <li>No block children.</li>
      <li><p>Single paragraph block child.</p></li>
      <li><p>Multi-paragraph block child.</p><p>Second of multi-paragraph block child.</p></li>
      <li>Nested list
        <ol>
          <li>No block children.</li>
          <li><p>Single paragraph block child.</p></li>
          <li><p>Multi-paragraph block child.</p><p>Second of multi-paragraph block child.</p></li>
        </ol>
      </li>
    </ol>
  </li>
</ol>

{% comment %}<div class="wrap">
  <div class="indented">
    <div class="button"><span class="label">Foo</span></div>
  </div>
</div>{% endcomment %}

<p class="test-smcp">
  abcdefghijklmnopqrstuvwxyz<br/>
  ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
  <span class="smcp">abcdefghijklmnopqrstuvwxyz</span><br/>
  <span class="smcp-fake">abcdefghijklmnopqrstuvwxyz</span><br/>
  <span class="smcp-font-variant-synth">abcdefghijklmnopqrstuvwxyz</span><br/>
  <br/>
  aA<span class="smcp">a</span><span class="smcp-fake">a</span><span class="smcp-font-variant-synth">a</span><br/>
  bB<span class="smcp">b</span><span class="smcp-fake">b</span><span class="smcp-font-variant-synth">b</span><br/>
  cC<span class="smcp">c</span><span class="smcp-fake">c</span><span class="smcp-font-variant-synth">c</span><br/>
  dD<span class="smcp">d</span><span class="smcp-fake">d</span><span class="smcp-font-variant-synth">d</span><br/>
  eE<span class="smcp">e</span><span class="smcp-fake">e</span><span class="smcp-font-variant-synth">e</span><br/>
  fF<span class="smcp">f</span><span class="smcp-fake">f</span><span class="smcp-font-variant-synth">f</span><br/>
  gG<span class="smcp">g</span><span class="smcp-fake">g</span><span class="smcp-font-variant-synth">g</span><br/>
  hH<span class="smcp">h</span><span class="smcp-fake">h</span><span class="smcp-font-variant-synth">h</span><br/>
  iI<span class="smcp">i</span><span class="smcp-fake">i</span><span class="smcp-font-variant-synth">i</span><br/>
  jJ<span class="smcp">j</span><span class="smcp-fake">j</span><span class="smcp-font-variant-synth">j</span><br/>
  kK<span class="smcp">k</span><span class="smcp-fake">k</span><span class="smcp-font-variant-synth">k</span><br/>
  lL<span class="smcp">l</span><span class="smcp-fake">l</span><span class="smcp-font-variant-synth">l</span><br/>
  mM<span class="smcp">m</span><span class="smcp-fake">m</span><span class="smcp-font-variant-synth">m</span><br/>
  nN<span class="smcp">n</span><span class="smcp-fake">n</span><span class="smcp-font-variant-synth">n</span><br/>
  oO<span class="smcp">o</span><span class="smcp-fake">o</span><span class="smcp-font-variant-synth">o</span><br/>
  pP<span class="smcp">p</span><span class="smcp-fake">p</span><span class="smcp-font-variant-synth">p</span><br/>
  qQ<span class="smcp">q</span><span class="smcp-fake">q</span><span class="smcp-font-variant-synth">q</span><br/>
  rR<span class="smcp">r</span><span class="smcp-fake">r</span><span class="smcp-font-variant-synth">r</span><br/>
  sS<span class="smcp">s</span><span class="smcp-fake">s</span><span class="smcp-font-variant-synth">s</span><br/>
  tT<span class="smcp">t</span><span class="smcp-fake">t</span><span class="smcp-font-variant-synth">t</span><br/>
  uU<span class="smcp">u</span><span class="smcp-fake">u</span><span class="smcp-font-variant-synth">u</span><br/>
  vV<span class="smcp">v</span><span class="smcp-fake">v</span><span class="smcp-font-variant-synth">v</span><br/>
  wW<span class="smcp">w</span><span class="smcp-fake">w</span><span class="smcp-font-variant-synth">w</span><br/>
  xX<span class="smcp">x</span><span class="smcp-fake">x</span><span class="smcp-font-variant-synth">x</span><br/>
  yY<span class="smcp">y</span><span class="smcp-fake">y</span><span class="smcp-font-variant-synth">y</span><br/>
  zZ<span class="smcp">z</span><span class="smcp-fake">z</span><span class="smcp-font-variant-synth">z</span><br/>
</p>

<span class="">My name is Jaap Suter. A QUICK&rsquo;N BROWN FOX JUMPED OVER THE LAZY DOG.</span><br>
<span class="">My name is Jaap Suter. A quick&rsquo;n brown fox jumped over the lazy dog.</span><br>
<span class="smcp">My name is Jaap Suter. A quick&rsquo;n brown fox jumped over the lazy dog.</span><br>
<span class="smcp-fake">My name is Jaap Suter. A quick&rsquo;n brown fox jumped over the lazy dog.</span><br>
<span class="smcp-font-variant-synth">My name is Jaap Suter. A quick&rsquo;n brown fox jumped over the lazy dog.</span>

{% hamlize %}
  %ul#colorize
    %li.black       black
    %li.white       white
    %li.red-ddd     red-ddd
    %li.red-dd      red-dd
    %li.red-d       red-d
    %li.red         red
    %li.red-l       red-l
    %li.red-ll      red-ll
    %li.red-lll     red-lll
    %li.blue-ddd    blue-ddd
    %li.blue-dd     blue-dd
    %li.blue-d      blue-d
    %li.blue        blue
    %li.blue-l      blue-l
    %li.blue-ll     blue-ll
    %li.blue-lll    blue-lll
{% endhamlize %}
{% hamlize %}
  #rhythm
    %p
      This is a paragraph with some text in it. It goes on for a while but 
      doesn't really say anything useful. That's fine, I'm just testing
      whether it's possible to create an em-based typographic rhythm.
    %p(style="font-family: georgia;")
      This is a paragraph with some text in it. It goes on for a while but 
      doesn't really say anything useful. That's fine, I'm just testing
      whether it's possible to create an em-based typographic rhythm.
    %h1.stripe
      Short H1
    %p
      Voila, the second paragraph.
    %h1.stripe
      Here's a H1 header that is likely to wrap to the next line.
    %p
      Voila, the third paragraph. Isn't it great?
    %h2
      Enjoy a second level header that is multiple lines long
    %p.small
      And here's a small paragraph. Once again, containing no useful
      information whatsoever. It's merely to give the CSS something
      to experiment with.
    %p
      And here's a fourth paragraph. Once again, containing no useful
      information whatsoever. It's merely to give the CSS something
      to experiment with.
    .type-comparison
      %p.custom
        Five quackin' zephyrs jolt my wax bed. THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
        g 0123456789 
      %p.installed
        Five quackin' zephyrs jolt my wax bed. THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
        g 0123456789 
{% endhamlize %}