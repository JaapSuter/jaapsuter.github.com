colors = require 'colors'
util = require 'util'

multident = (code, tab = '  ') ->
  code = code.replace /\n/g, '$&' + tab
  code.replace /\s+$/, ''

monkeyAround = (obj, method, cuts) ->
  existing = obj[method]

  if not existing?
    throw Error "unable to monkeyAround method '#{method}' because it doesn't show up in #{obj}"  
  
  obj[method] = (args...) ->
    cuts.before(args...) if cuts.before
    ret = if cuts.instead then cuts.instead.call this, args... else existing.call this, args...
    cuts.after(ret) if cuts.after
    ret

CoffeeScript = require 'iced-coffee-script'
{ parser } = require 'iced-coffee-script/lib/coffee-script/parser'
nodes = require 'iced-coffee-script/lib/coffee-script/nodes'
macrame = require 'iced-coffee-script/lib/coffee-script/macrame'

monkeyAround nodes.Block.prototype, 'compileRoot',
  # before: (args...) -> console.log "before Block.compileRoot.parse(#{args?.toString()[0...10]})"
  # after: (ret) -> console.log "after compileRoot.parse(...) = #{(ret?.toString()[0...10])}"

CoffeeScript.on 'compile', (task) ->
  if 0 <= task.file.indexOf 'sandbox.coffee'
    monkeyAround parser, 'parse',
      before: (args) ->
        console.log args
      after: (ret) ->
        macrame.findMacros ret
        
CoffeeScript.on 'success', (task) ->  
  # console.log key for own key of task
