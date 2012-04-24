// Generated by IcedCoffeeScript 1.2.0s

(function(global, exports) {
  "use strict";    
    var iced,
    __slice = [].slice;

  iced = {
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

  global.iced = iced;

  global.jaap = {
    util: {},
    dom: {},
    font: {},
    keys: {},
    ajax: {}
  };

}).call(undefined, window, (function() {
  if (window.modules == null) window.modules = {};
  return window.modules;
})());
// Generated by IcedCoffeeScript 1.2.0s

(function(global, exports) {
  "use strict";    
    var create, factories, iced, send, _ref;

  iced = (_ref = global.iced) != null ? _ref : global.iced = {};

  factories = [
    function() {
      return new XMLHttpRequest;
    }, function() {
      return new ActiveXObject("Msxml2.XMLHTTP");
    }, function() {
      return new ActiveXObject("Msxml3.XMLHTTP");
    }, function() {
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
  ];

  create = function() {
    var f, xhr, _i, _len;
    xhr = false;
    for (_i = 0, _len = factories.length; _i < _len; _i++) {
      f = factories[_i];
      try {
        xhr = f();
      } catch (e) {
        continue;
      }
      return xhr;
    }
  };

  exports.send = send = function(url, cb, postData) {
    var DONE, NOT_MODIFIED, OK, method, xhr;
    DONE = 4;
    OK = 200;
    NOT_MODIFIED = 304;
    xhr = create();
    if (xhr) {
      method = postData ? "PUT" : "GET";
      xhr.open(method, url, true);
      if (postData) {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      }
      xhr.onreadystatechange = function() {
        if (DONE === xhr.readyState) {
          if (OK === xhr.status || NOT_MODIFIED === xhr.status) {
            return cb(true, xhr.responseText);
          } else {
            return cb(false);
          }
        }
      };
      if (DONE !== xhr.readyState) return xhr.send(postData);
    } else {
      return cb(false);
    }
  };

  /*
  #------------------------------------------------------------------------------
  ajaxPut = (command, payload, cont) ->
    if not JSON?.stringify
    command = 'error'
    payload = 'no support for JSON.stringify'
  
    $.ajax
    url: '/ajax/json/' + command,
    type: 'json',
    method: 'put',
    data: JSON.stringify { payload, browser: 'unknown' }, null, 4
    success: (resp) -> cont(true, resp),
    error: (resp) -> cont(false, resp)
  
  #------------------------------------------------------------------------------
  ajaxGet = (command, cont) ->
    $.ajax
    url: '/ajax/json/' + command,
    type: 'json',
    method: 'get',
    success: (resp) -> cont(true, resp?.payload || null),
    error: (resp) -> cont(false, resp?.payload || null),
  
  #------------------------------------------------------------------------------
  getElemAttrAndContentTrimmed = (html, tag) ->
    [ignored, attrs, content] = (///
    <\s*#{tag}([^>]*)>  # Start tag and optional attributes
    \s*([\S\s]*?)\s*    # Inner HTML
    </\s*#{tag}[^>]*>   # Closing tag
    ///gi.exec(html) || [null, null, null])
  
    { attrs, content }
  
  #------------------------------------------------------------------------------
  bindInternalAnchorClicks = ->
    if window.history.pushState
    $('a[href^="/"]').bind 'click', onInternalAnchorClick
  
  #------------------------------------------------------------------------------
  odysseus = (href) ->
    window.location = href
  
  #------------------------------------------------------------------------------
  onInternalAnchorClick = (e) ->
  
    href = e.currentTarget?.href
    if href and window.history.pushState
    e.stop()
     
    $.ajax
      url: href,
      type: 'html',
      method: 'get',
      error: (resp) ->
      odysseus href
  
      success: (html) ->
  
      { attrs: empty, content: title } = getElemAttrAndContentTrimmed html, 'title'
      title = title or e.currentTarget?.text or document?.location?.host or 'Untitled'
  
      { attrs: empty, content } = getElemAttrAndContentTrimmed html, 'body'
      content ?= ''
  
      content = content.replace ///
        <\s*script[^>]*>[\S\s]*?</\s*script[^>]*>
      ///gi, ''
  
      current = 
        href: window.location?.href
        content: document.body.innerHTML
        scroll: 
        x: window.pageXOffset or document.documentElement.scrollLeft or document.body.scrollLeft 
        y: window.pageYOffset or document.documentElement.scrollTop	or document.body.scrollTop
        title: document.title
            
      next =
        href: href
        content: content
        scroll:
        x: 0
        y: 0
        title: title
  
      window.history.replaceState current, current.title, current.href
      window.history.pushState next, next.title, next.href
      swapBodyContent next
  
  #------------------------------------------------------------------------------
  swapBodyContent = ({ href, content, scroll, title }) ->
    if href and content and scroll and title
    
    document.title = title
    document.body.innerHTML = content
      
    window.scrollTo scroll.x, scroll.y
      
    bindInternalAnchorClicks()
  
  #------------------------------------------------------------------------------
  onPopState = (e) ->
    swapBodyContent e.originalEvent?.state || {}
  */


}).call(undefined, window, (function() {
  var _base;
  if (window.jaap == null) window.jaap = {};
  if ((_base = window.jaap).ajax == null) _base.ajax = {};
  return window.jaap.ajax;
})());
// Generated by IcedCoffeeScript 1.2.0s

(function(global, exports) {
  "use strict";    
    var Easel, ajax, dom, fallbacks, getFontStyle, getFontWeight, getMetrics, iced, util, whenFontLoaded, __iced_k_noop, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    _this = this;

  __iced_k_noop = function() {};

  iced = global.iced, (_ref = global.jaap, util = _ref.util, ajax = _ref.ajax, dom = _ref.dom);

  fallbacks = ['georgia', 'arial', 'verdana'];

  getFontStyle = function(family) {
    if (__indexOf.call(fallbacks, family) >= 0) {
      return 'normal';
    } else {
      switch (family[2]) {
        case 'i':
          return 'italic';
        case 'o':
          return 'oblique';
        default:
          return 'normal';
      }
    }
  };

  getFontWeight = function(family) {
    if (__indexOf.call(fallbacks, family) >= 0) {
      return 400;
    } else {
      return family[3] * 100;
    }
  };

  Easel = (function() {
    var firstPowerOfTwoLessThan;

    Easel.__name = 'Easel';

    function Easel(_arg) {
      var _ref2, _ref3;
      this.minFontSize = _arg.minFontSize, this.maxFontSize = _arg.maxFontSize;
      this.getMetrics = __bind(this.getMetrics, this);

      this.lineHeightMul = 3;
      this.minBaseline = this.minFontSize / 2;
      this.cnv0 = document.createElement('canvas');
      this.cnv1 = document.createElement('canvas');
      this.ctx0 = this.cnv0.getContext('2d');
      this.ctx1 = this.cnv1.getContext('2d');
      this.ctx0.textBaseline = this.ctx1.textBaseline = "alphabetic";
      this.ctx0.textAlign = this.ctx1.textAlign = "left";
      this.ctx0.fillStyle = this.ctx1.fillStyle = "#000";
      _ref2 = dom.create('div', '<img style="vertical-align: baseline" width="1" height="1" alt="" src="/img/1x1-black.png">bHxp'), this.div = _ref2[0], (_ref3 = _ref2[1], this.img = _ref3[0]);
      this.div.style.whiteSpace = 'nowrap';
      this.div.style.position = 'absolute';
      this.div.style.lineHeight = this.lineHeightMul;
      document.body.insertBefore(this.div, document.body.firstChild);
      if (true) {
        this.cnv0.style.backgroundColor = '#fee';
        this.cnv1.style.backgroundColor = '#eef';
        document.body.insertBefore(this.cnv1, document.body.children[0]);
        document.body.insertBefore(this.cnv0, this.cnv1);
      }
    }

    Easel.prototype.drawGlyph = function(glyph, upsideDown) {
      this.ctx0.clearRect(0, 0, this.fontSize, this.baseline);
      this.ctx1.clearRect(0, 0, this.fontSize, this.baseline);
      if (upsideDown) {
        this.ctx0.save();
        this.ctx0.translate(0, this.baseline);
        this.ctx0.scale(1, -1);
        this.ctx0.translate(0, -this.baseline);
      }
      this.ctx0.fillText(glyph, 0, this.baseline);
      if (upsideDown) return this.ctx0.restore();
    };

    firstPowerOfTwoLessThan = function(n) {
      return 1 << Math.floor(Math.log(n - 1) / Math.log(2));
    };

    Easel.prototype.horizontalSplat = function() {
      var w, x, _ref2, _ref3;
      this.ctx1.drawImage(this.cnv0, 0, 0);
      x = firstPowerOfTwoLessThan(this.fontSize);
      w = this.fontSize - x;
      while (x) {
        this.ctx1.drawImage(this.cnv0, x, 0, w, this.baseline, 0, 0, w, this.baseline);
        _ref2 = [this.ctx1, this.ctx0], this.ctx0 = _ref2[0], this.ctx1 = _ref2[1];
        _ref3 = [this.cnv1, this.cnv0], this.cnv0 = _ref3[0], this.cnv1 = _ref3[1];
        x >>= 1;
        w = x;
      }
    };

    Easel.prototype.getFirstVerticalPixel = function() {
      var alpha_idx, bpp, data, img, y;
      bpp = 4;
      alpha_idx = 3;
      img = this.ctx0.getImageData(0, 0, 1, this.baseline);
      data = img.data;
      data[data.length - bpp + alpha_idx] = 0xff;
      y = alpha_idx;
      while (data[y] === 0) {
        y += bpp;
      }
      return (y - alpha_idx) / bpp;
    };

    Easel.prototype.getGlyphMetric = function(glyph, upsideDown) {
      if (upsideDown == null) upsideDown = false;
      this.drawGlyph(glyph, upsideDown);
      this.horizontalSplat();
      return this.getFirstVerticalPixel();
    };

    Easel.prototype.getGlyphMetrics = function() {
      var upsideDown;
      if (this.fontSize < this.minFontSize || this.baseline < this.minBaseline) {
        return this.ascent = this.cap = this.ex = this.descent = 0;
      } else {
        this.ascent = this.baseline - this.getGlyphMetric('b');
        this.ex = this.baseline - this.getGlyphMetric('x');
        this.cap = this.baseline - this.getGlyphMetric('H');
        return this.descent = this.baseline - this.getGlyphMetric('p', upsideDown = true);
      }
    };

    Easel.prototype.getSizedFamilyMetrics = function(fontSize, family, metrics, cont) {
      var halfLeading;
      this.fontSize = fontSize;
      this.div.style.fontSize = "" + this.fontSize + "px";
      halfLeading = ((this.lineHeightMul * this.fontSize) - this.fontSize) / 2;
      this.cnv0.width = this.cnv1.width = this.fontSize;
      this.baseline = this.img.offsetTop + 1 - halfLeading;
      this.cnv0.height = this.cnv1.height = this.baseline;
      this.ctx0.font = this.ctx1.font = "" + (getFontWeight(family)) + " " + (getFontStyle(family)) + " " + this.fontSize + "px " + family;
      this.getGlyphMetrics();
      metrics['baseline'][this.fontSize] = this.baseline;
      metrics['ascent'][this.fontSize] = this.ascent;
      metrics['cap'][this.fontSize] = this.cap;
      metrics['ex'][this.fontSize] = this.ex;
      metrics['descent'][this.fontSize] = this.descent;
      return util.soon(cont);
    };

    Easel.prototype.getFamilyMetrics = function(family, cont) {
      var metrics, size, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      this.div.style.fontFamily = family;
      this.div.style.fontStyle = getFontStyle(family);
      this.div.style.fontWeight = getFontWeight(family);
      metrics = {
        'baseline': [],
        'ex': [],
        'cap': [],
        'ascent': [],
        'descent': []
      };
      (function(__iced_k) {
        var _i, _results, _while;
        size = 0;
        _results = [];
        _while = function(__iced_k) {
          var _break, _continue, _next;
          _break = function() {
            return __iced_k(_results);
          };
          _continue = function() {
            ++size;
            return _while(__iced_k);
          };
          _next = function(__iced_next_arg) {
            _results.push(__iced_next_arg);
            return _continue();
          };
          if (!(size <= _this.maxFontSize)) {
            return _break();
          } else {
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee",
                funcname: "Easel.getFamilyMetrics"
              });
              _this.getSizedFamilyMetrics(size, family, metrics, __iced_deferrals.defer({
                lineno: 143
              }));
              __iced_deferrals._fulfill();
            })(_next);
          }
        };
        _while(__iced_k);
      })(function() {
        return cont(true, metrics);
      });
    };

    Easel.prototype.getMetrics = function(families, cont) {
      var fam, family, met, metrics, ok, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      metrics = {
        'minFontSize': this.minFontSize,
        'maxFontSize': this.maxFontSize,
        'families': families
      };
      (function(__iced_k) {
        var _i, _len, _ref2, _results, _while;
        _ref2 = families;
        _len = _ref2.length;
        _i = 0;
        _results = [];
        _while = function(__iced_k) {
          var _break, _continue, _next;
          _break = function() {
            return __iced_k(_results);
          };
          _continue = function() {
            ++_i;
            return _while(__iced_k);
          };
          _next = function(__iced_next_arg) {
            _results.push(__iced_next_arg);
            return _continue();
          };
          if (!(_i < _len)) {
            return _break();
          } else {
            family = _ref2[_i];
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee",
                funcname: "Easel.getMetrics"
              });
              whenFontLoaded(family, __iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    ok = arguments[0];
                    return fam = arguments[1];
                  };
                })(),
                lineno: 155
              }));
              __iced_deferrals._fulfill();
            })(_next);
          }
        };
        _while(__iced_k);
      })(function() {
        (function(__iced_k) {
          if (ok) {
            (function(__iced_k) {
              var _i, _len, _ref2, _results, _while;
              _ref2 = families;
              _len = _ref2.length;
              _i = 0;
              _results = [];
              _while = function(__iced_k) {
                var _break, _continue, _next;
                _break = function() {
                  return __iced_k(_results);
                };
                _continue = function() {
                  ++_i;
                  return _while(__iced_k);
                };
                _next = function(__iced_next_arg) {
                  _results.push(__iced_next_arg);
                  return _continue();
                };
                if (!(_i < _len)) {
                  return _break();
                } else {
                  family = _ref2[_i];
                  (function(__iced_k) {
                    __iced_deferrals = new iced.Deferrals(__iced_k, {
                      parent: ___iced_passed_deferral,
                      filename: "B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee",
                      funcname: "Easel.getMetrics"
                    });
                    whenFontLoaded(family, __iced_deferrals.defer({
                      assign_fn: (function() {
                        return function() {
                          ok = arguments[0];
                          return fam = arguments[1];
                        };
                      })(),
                      lineno: 159
                    }));
                    __iced_deferrals._fulfill();
                  })(function() {
                    (function(__iced_k) {
                      if (ok) {
                        (function(__iced_k) {
                          __iced_deferrals = new iced.Deferrals(__iced_k, {
                            parent: ___iced_passed_deferral,
                            filename: "B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee",
                            funcname: "Easel.getMetrics"
                          });
                          _this.getFamilyMetrics(fam, __iced_deferrals.defer({
                            assign_fn: (function() {
                              return function() {
                                ok = arguments[0];
                                return met = arguments[1];
                              };
                            })(),
                            lineno: 161
                          }));
                          __iced_deferrals._fulfill();
                        })(function() {
                          return __iced_k(metrics[fam] = ok ? met : 'error obtaining metrics');
                        });
                      } else {
                        return __iced_k();
                      }
                    })(_next);
                  });
                }
              };
              _while(__iced_k);
            })(function() {
              return __iced_k(_this.div.parentNode.removeChild(_this.div));
            });
          } else {
            return __iced_k();
          }
        })(function() {
          return cont(ok, metrics);
        });
      });
    };

    return Easel;

  })();

  exports.whenFontLoaded = whenFontLoaded = function(family, cont) {
    var attempts, br, complete, div, fallback, interval_ms, loaded, max_wait_ms, repeats_until_valid, testFontLoaded, _ref2, _ref3;
    _ref2 = dom.create('div', '<span>b H x p</span><br><span>b H x p</span>'), div = _ref2[0], (_ref3 = _ref2[1], fallback = _ref3[0], br = _ref3[1], loaded = _ref3[2]);
    div.style.cssText = "visibility: visible;\nposition: absolute;\ntop: 0;\nleft: 0;\nfont-family: serif;\nfont-size: 137px;\nfont-style: " + (getFontStyle(family)) + ";\nfont-weight: " + (getFontWeight(family)) + ";\nline-height: 1;\nwhite-space: nowrap;";
    loaded.style.fontFamily = "" + family + ", serif";
    document.body.insertBefore(div, document.body.firstChild);
    interval_ms = 40;
    max_wait_ms = 3000;
    attempts = max_wait_ms / interval_ms;
    repeats_until_valid = 2;
    complete = function(ok, family) {
      div.parentNode.removeChild(div);
      return cont(ok, family);
    };
    testFontLoaded = function() {
      if (fallback.offsetWidth !== loaded.offsetWidth) {
        if (0 === repeats_until_valid--) {
          return complete(true, family);
        } else {
          return util.soon(testFontLoaded);
        }
      } else {
        if (0 === attempts--) {
          return complete(false, family);
        } else {
          return util.delay(interval_ms, testFontLoaded);
        }
      }
    };
    return testFontLoaded();
  };

  exports.getMetrics = getMetrics = function(families) {
    var data, easel, family, metrics, ok, resp, ___iced_passed_deferral, __iced_deferrals, __iced_k;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    families = ["tan2n", "tan4c", "tan4n", "tan7n", "tao4n", "tmn4n", "tsi4n", "tsi4n-smcp", "tsi4n-tnum-lnum", "tsi7n", "tsn4n", "tsn4n-smcp", "tsn4n-tnum-lnum", "tsn7n", "pan2n", "pan4n", "pan4n-smcp", "pan7n", "pan7n-smcp", "psi4n", "psi7n", "psn4n", "psn7n"];
    families = fallbacks.concat(families);
    families = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = families.length; _i < _len; _i++) {
        family = families[_i];
        if (family.indexOf('inv') < 0) _results.push(family);
      }
      return _results;
    })();
    families = ["tsn4n"];
    easel = new Easel({
      minFontSize: 23,
      maxFontSize: 25
    });
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        filename: "B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee",
        funcname: "getMetrics"
      });
      easel.getMetrics(families, __iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            ok = arguments[0];
            return metrics = arguments[1];
          };
        })(),
        lineno: 244
      }));
      __iced_deferrals._fulfill();
    })(function() {
      if (ok) {
        data = JSON.stringify({
          'payload': metrics,
          'browser': 'unknown'
        }, null, 4);
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee",
            funcname: "getMetrics"
          });
          ajax.send('/ajax/json/type-metrics', __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                ok = arguments[0];
                return resp = arguments[1];
              };
            })(),
            lineno: 247
          }), data);
          __iced_deferrals._fulfill();
        })(function() {
          return __iced_k(alert("ok: " + ok + ", resp: " + resp));
        });
      } else {
        return __iced_k();
      }
    });
  };

}).call(undefined, window, (function() {
  var _base;
  if (window.jaap == null) window.jaap = {};
  if ((_base = window.jaap).font == null) _base.font = {};
  return window.jaap.font;
})());
// Generated by IcedCoffeeScript 1.2.0s

(function(global, exports) {
  "use strict";    
    var delay, isNumber, isUndefined, soon, tail, time;

  exports.time = time = function(fun) {
    var start;
    start = new Date();
    fun();
    return new Date() - start;
  };

  exports.isNumber = isNumber = function(obj) {
    return (obj === +obj) || Object.prototype.toString.call(obj) === '[object Number]';
  };

  exports.isUndefined = isUndefined = function(obj) {
    return typeof obj === 'undefined';
  };

  exports.delay = delay = function(wait, func) {
    var args;
    args = this.tail(arguments, 2);
    return setTimeout((function() {
      return func.apply(func, args);
    }), wait);
  };

  exports.soon = soon = function(func) {
    return this.delay.apply(this, [1, func].concat(this.tail(arguments)));
  };

  exports.tail = tail = function(array, index) {
    return Array.prototype.slice.call(array, this.isUndefined(index) ? 1 : index);
  };

}).call(undefined, window, (function() {
  var _base;
  if (window.jaap == null) window.jaap = {};
  if ((_base = window.jaap).util == null) _base.util = {};
  return window.jaap.util;
})());
// Generated by IcedCoffeeScript 1.2.0s

(function(global, exports) {
  "use strict";    
    var addEvent, assignKey, clearModifier, dispatch, k, resetModifiers, _MAP, _MODIFIERS, _handlers, _i, _mods,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  dispatch = function(event) {
    var handler, i, k, key, modifiersMatch, _ref, _results;
    key = event.keyCode;
    if (key === 93 || key === 224) key = 91;
    if (key in _mods) {
      _mods[key] = true;
      for (k in _MODIFIERS) {
        if (_MODIFIERS[k] === key) assignKey[k] = true;
      }
      return;
    }
    if (!assignKey.filter.call(this, event)) return;
    if (!(key in _handlers)) return;
    i = 0;
    _results = [];
    while (i < _handlers[key].length) {
      handler = _handlers[key][i];
      modifiersMatch = handler.mods.length > 0;
      for (k in _mods) {
        if (!__hasProp.call(_mods, k)) continue;
        if ((!_mods[k] && __indexOf.call(handler.mods, +k) >= 0) || (_mods[k] && (_ref = !+k, __indexOf.call(handler.mods, _ref) >= 0))) {
          modifiersMatch = false;
        }
      }
      if ((handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch) {
        if (handler.method(event, handler) === false) {
          if (event.preventDefault) {
            event.preventDefault();
          } else {
            event.returnValue = false;
          }
          if (event.stopPropagation) event.stopPropagation();
          if (event.cancelBubble) event.cancelBubble = true;
        }
      }
      _results.push(i++);
    }
    return _results;
  };

  clearModifier = function(event) {
    var k, key;
    key = event.keyCode;
    if (key === 93 || key === 224) key = 91;
    if (key in _mods) {
      _mods[key] = false;
      for (k in _MODIFIERS) {
        if (_MODIFIERS[k] === key) assignKey[k] = false;
      }
    }
  };

  resetModifiers = function() {
    var k;
    for (k in _mods) {
      _mods[k] = false;
    }
    for (k in _MODIFIERS) {
      assignKey[k] = false;
    }
  };

  assignKey = function(key, method) {
    var i, keys, mi, mods, _results;
    key = key.replace(/\s/g, "");
    keys = key.split(",");
    if (keys[keys.length - 1] === "") keys[keys.length - 2] += ",";
    i = 0;
    _results = [];
    while (i < keys.length) {
      mods = [];
      key = keys[i].split("+");
      if (key.length > 1) {
        mods = key.slice(0, key.length - 1);
        mi = 0;
        while (mi < mods.length) {
          mods[mi] = _MODIFIERS[mods[mi]];
          mi++;
        }
        key = [key[key.length - 1]];
      }
      key = key[0];
      key = _MAP[key] || key.toUpperCase().charCodeAt(0);
      if (!(key in _handlers)) _handlers[key] = [];
      _handlers[key].push({
        shortcut: keys[i],
        method: method,
        key: keys[i],
        mods: mods
      });
      _results.push(i++);
    }
    return _results;
  };

  assignKey.filter = function(event) {
    var tagName;
    tagName = (event.target || event.srcElement).tagName;
    return !(tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA");
  };

  addEvent = function(object, event, method) {
    if (object.addEventListener) {
      return object.addEventListener(event, method, false);
    } else if (object.attachEvent) {
      return object.attachEvent("on" + event, function() {
        return method(window.event);
      });
    }
  };

  _handlers = {};

  _mods = {
    16: false,
    18: false,
    17: false,
    91: false
  };

  _MODIFIERS = {
    shift: 16,
    alt: 18,
    option: 18,
    ctrl: 17,
    command: 91
  };

  for (k = _i = 1; _i < 20; k = ++_i) {
    _MODIFIERS["f" + k] = 111 + k;
  }

  _MAP = {
    backspace: 8,
    tab: 9,
    clear: 12,
    enter: 13,
    "return": 13,
    esc: 27,
    escape: 27,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    del: 46,
    "delete": 46,
    home: 36,
    end: 35,
    pageup: 33,
    pagedown: 34,
    ",": 188,
    ".": 190,
    "/": 191,
    "`": 192,
    "-": 189,
    "=": 187,
    ";": 186,
    "'": 222,
    "[": 219,
    "]": 221,
    "\\": 220
  };

  for (k in _MODIFIERS) {
    if (!__hasProp.call(_MODIFIERS, k)) continue;
    assignKey[k] = false;
  }

  addEvent(document, "keydown", dispatch);

  addEvent(document, "keyup", clearModifier);

  addEvent(window, "focus", resetModifiers);

  exports.on = assignKey;

}).call(undefined, window, (function() {
  var _base;
  if (window.jaap == null) window.jaap = {};
  if ((_base = window.jaap).keys == null) _base.keys = {};
  return window.jaap.keys;
})());
// Generated by IcedCoffeeScript 1.2.0s

(function(global, exports) {
  "use strict";    
  
  exports.create = function(tag, innerHTML) {
    var elem;
    elem = document.createElement(tag);
    elem.innerHTML = innerHTML;
    return [elem, elem.children];
  };

  exports.toggleClass = function(e, n) {
    if (0 <= e.className.indexOf(n)) {
      return e.className = e.className.replace(RegExp("(?:^|\\s)" + n + "(?!\\S)"), '');
    } else {
      return e.className += " " + n;
    }
  };

}).call(undefined, window, (function() {
  var _base;
  if (window.jaap == null) window.jaap = {};
  if ((_base = window.jaap).dom == null) _base.dom = {};
  return window.jaap.dom;
})());
// Generated by IcedCoffeeScript 1.2.0s

(function(global, exports) {
  "use strict";    
    var ajax, diagnose, dom, entryPoint, font, iced, keys, toggleBaseline, util, _ref;

  iced = global.iced, (_ref = global.jaap, util = _ref.util, ajax = _ref.ajax, dom = _ref.dom, keys = _ref.keys, font = _ref.font);

  toggleBaseline = function() {
    return dom.toggleClass(document.body, 'baseline');
  };

  diagnose = function() {
    var body, get, ppgd;
    body = document.body;
    ppgd = parseFloat(window.getComputedStyle(body).lineHeight);
    get = function(name) {
      var elem, height, isHeightWholeNumber, ppem, pplh, style;
      style = {
        fontSize: '0',
        lineHeight: '0'
      };
      elem = document.querySelector(name);
      if (elem) style = window.getComputedStyle(elem);
      ppem = parseFloat(style.fontSize);
      pplh = parseFloat(style.lineHeight);
      height = elem.getBoundingClientRect().height;
      isHeightWholeNumber = name === 'html' || name === 'body' ? "" : " " + height + " / " + ppgd + " = " + (height / ppgd);
      return "" + ppem + "/" + pplh + isHeightWholeNumber + ": " + name + "<br/>";
    };
    return document.querySelector('#dimensions').innerHTML = "" + (get('html')) + "\n" + (get('body')) + "\n" + (get('p')) + "\n" + (get('h1')) + "\n" + (get('h2')) + "\n" + (get('h3')) + "\n" + (get('.small')) + "\nviewport: " + window.innerWidth + "\u00D7" + window.innerHeight + ", " + window.orientation + "<br/>\nbody:     " + body.offsetWidth + "\u00D7" + body.offsetWidth;
  };

  entryPoint = function() {
    var repeated_diagnose;
    if (top !== window) return;
    keys.on('b', toggleBaseline);
    keys.on('shift+t', font.getMetrics);
    keys.on('d', diagnose);
    return repeated_diagnose = function() {
      var every_num_ms;
      every_num_ms = 300;
      diagnose();
      return util.delay(every_num_ms, repeated_diagnose);
    };
  };

  entryPoint();

}).call(undefined, window, (function() {
  if (window.jaap == null) window.jaap = {};
  return window.jaap;
})());
