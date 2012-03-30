# Based on:
#   keymaster.js (c) 2011 Thomas Fuchs
#   may be freely distributed under the MIT license.
# Branch point:
#   https://github.com/madrobby/keymaster/blob/aed2b809d83efcd2897367be1f9985c21f949e4d/keymaster.js
# Converted to Coffee using:
#   http://js2coffee.org/

dispatch = (event) ->
  key = event.keyCode
  key = 91 if key is 93 or key is 224
  if key of _mods
    _mods[key] = true
    for k of _MODIFIERS
      assignKey[k] = true  if _MODIFIERS[k] is key
    return
  return unless assignKey.filter.call(this, event)
  return unless key of _handlers
  i = 0
  while i < _handlers[key].length
    handler = _handlers[key][i]
    modifiersMatch = handler.mods.length > 0

    for own k of _mods
      if (not _mods[k] and +k in handler.mods) or (_mods[k] and not +k in handler.mods)
        modifiersMatch = false
    if (handler.mods.length is 0 and not _mods[16] and not _mods[18] and not _mods[17] and not _mods[91]) or modifiersMatch
      if handler.method(event, handler) is false
        if event.preventDefault
          event.preventDefault()
        else
          event.returnValue = false
        event.stopPropagation()  if event.stopPropagation
        event.cancelBubble = true  if event.cancelBubble
    i++

clearModifier = (event) ->
  key = event.keyCode
  key = 91 if key is 93 or key is 224
  if key of _mods
    _mods[key] = false
    for k of _MODIFIERS when _MODIFIERS[k] is key    
      assignKey[k] = false
  return

resetModifiers = ->
  _mods[k] = false for k of _mods
  assignKey[k] = false for k of _MODIFIERS
  return

assignKey = (key, method) ->
  
  key = key.replace(/\s/g, "")
  keys = key.split(",")
  keys[keys.length - 2] += ","  if (keys[keys.length - 1]) is ""
  i = 0
  while i < keys.length
    mods = []
    key = keys[i].split("+")
    if key.length > 1
      mods = key.slice(0, key.length - 1)
      mi = 0
      while mi < mods.length
        mods[mi] = _MODIFIERS[mods[mi]]
        mi++
      key = [ key[key.length - 1] ]
    key = key[0]
    key = _MAP[key] or key.toUpperCase().charCodeAt(0)
    _handlers[key] = []  unless key of _handlers
    _handlers[key].push
      shortcut: keys[i]
      method: method
      key: keys[i]
      mods: mods
    i++

assignKey.filter = (event) ->
  tagName = (event.target or event.srcElement).tagName
  not (tagName is "INPUT" or tagName is "SELECT" or tagName is "TEXTAREA")

addEvent = (object, event, method) ->
  if object.addEventListener
    object.addEventListener event, method, false
  else if object.attachEvent
    object.attachEvent "on" + event, ->
      method window.event

_handlers = {}
_mods = { 16: false, 18: false, 17: false, 91: false }
_MODIFIERS = { shift: 16, alt: 18, option: 18, ctrl: 17, command: 91 }
_MODIFIERS["f" + k] = 111 + k for k in [1...20]

_MAP =
  backspace: 8
  tab: 9
  clear: 12
  enter: 13
  return: 13
  esc: 27
  escape: 27
  space: 32
  left: 37
  up: 38
  right: 39
  down: 40
  del: 46
  delete: 46
  home: 36
  end: 35
  pageup: 33
  pagedown: 34
  ",": 188
  ".": 190
  "/": 191
  "`": 192
  "-": 189
  "=": 187
  ";": 186
  "'": 222
  "[": 219
  "]": 221
  "\\": 220

for own k of _MODIFIERS
  assignKey[k] = false

addEvent document, "keydown", dispatch
addEvent document, "keyup", clearModifier

addEvent window, "focus", resetModifiers

exports.on = assignKey