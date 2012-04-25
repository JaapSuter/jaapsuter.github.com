{ iced, jaap: { util, ajax, dom } } = global

fallbacks = ['georgia', 'arial', 'verdana']

getFontStyle = (family) ->
  if family in fallbacks then 'normal' else switch family[2]
    when 'i' then 'italic'
    when 'o' then 'oblique'
    else 'normal' 

getFontWeight = (family) ->
  if family in fallbacks then 400 else family[3] * 100

class Easel

  constructor: ({ @minFontSize, @maxFontSize }) ->    

    @lineHeightMul = 3
    @minBaseline = @minFontSize / 2

    @cnv0 = document.createElement 'canvas'
    @cnv1 = document.createElement 'canvas'
      
    @ctx0 = @cnv0.getContext '2d'
    @ctx1 = @cnv1.getContext '2d'
      
    @ctx0.textBaseline = @ctx1.textBaseline = "alphabetic"
    @ctx0.textAlign = @ctx1.textAlign = "left"
    @ctx0.fillStyle = @ctx1.fillStyle = "#000"

    [@div, [@img]] = dom.create 'div',
      '<img style="vertical-align: baseline" width="1" height="1" alt="" src="/img/1x1-black.png">bHxp'

    @div.style.whiteSpace = 'nowrap'
    @div.style.position = 'absolute'
    @div.style.lineHeight = @lineHeightMul
        
    document.body.insertBefore @div, document.body.firstChild  

    if true
      @cnv0.style.backgroundColor = '#fee'
      @cnv1.style.backgroundColor = '#eef'
  
      document.body.insertBefore @cnv1, document.body.children[0]
      document.body.insertBefore @cnv0, @cnv1

  drawGlyph: (glyph, upsideDown) ->
    @ctx0.clearRect 0, 0, @fontSize, @baseline
    @ctx1.clearRect 0, 0, @fontSize, @baseline

    if upsideDown
      @ctx0.save()
      @ctx0.translate 0, @baseline
      @ctx0.scale 1, -1
      @ctx0.translate 0, -@baseline

    @ctx0.fillText glyph, 0, @baseline

    if upsideDown
      @ctx0.restore()

  firstPowerOfTwoLessThan = (n) ->
    1 << Math.floor (Math.log(n - 1) / Math.log(2))

  horizontalSplat: () ->
      
    @ctx1.drawImage @cnv0, 0, 0
      
    x = firstPowerOfTwoLessThan @fontSize
    w = @fontSize - x

    while x
      @ctx1.drawImage @cnv0, x, 0, w, @baseline, 0, 0, w, @baseline
      
      [@ctx0, @ctx1] = [@ctx1, @ctx0]
      [@cnv0, @cnv1] = [@cnv1, @cnv0]
      x >>= 1
      w = x

    return

  getFirstVerticalPixel: () ->
    bpp = 4
    alpha_idx = 3
    img = @ctx0.getImageData(0, 0, 1, @baseline)
    data = img.data
    data[data.length - bpp + alpha_idx] = 0xff
  
    y = alpha_idx  
    while data[y] == 0
      y += bpp

    (y - alpha_idx) / bpp
  
  getGlyphMetric: (glyph, upsideDown = false) ->    
    @drawGlyph glyph, upsideDown
    @horizontalSplat()
    @getFirstVerticalPixel()
  
  getGlyphMetrics: () ->
    
    if @fontSize < @minFontSize || @baseline < @minBaseline
      @ascent = @cap = @ex = @descent = 0
    else
      @ascent  = @baseline - @getGlyphMetric 'b'
      @ex      = @baseline - @getGlyphMetric 'x'
      @cap     = @baseline - @getGlyphMetric 'H'
      @descent = @baseline - @getGlyphMetric 'p', upsideDown = true
      
  getSizedFamilyMetrics: (@fontSize, family, metrics, cont) ->
    @div.style.fontSize = "#{@fontSize}px"
    
    halfLeading = ((@lineHeightMul * @fontSize) - @fontSize) / 2

    @cnv0.width = @cnv1.width = @fontSize
    @baseline = @img.offsetTop + 1 - halfLeading
        
    @cnv0.height = @cnv1.height = @baseline
    @ctx0.font = @ctx1.font = "#{getFontWeight family} #{getFontStyle family} #{@fontSize}px #{family}"

    @getGlyphMetrics()
        
    metrics['baseline'][@fontSize] = @baseline
    metrics['ascent'][@fontSize] = @ascent
    metrics['cap'][@fontSize] = @cap
    metrics['ex'][@fontSize] = @ex
    metrics['descent'][@fontSize] = @descent

    util.soon cont
    
  getFamilyMetrics: (family, cont) ->
    @div.style.fontFamily = family
    @div.style.fontStyle = getFontStyle family
    @div.style.fontWeight = getFontWeight family

    metrics = 
      'baseline': []
      'ex': []
      'cap': []
      'ascent': []
      'descent': []
      
    for size in [0..@maxFontSize]
      await @getSizedFamilyMetrics size, family, metrics, defer()
    
    cont true, metrics
 
  getMetrics: (families, cont) =>

    metrics =
      'minFontSize': @minFontSize
      'maxFontSize': @maxFontSize
      'families': families

    for family in families
      await whenFontLoaded family, defer(ok, fam)
    
    if ok  
      for family in families
        await whenFontLoaded family, defer(ok, fam)
        if ok
          await @getFamilyMetrics fam, defer(ok, met)
          metrics[fam] = if ok then met else 'error obtaining metrics'

      @div.parentNode.removeChild @div
  
    cont ok, metrics
     
exports.whenFontLoaded = whenFontLoaded = (family, cont) ->

  [div, [fallback, br, loaded]] = dom.create 'div', 
      '<span>b H x p</span><br><span>b H x p</span>'

  div.style.cssText = """
    visibility: visible;
    position: absolute;
    top: 0;
    left: 0;
    font-family: serif;
    font-size: 137px;
    font-style: #{getFontStyle family};
    font-weight: #{getFontWeight family};
    line-height: 1;
    white-space: nowrap;"""
  
  loaded.style.fontFamily = "#{family}, serif"
  
  document.body.insertBefore div, document.body.firstChild  
  
  interval_ms = 40
  max_wait_ms = 3000
  attempts = max_wait_ms / interval_ms
  repeats_until_valid = 2 # see https://github.com/typekit/webfontloader/issues/35 and beyond

  complete = (ok, family) ->
    div.parentNode.removeChild div
    cont ok, family

  testFontLoaded = () ->
    if fallback.offsetWidth != loaded.offsetWidth
      if 0 == repeats_until_valid--
        complete true, family
      else
        util.soon testFontLoaded
    else
      if 0 == attempts--
        complete false, family
      else
        util.delay interval_ms, testFontLoaded

  testFontLoaded()

exports.getMetrics = getMetrics = (families) =>

  families = [
    "tan2n"
    "tan4c"
    "tan4n"
    "tan7n"
    "tao4n"
    "tmn4n"
    "tsi4n"
    "tsi4n-smcp"
    "tsi4n-tnum-lnum"
    "tsi7n"
    "tsn4n"
    "tsn4n-smcp"
    "tsn4n-tnum-lnum"
    "tsn7n"
    "pan2n"
    "pan4n"
    "pan4n-smcp"
    "pan7n"
    "pan7n-smcp"
    "psi4n"
    "psi7n"
    "psn4n"
    "psn7n"
  ]

  families = fallbacks.concat families
  families = (family for family in families when family.indexOf('inv') < 0)
  
  easel = new Easel minFontSize: 8, maxFontSize: 213
  await easel.getMetrics families, defer(ok, metrics)
  if ok
    data = JSON.stringify { 'payload': metrics, 'browser': 'unknown' }, null, 4
    await ajax.send '/ajax/json/type-metrics', defer(ok, resp), data
    alert "ok: #{ok}, resp: #{resp}"
  