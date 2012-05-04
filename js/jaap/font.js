// Generated by IcedCoffeeScript 1.2.0s

(function(global, exports) {
  "use strict";    
    var Easel, ajax, dom, fallbacks, getFontStyle, getFontWeight, getMetrics, getTextFromElementStrict, iced, util, whenFontLoaded, __iced_k_noop, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    _this = this,
    __hasProp = {}.hasOwnProperty;

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
    console.log("Trying " + family);
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
          console.log("Ok " + family);
          return complete(true, family);
        } else {
          console.log("Almost " + family);
          return util.soon(testFontLoaded);
        }
      } else {
        if (0 === attempts--) {
          console.log("Timeout and Failed " + family);
          return complete(false, family);
        } else {
          console.log("Taking a while " + family);
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
    easel = new Easel({
      minFontSize: 8,
      maxFontSize: 213
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
        lineno: 250
      }));
      __iced_deferrals._fulfill();
    })(function() {
      if (ok) {
        data = JSON.stringify({
          'payload': metrics,
          'browser': 'unknown'
        }, null, 2);
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
            lineno: 253
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

  getTextFromElementStrict = function(el) {
    var TEXT_NODE, childNode;
    TEXT_NODE = 3;
    return ((function() {
      var _i, _len, _ref2, _results;
      _ref2 = el.childNodes;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        childNode = _ref2[_i];
        if (childNode.nodeType === TEXT_NODE) _results.push(childNode.nodeValue);
      }
      return _results;
    })()).join('');
  };

  exports.getSubsets = function() {
    var getDocumentSubsets, getFontFamilyTextForGeneratedContent, textPerFontFamily;
    textPerFontFamily = {};
    getFontFamilyTextForGeneratedContent = function(el, pseudo) {
      var fontFamily, style;
      style = window.getComputedStyle(el, pseudo);
      fontFamily = style.fontFamily.split(',')[0];
      return textPerFontFamily[fontFamily] += style.content;
    };
    getDocumentSubsets = function(doc) {
      var el, fontFamily, style, _i, _len, _ref2, _results;
      console.log("Crawling: " + doc.location.href + " for font subsets.");
      _ref2 = [doc.body].concat(Array.prototype.slice.call(doc.querySelectorAll('body *')));
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        el = _ref2[_i];
        style = window.getComputedStyle(el, null);
        fontFamily = style.fontFamily.split(',')[0];
        if (textPerFontFamily[fontFamily] == null) {
          textPerFontFamily[fontFamily] = '';
        }
        textPerFontFamily[fontFamily] += getTextFromElementStrict(el);
        getFontFamilyTextForGeneratedContent(el, ':before');
        _results.push(getFontFamilyTextForGeneratedContent(el, ':after'));
      }
      return _results;
    };
    return dom.crawl(getDocumentSubsets, function() {
      var char, data, fontFamily, ok, resp, text, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      for (fontFamily in textPerFontFamily) {
        if (!__hasProp.call(textPerFontFamily, fontFamily)) continue;
        text = textPerFontFamily[fontFamily];
        text = util.unique(text).sort().join('').replace('\n', '');
        textPerFontFamily[fontFamily] = {
          characters: text,
          unicodes: (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = text.length; _i < _len; _i++) {
              char = text[_i];
              _results.push(char.charCodeAt());
            }
            return _results;
          })()
        };
      }
      data = JSON.stringify({
        'payload': textPerFontFamily,
        'browser': 'unknown'
      }, null, 2);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee"
        });
        ajax.send('/ajax/json/type-subsets', __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              ok = arguments[0];
              return resp = arguments[1];
            };
          })(),
          lineno: 288
        }), data);
        __iced_deferrals._fulfill();
      })(function() {
        return alert("ok: " + ok + ", resp: " + resp);
      });
    });
  };

}).call(undefined, window, (function() {
  var _base;
  if (window.jaap == null) window.jaap = {};
  if ((_base = window.jaap).font == null) _base.font = {};
  return window.jaap.font;
})());
