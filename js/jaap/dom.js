// Generated by IcedCoffeeScript 1.2.0s

(function(global, exports) {
  "use strict";    
  
  exports.create = function(tag, innerHTML) {
    var elem;
    elem = document.createElement(tag);
    elem.innerHTML = innerHTML;
    return [elem, elem.children];
  };

}).call(undefined, window, (function() {
  var _base;
  if (window.jaap == null) window.jaap = {};
  if ((_base = window.jaap).dom == null) _base.dom = {};
  return window.jaap.dom;
})());
