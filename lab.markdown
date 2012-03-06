---
layout: default
title: Lab
permalink: /lab/
id: lab
---

Let's verify that various typographies are converted [Smartypants](http://daringfireball.net/projects/smartypants/) style, comparing
implicit 'single' and "double" quotes with literal &lsquo;single&rsquo; and &ldquo;double&rdquo; HTML entities. Here's <a href="#random-unique-number-5338">a
link</a> followed by <sub>sub-</sub> and super<sup>script</sup>, as well as some *emphasized* and **strong** words as processed
by [Markdown](http://daringfireball.net/projects/markdown/). These words are marked as `code` and <kbd>kdb</kbd>. Here's some old-style numbers: 1018, 1997, 2012. "&Eacute; &Ccedil;" is to ensure ascenders and 
descenders don't stomp beyond the leading, as well as use proper glyph fallbacks (i.e., these glyphs are not in our top
of the font stack; intentionally so). And lastly, TLA should be marked up with the ABBR tag, since HTML5 currently deprecates the acronym tag.

{% assign pullquote = 'Pull&shy;quotes are used to &#x263A; grab &#x270C; attention.' %}
{% include other/pullquote.html %}

The remainder is merely filler text for testing various layout and typographical matters. The contents is pulled randomly from 
other pages on this website, typically in paragraph-sized chunks.

<div class="sidebar"><aside>{% hyphenate %}
    <p>This is a multi&#x2011;paragraph sidebar block. There's not much of interest in it, but it'll be just
    enough text to fill a sidebar alongside two main paragraphs.</p>
    <p>Here's the second paragraph. It's about as boring as the first paragraph, but it manages
    to fill up this block to a useful height for testing.</p>
{% endhyphenate %}</aside></div>

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

<span style="font-family: tsi4n, serif; font-size: 16px; font-style: italic">0123456789 abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ</span><br>
<span style="font-family: tsn4n, serif; font-size: 16px; font-style: italic">0123456789 abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ</span><br>
<span style="font-family: tsn4n, serif; font-size: 16px">0123456789 abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ</span><br>
<span style="font-family: georgia, serif; font-size: 16px">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>
<span style="font-family: tsn4n, serif; font-size: 16px">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>
<span style="font-family: tsn4n-tnum-lnum, serif; font-size: 16px">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>
<span style="font-family: tsn4n-smcp, tsn4n, serif; font-size: 16px">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>
<span style="font-family: tsi4n, serif; font-size: 16px; font-style: italic;">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>
<span style="font-family: tsi4n-tnum-lnum, serif; font-size: 16px; font-style: italic;">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>
<span style="font-family: tsi4n-smcp, tsi4n, serif; font-size: 16px; font-style: italic;">0123456789 x0o1i2z3e4h5s6b7j8b9y 1998 2011 200 kB 1018</span><br>

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
{% include other/figure.html %}

This text should sit neatly on the baseline, typographical rhythm and all.

{% assign ratio = '4x3' %}
{% capture figcontent %}
  <img src="/img/aspect-ratio-4x3.png" alt="" width="800" height="600">
{% endcapture %}
{% capture figcaption %}
  4&times;3 test image, with a caption that is likely to span multiple lines, because it has a lot of nonsense text in it.
{% endcapture %}
{% include other/figure.html %}

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
{% include other/figure.html %}

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
{% capture figcontent %}{% include other/video.html %}{% endcapture %}
{% assign ratio = '4x3' %}
{% include other/figure.html %}

## Table

<div class="full-bleed">
  <table>
    <thead>
      <tr><th>thead th 1</th><th>thead th 2</th><th>thead th 3</th></tr>
    </thead>
    <tbody>
      <tr><td>tbody td 1.1</td><td>tbody td 2.1</td><td>tbody td 3.1</td></tr>
      <tr><td>tbody td 1.2</td><td>tbody td 2.2</td><td>tbody td 3.2</td></tr>
      <tr><td>tbody td 1.3</td><td>tbody td 2.3 has more content to encourage a cell with multiple lines.</td><td>tbody td 3.3</td></tr>
      <tr><td>tbody td 1.4</td><td>tbody td 2.4</td><td>tbody td 3.4</td></tr>
      <tr><td>tbody td 1.5</td><td>tbody td 2.5</td><td>tbody td 3.5</td></tr>
      <tr><td>tbody td 1.6</td><td>tbody td 2.6</td><td>tbody td 3.6</td></tr>
    </tbody>
  </table>
</div>

<pre id="type-metric-values"></pre>

## Type Specimen

<h1>
  <span style="text-rendering: optimizeSpeed;">LYATAVAWAYA Ta Te To Tu Ty Va Ve Vo Vu Vy Ya Ye Yo Yu Yy</span><br>
  <span style="text-rendering: optimizeLegibility;">LYATAVAWAYA Ta Te To Tu Ty Va Ve Vo Vu Vy Ya Ye Yo Yu Yy</span><br>
  <span style="text-rendering: optimizeSpeed;">The flower in the file made the office staff sniffle.</span><br>
  <span style="text-rendering: optimizeLegibility;">The flower in the file made the office staff sniffle.</span><br>
</h1>

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

### Dimensions Todo

<pre>
  Baseline
  0123456789 px em t dpr &times /;
  ref: fl: vw: vh: bw: bh:
</pre>

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

### Type Subset
Testing
<button type="button" id="type-subset-crawl">Crawl</button>
<textarea id="type-subset-progress" readonly></textarea>
Testing

### Type Metrics
<button type="button" id="type-metrics-calc">Calculate</button>
<textarea id="type-metrics-values" readonly></textarea>

