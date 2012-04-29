{ iced, jaap: { util, ajax, dom, keys, font } } = global

toggleBaseline = ->
  dom.toggleClass document.body, 'baseline'

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
    viewport: #{window.innerWidth}\u00D7#{window.innerHeight}, #{window.orientation}<br/>
    body:     #{body.offsetWidth}\u00D7#{body.offsetWidth}
  """
  
entryPoint = ->
  return if top != window
  
  keys.on 'b', toggleBaseline
  keys.on 'shift+t', font.getMetrics
  keys.on 'shift+s', font.getSubsets  
  keys.on 'shift+d', diagnose
  keys.on 'shift+c', dom.verifyCss

  repeated_diagnose = () ->
    every_num_ms = 300  
    diagnose()
    util.delay every_num_ms, repeated_diagnose

  # repeated_diagnose()
  # $(window).bind('popstate ', onPopState)
  # $('#type-metrics-link').bind 'click', type.getMetrics
  # bindInternalAnchorClicks()

entryPoint()
