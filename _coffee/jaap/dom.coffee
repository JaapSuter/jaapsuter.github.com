exports.create = (tag, innerHTML) ->
  elem = document.createElement(tag)
  elem.innerHTML = innerHTML
  [elem, elem.children]

exports.toggleClass = (e, n) ->
  if 0 <= e.className.indexOf n
    e.className = e.className.replace ///(?:^|\s)#{n}(?!\S)/// , ''
  else
    e.className += " #{n}"