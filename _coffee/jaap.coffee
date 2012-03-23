{ iced, jaap: { util, ajax, dom, keys, font } } = global

toggleBaseline = ->
  elem = document.querySelector('#baseline-checkbox')
  if elem
    elem.checked = !elem.checked

diagnose = ->
  body = document.body
  ppgd = parseFloat window.getComputedStyle(body).lineHeight

  get = (name) ->
    style =
      fontSize: '0'
      lineHeight: '0'

    elem = document.querySelector name
    style = window.getComputedStyle elem if elem
    
    ppem = parseFloat style.fontSize
    pplh = parseFloat style.lineHeight
    height = elem.getBoundingClientRect().height
    
    isHeightWholeNumber = if name in ['html', 'body'] then "" else " #{height} / #{ppgd} = #{height / ppgd}"

    "#{ppem}/#{pplh}#{isHeightWholeNumber}: #{name}<br/>"
  
  document.querySelector('#dimensions').innerHTML = """
    #{get('html')}
    #{get('body')}
    #{get('p')}
    #{get('h1')}
    #{get('h2')}
    #{get('h3')}
    #{get('.small')}
  """
  
entryPoint = ->
  return if top != window
  
  keys.on 'ctrl+b', toggleBaseline
  keys.on 'shift+t', font.getMetrics
  keys.on 'd', diagnose

  # $(window).bind('popstate ', onPopState)
  # $('#type-metrics-link').bind 'click', type.getMetrics
  # bindInternalAnchorClicks()

entryPoint()


