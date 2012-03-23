exports.time = time = (fun) ->
  start = new Date()
  fun()
  (new Date() - start)

exports.isNumber = isNumber = (obj) -> (obj is +obj) or Object::toString.call(obj) is '[object Number]'

exports.isUndefined = isUndefined = (obj) -> typeof obj is 'undefined'
  
exports.delay = delay = (func, wait) ->
  args = @tail arguments, 2
  setTimeout (-> func.apply(func, args)), wait

exports.soon = soon = (func) ->
  @delay.apply @, [func, 1].concat @tail arguments

exports.tail = tail = (array, index) ->
  Array::slice.call(array, if @isUndefined(index) then 1 else index)
