exports.create = (tag, innerHTML) ->
  elem = document.createElement(tag)
  elem.innerHTML = innerHTML
  [elem, elem.children]
