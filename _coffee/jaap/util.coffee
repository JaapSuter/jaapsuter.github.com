class Base

class Derived extends Base

@time = (fun) ->
  start = new Date()
  fun()
  (new Date() - start)

@isNumber = (obj) -> (obj is +obj) or Object::toString.call(obj) is '[object Number]'

@isUndefined = (obj) -> typeof obj is 'undefined'
  
@onKeyUp = (key, fun) ->
  window.addEventListener 'keydown', (e) =>
    fun() if @isNumber(key) and key == e.keyCode or key.toUpperCase() == String.fromCharCode(e.keyCode || e.charCode).toUpperCase()
    return

@createElement = (tag, innerHTML) ->
  elem = document.createElement(tag)
  elem.innerHTML = innerHTML
  [elem, elem.children]

@delay = (func, wait) ->
  args = @tail arguments, 2
  setTimeout (-> func.apply(func, args)), wait

@soon = (func) ->
  @delay.apply @, [func, 1].concat @tail arguments

@tail = (array, index) ->
  Array::slice.call(array, if @isUndefined(index) then 1 else index)
