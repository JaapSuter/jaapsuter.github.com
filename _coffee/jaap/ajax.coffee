factories = [
  -> new XMLHttpRequest
  -> new ActiveXObject "Msxml2.XMLHTTP"
  -> new ActiveXObject "Msxml3.XMLHTTP"
  -> new ActiveXObject "Microsoft.XMLHTTP"
]

create = ->
  xhr = false
  for f in factories
    try
      xhr = f()
    catch e
      continue
    return xhr

exports.send = send = (url, cb, postData) ->
  DONE = 4
  OK = 200
  NOT_MODIFIED = 304
        
  xhr = create()
  
  if xhr
    method = if postData then "PUT" else "GET"
    xhr.open method, url, true
    xhr.setRequestHeader 'Content-type','application/x-www-form-urlencoded' if postData
    xhr.onreadystatechange = () ->
      if DONE is xhr.readyState
        if OK is xhr.status or NOT_MODIFIED is xhr.status
          cb true, req
        else
          cb false
    
    if DONE != xhr.readyState
      xhr.send postData
  else
    cb false

###
#------------------------------------------------------------------------------
ajaxPut = (command, payload, cont) ->
  if not JSON?.stringify
  command = 'error'
  payload = 'no support for JSON.stringify'

  $.ajax
  url: '/ajax/json/' + command,
  type: 'json',
  method: 'put',
  data: JSON.stringify { payload, browser: 'unknown' }, null, 4
  success: (resp) -> cont(true, resp),
  error: (resp) -> cont(false, resp)

#------------------------------------------------------------------------------
ajaxGet = (command, cont) ->
  $.ajax
  url: '/ajax/json/' + command,
  type: 'json',
  method: 'get',
  success: (resp) -> cont(true, resp?.payload || null),
  error: (resp) -> cont(false, resp?.payload || null),

#------------------------------------------------------------------------------
getElemAttrAndContentTrimmed = (html, tag) ->
  [ignored, attrs, content] = (///
  <\s*#{tag}([^>]*)>  # Start tag and optional attributes
  \s*([\S\s]*?)\s*    # Inner HTML
  </\s*#{tag}[^>]*>   # Closing tag
  ///gi.exec(html) || [null, null, null])

  { attrs, content }

#------------------------------------------------------------------------------
bindInternalAnchorClicks = ->
  if window.history.pushState
  $('a[href^="/"]').bind 'click', onInternalAnchorClick

#------------------------------------------------------------------------------
odysseus = (href) ->
  window.location = href

#------------------------------------------------------------------------------
onInternalAnchorClick = (e) ->

  href = e.currentTarget?.href
  if href and window.history.pushState
  e.stop()
   
  $.ajax
    url: href,
    type: 'html',
    method: 'get',
    error: (resp) ->
    odysseus href

    success: (html) ->

    { attrs: empty, content: title } = getElemAttrAndContentTrimmed html, 'title'
    title = title or e.currentTarget?.text or document?.location?.host or 'Untitled'

    { attrs: empty, content } = getElemAttrAndContentTrimmed html, 'body'
    content ?= ''

    content = content.replace ///
      <\s*script[^>]*>[\S\s]*?</\s*script[^>]*>
    ///gi, ''

    current = 
      href: window.location?.href
      content: document.body.innerHTML
      scroll: 
      x: window.pageXOffset or document.documentElement.scrollLeft or document.body.scrollLeft 
      y: window.pageYOffset or document.documentElement.scrollTop	or document.body.scrollTop
      title: document.title
          
    next =
      href: href
      content: content
      scroll:
      x: 0
      y: 0
      title: title

    window.history.replaceState current, current.title, current.href
    window.history.pushState next, next.title, next.href
    swapBodyContent next

#------------------------------------------------------------------------------
swapBodyContent = ({ href, content, scroll, title }) ->
  if href and content and scroll and title
  
  document.title = title
  document.body.innerHTML = content
    
  window.scrollTo scroll.x, scroll.y
    
  bindInternalAnchorClicks()

#------------------------------------------------------------------------------
onPopState = (e) ->
  swapBodyContent e.originalEvent?.state || {}
###