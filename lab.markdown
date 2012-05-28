---
layout: default
title_mark_up: |
  <span class="type-xxxl">Lab</span>
permalink: /lab/
---

First paragraph

{% hamlerate %}
  %p(style="font-family: tsn4n;")
    0102030405060708090 01234567890    
  %p(style="font-family: georgia;")
    0102030405060708090 01234567890
  %p(style="font-family: tsi4n; font-style: italic")
    0102030405060708090 01234567890    
  %p(style="font-family: georgia; font-style: italic")
    0102030405060708090 01234567890
  %p
    %span(style="font-family: tsn4n; font-size: 0.8em; text-transform: uppercase;")
      ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
  %p(style="font-family: tsn4n-smcp; font-size: 1em; text-transform: uppercase;")
    ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
  %p
    %span(style="font-family: tsn4n; font-size: 0.8em; text-transform: uppercase;")
      XAXCODXEOFOGOHOIOJOKOLOMONOOOPOQOROSOTOUOVOWOXOYOZO<br>
      0102030405060708090
  %p(style="font-family: tsn4n-smcp; font-size: 1em; text-transform: uppercase;")
    XAXCODXEOFOGOHOIOJOKOLOMONOOOPOQOROSOTOUOVOWOXOYOZO<br>
    0102030405060708090
{% endhamlerate %}

{% comment %}
  - (14...24).each do |ppem|
    - ((ppem * 1.3).floor()...(ppem * 1.7).ceil()).each do |ppel|
      .type-specimen(data-ppem="#{ppem}" data-ppel="#{ppel}" data-ratio="#{(100.0 * ppel / ppem).round() / 100.0}" style="font-size: #{ppem}px; line-height: #{ppel}px;")
        %p
          That's the point where ownership becomes important; because releasing
          resources means other people can use them. This is particularly obvious for file- and
          network-handles, because they have identity. Memory on the other hand is completely
          anonymous. That 200 kB your system holds on to doesn't stop me from allocating the 200 kB that
          I need, provided there is enough memory available (I'll come back to this caveat).
        %p
          This distinction between resources with or without identity underlies why most
          languages don't extend their GC mechanisms to cover file- and network-handles. It's why
          C# has the using statement and `IDisposable` pattern, something that makes C++ programmers
          invent smart-handle patterns in C# (and understandably so).
        %p
          Now coming back to the caveat: <em>"...provided there is enough memory"</em>, which ultimately is the real
          motivator for Gil's email. On most triple-A console titles, memory is at a premium. So that 200 kB
          that you're still holding on to *does* matter to me, because the memory manager doesn't have
          another 200 kB of memory lying around for me.

{% endcomment %}

<div class="center-fifty">
  {% rhythm %}
    {% video name:"choice-surprise-focus" %}
  {% endrhythm %}
</div>

Testing underlines and descenders; [ep:/ajaqug, (3241527890); JaQ-$_@.a](#)

Here's a clog &para;, isn't that neat?

[% excerpt-begin %]

Let's verify that various typographies are converted -- using [Smartypants](http://daringfireball.net/projects/smartypants/) -- by comparing
implicit 'single' and "double" quotes with their literal &lsquo;single&rsquo; and &ldquo;double&rdquo; entity counterpart. These
words are *emphasized* and **strong** as processed by [Markdown](http://daringfireball.net/projects/markdown/). Water is H2O and 
<span class="math"><i>e</i><sup><i>i</i>&pi;</sup>&nbsp;+&nbsp;1&nbsp;=&nbsp;0</span>, verifying sub- and superscript, as well
as the en&#8209;dash, the (non&#8209;breaking) hyphen, and the minus sign.

The following numbers should consist of old-style proportional figures: 1018, 1997, 2012, whereas these are tabular and lining: <span class="tnum-lnum">1018, 1997, 2012</span>.
And using HTML5 we mark up TLAS and HMLAAS -- such as WYSIWYG and IOTD -- using
the `abbr` element, which [itself](http://en.wikipedia.org/wiki/Use-mention_distinction "Use Mention Distinction") should be
wrapped in `code`, ad infinitum. Or stack overflow, take your pick.

Abbreviations in the previous paragraph (and elsewhere) should be set in smallcaps -- slightly larger
than the underlying petite caps, which match the body x-height -- and with slightly
increased tracking. Note furthermore that smallcap has its own figures, rather than relying
on the common oldstyle fallback. And lastly, that abbreviations ensure the
pluralizing &lsquo;s&rsquo; [matches the body x-height](http://blog.fawny.org/2010/01/11/goreschoice/ "1 != l, Gore's Choice") properly.

[% excerpt-end %]

{% pullquote %}
  Here's a pullquote that contains 'single' and "double" quotes.
{% endpullquote %}

<br>
The remainder is merely filler text for testing various layout and typographical matters. The contents is pulled randomly from 
other pages on this website, typically in paragraph-sized chunks.

{% lorem %}

<div class="sidebar"><aside>
  {% rhythm %}
    <p class="leading-4x3">{% hyphenate %}
      This is a multi&#x2011;paragraph sidebar block. There's not much of interest in it, but it'll be just
      enough text to fill a sidebar alongside two main paragraphs.{% endhyphenate %}
    </p>
  {% endrhythm %}
  {% rhythm %}
      <p class="leading-4x3">{% hyphenate %}
        Here's the second paragraph. It's about as boring as the first paragraph, but it manages
        to fill up this block to a useful height for testing.{% endhyphenate %}
      </p>
  {% endrhythm %}
</aside></div>

{% lorem %}
{% lorem %}
{% lorem %}

## Secondary Header

{% lorem %}
{% lorem %}
{% lorem %}

## Unordered List

<p class="line-before-list">Line before list, verifies indent match.</p>

* First list item
* Nested list, unordered
    * Subitem
    * Another subitem
* Longer item exists to verify how list elements handle indentation and vertical rhythm across one or more line breaks.
* Nested list, ordered
    1. First subitem
    2. Second subitem
* Last item

## Ordered List

<p class="line-before-list">Line before list, verifies indent match.</p>

1. First item
2. Second item
3. Nested ordered list
    1. First subitem
    2. Second subitem
4. Longer item exists to verify how list elements handle indentation and vertical rhythm across one or more line breaks.
5. Nested list, unordered
    * Subitem
    * Another subitem
4. Last item

## Short Blockquote

> Duis autem vel eum iriure dolor in hendrerit in, vel illum dolore eu feugiat nulla facilisis.

## Long Blockquote

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

<div class="center-fifty">
  {% rhythm %}
    {% img src:"aspect-ratio-16x9.png", alt:"Aspect Ratio 16x9" %}
  {% endrhythm %}
</div>

This text should sit neatly on the baseline, typographical rhythm and all.

<div class="center-fifty">
    {% rhythm %}
      {% img src:"aspect-ratio-4x3.png", alt:"Aspect Ratio 4x3" %}
    {% endrhythm %}
</div>

This text should sit neatly on the baseline, typographical rhythm and all.

Now let's float a picture to the right and place some text to the left of it, unless of course there isn't really enough 
space, in which case we should switch to full bleed instead.

<div class="center-fifty half-bleed-right ratio-6x10">
  {% rhythm %}
    {% img src:"sgade-demo-screens.jpg", alt:"Several screenshots from the Socrates demo I wrote for GBA." %}
  {% endrhythm %}
</div>

Metus diam sed tortor quam sit. Netus tempora sit. Habitasse velit nunc praesent ultrices porttitor dignissim sodales tincidunt orci morbi hymenaeos amet
luctus porttitor nec nam fermentum.

Cursus et tempus. Egestas quod morbi. Proin maecenas praesent. Rhoncus dignissim viverra purus mauris sit. Metus eros nullam
sed est ante facilisis adipiscing dolor. Libero nullam metus pulvinar eget nec. Etiam potenti ullamcorper.

Elit suspendisse elit. Dolor congue eget. Ut eu vitae beatae lacus sed. Eros pellentesque odio. Erat euismod commodo vel nulla massa
lacinia nunc massa arcu vitae urna semper aliquam mauris porta pellentesque tortor. Placerat velit nulla. Pede lacus feli.

## Video

<div class="center-fifty">
  {% rhythm %}
    {% video name:"choice-surprise-focus" %}
  {% endrhythm %}
</div>

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

{% hamlerate %}
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
{% endhamlerate %}
{% hamlerate %}
  #rhythm
    %p
      This is a paragraph with some text in it. It goes on for a while but 
      doesn't really say anything useful. That's fine, I'm just testing
      whether it's possible to create an em-based typographic rhythm.
    %p(style="font-family: georgia;")
      This is a paragraph with some text in it. It goes on for a while but 
      doesn't really say anything useful. That's fine, I'm just testing
      whether it's possible to create an em-based typographic rhythm.
    %p.h1-like.stripe
      Short H1 Like
    %p
      Voila, the second paragraph.
    %p.h1-like.stripe
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
{% endhamlerate %}
