exports.create = (tag, innerHTML) ->
  elem = document.createElement(tag)
  elem.innerHTML = innerHTML
  [elem, elem.children]

exports.toggleClass = (e, n) ->
  if 0 <= e.className.indexOf n
    e.className = e.className.replace ///(?:^|\s)#{n}(?!\S)/// , ''
  else
    e.className += " #{n}"

exports.verifyCss = ->
  
  matchesSelector = do (e = document.documentElement) ->
    e.matchesSelector or e.webkitMatchesSelector or e.mozMatchesSelector or e.oMatchesSelector or e.msMatchesSelector

  return if not matchesSelector

  usedElems  = {}

  css = gatherCss document.styleSheets...  

  for elem in document.querySelectorAll '*'
    tag = elem.nodeName.toLowerCase()
    for own prop, sels of css.properties
      matches = {}
      for own sel, val of sels when matchesSelector.call elem, sel
        specificity = css.selectors[sel]
        decl = "#{sel} { #{prop}: #{val}; }"
        if matches[specificity]
          console.log """
              Error, element #{tag} declares property #{prop} more than once at same specificity:
                Before: #{matches[specificity]}
                Now:    #{decl}
            """
        else
          matches[specificity] = decl
        
    elemName = elem.nodeName.toLowerCase()
    usedElems[elemName] ?= {}
    usedElems[elemName][match] = '' for match in matches    
    if matches.length > 2
      console.log "#{elem}:\n   #{matches.join '\n'}"

  return

gatherCss = (sheets...) ->

  UNKNOWN_RULE                   = 0
  STYLE_RULE                     = 1
  CHARSET_RULE                   = 2
  IMPORT_RULE                    = 3
  MEDIA_RULE                     = 4
  FONT_FACE_RULE                 = 5
  PAGE_RULE                      = 6

  css =
    properties: {}
    selectors: {}
    values: {}

  for sheet in sheets
    for rule in sheet.cssRules when rule.type is STYLE_RULE
      selectors = rule.selectorText.split ','

      for selector in selectors
        css.selectors[selector] = specificity selector
      
      style = rule.style
      for property in style
        value = style.getPropertyValue property
        
        css.properties[property] ?= {}        
        for selector in selectors
          if css.properties[property][selector]
            puts "Oddity: #{css.properties[property][selector]}"
          css.properties[property][selector] = value

  css

specificity = (s) ->
  
  # This code and the test below ported over from:
  # http://www.bennadel.com/blog/2365-Calculating-CSS-Selector-Specificity-Using-ColdFusion.htm
  
  s = s.replace '*', ''

  s = s.replace /"[^"]*"/g, ''
  s = s.replace /'[^"]*'/g, ''                
  s = s.replace /\[[^\]]*\]/g, '[]'
  s = s.replace /[>+~]/g, ' '

  while 0 <= s.indexOf '('
    s = s.replace /\([^\)]*?\)/, ''

  s = s.replace /:(first-child|last-child|link|visited|hover|active|focus|lang)/g, '.pseudo-class'
  s = s.replace /::?[\w-]+/g, ' pseudo-elem'

  ids     = s.match(/#[\w-]+/g)?.length or 0
  classes = s.match(/\.[\w-]+|\[\]/g)?.length or 0
  elems   = s.match(/(^|\s)[\w_-]+/g)?.length or 0

  sufficient_base = 1000

  ids * sufficient_base * sufficient_base + classes * sufficient_base + elems

testSpecificity = ->
  
  test = (s, e) ->
    debugger if e != specificity s
   
  test "*", 0  
  test "li", 1
  test "li:first-line", 2    
  test "ul li", 2
  test "ul ol+li", 3
  test "h1 + *[rel=up]", 1001
  test "ul ol li.red", 1003
  test "li.red.level", 2001
  test "body::before", 2
  test "div p", 2
  test ".sith", 1000
  test "div p.sith", 1002
  test "##sith", 1000000
  test "body ##darkside .sith p", 1001002
  test "p:has( a[href] )", 2
  test "body##top:lang(fr-ca) div.alert", 1002002

window.tcs = testSpecificity 