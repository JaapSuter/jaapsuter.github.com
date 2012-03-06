exports.time = time = (fun) ->
  start = new Date()
  fun()
  (new Date() - start)

exports.isNumber = isNumber = (obj) -> (obj is +obj) or Object::toString.call(obj) is '[object Number]'

exports.isUndefined = isUndefined = (obj) -> typeof obj is 'undefined'
  
exports.onKeyUp = onKeyUp = (key, fun) ->
  window.addEventListener 'keydown', (e) =>
    fun() if @isNumber(key) and key == e.keyCode or key.toUpperCase() == String.fromCharCode(e.keyCode || e.charCode).toUpperCase()
    return

exports.createElement = createElement = (tag, innerHTML) ->
  elem = document.createElement(tag)
  elem.innerHTML = innerHTML
  [elem, elem.children]

exports.delay = delay = (func, wait) ->
  args = @tail arguments, 2
  setTimeout (-> func.apply(func, args)), wait

exports.soon = soon = (func) ->
  @delay.apply @, [func, 1].concat @tail arguments

exports.tail = tail = (array, index) ->
  Array::slice.call(array, if @isUndefined(index) then 1 else index)
