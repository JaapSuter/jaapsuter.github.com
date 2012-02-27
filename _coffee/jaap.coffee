iced = window['iced'] = window.iced

toggleBaseline = ->
  elem = document.querySelector('#baseline-checkbox')
  if elem
    elem.checked = !elem.checked
  
@entryPoint = ->
  return if top != window
  
  @util.onKeyUp 'B', toggleBaseline
  @util.onKeyUp 'T', @font.getMetrics
  
  # $(window).bind('popstate ', onPopState)
  # $('#type-metrics-link').bind 'click', type.getMetrics

  # bindInternalAnchorClicks()

@entryPoint()
