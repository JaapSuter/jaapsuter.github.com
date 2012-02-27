// Generated by IcedCoffeeScript 1.2.0r
  var iced, toggleBaseline,
    __slice = [].slice;

  window.iced = {
    Deferrals: (function() {

      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) return this.continuation(this.ret);
      };

      _Class.prototype.defer = function(defer_params) {
        var _this = this;
        ++this.count;
        return function() {
          var inner_params, _ref;
          inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (defer_params != null) {
            if ((_ref = defer_params.assign_fn) != null) {
              _ref.apply(null, inner_params);
            }
          }
          return _this._fulfill();
        };
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    }
  };

  iced = window['iced'] = window.iced;

  toggleBaseline = function() {
    var elem;
    elem = document.querySelector('#baseline-checkbox');
    if (elem) return elem.checked = !elem.checked;
  };

  this.entryPoint = function() {
    if (top !== window) return;
    this.util.onKeyUp('B', toggleBaseline);
    return this.util.onKeyUp('T', this.font.getMetrics);
  };

  this.entryPoint();