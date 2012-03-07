'use strict';var $JSCompiler_alias_NULL$$ = null;
(function($global$$, $exports$$) {
  var $create$$, $factories$$;
  $global$$.$iced$ != $JSCompiler_alias_NULL$$ || ($global$$.$iced$ = {});
  $factories$$ = [function() {
    return new XMLHttpRequest
  }, function() {
    return new ActiveXObject("Msxml2.XMLHTTP")
  }, function() {
    return new ActiveXObject("Msxml3.XMLHTTP")
  }, function() {
    return new ActiveXObject("Microsoft.XMLHTTP")
  }];
  $create$$ = function $$create$$$() {
    var $f$$, $xhr$$, $_i$$, $_len$$;
    $xhr$$ = !1;
    for($_i$$ = 0, $_len$$ = $factories$$.length;$_i$$ < $_len$$;$_i$$++) {
      $f$$ = $factories$$[$_i$$];
      try {
        $xhr$$ = $f$$()
      }catch($e$$8$$) {
        continue
      }
      return $xhr$$
    }
  };
  $exports$$.send = function $$exports$$$send$($url$$21$$, $cb$$, $postData$$) {
    var $xhr$$1$$;
    if($xhr$$1$$ = $create$$()) {
      if($xhr$$1$$.open($postData$$ ? "PUT" : "GET", $url$$21$$, !0), $postData$$ && $xhr$$1$$.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), $xhr$$1$$.onreadystatechange = function $$xhr$$1$$$onreadystatechange$() {
        if(4 === $xhr$$1$$.readyState) {
          return 200 === $xhr$$1$$.status || 304 === $xhr$$1$$.status ? $cb$$(!0, $xhr$$1$$.responseText) : $cb$$(!1)
        }
      }, 4 !== $xhr$$1$$.readyState) {
        return $xhr$$1$$.send($postData$$)
      }
    }else {
      return $cb$$(!1)
    }
  }
}).call(void 0, window, function() {
  var $_base$$;
  window.$jaap$ == $JSCompiler_alias_NULL$$ && (window.$jaap$ = {});
  if(($_base$$ = window.$jaap$).$ajax$ == $JSCompiler_alias_NULL$$) {
    $_base$$.$ajax$ = {}
  }
  return window.$jaap$.$ajax$
}());
(function($global$$1$$, $exports$$1$$) {
  function $__bind$$($fn$$, $me$$) {
    return function() {
      return $fn$$.apply($me$$, arguments)
    }
  }
  var $Easel$$, $ajax$$, $fallbacks$$, $getFontStyle$$, $getFontWeight$$, $iced$$2$$, $util$$, $whenFontLoaded$$, $__iced_k_noop$$, $_base$$1$$, $_base2$$, $_ref$$1$$, $_ref2$$, $_ref3$$, $__indexOf$$ = [].indexOf || function($item$$) {
    for(var $i$$1$$ = 0, $l$$ = this.length;$i$$1$$ < $l$$;$i$$1$$++) {
      if($i$$1$$ in this && this[$i$$1$$] === $item$$) {
        return $i$$1$$
      }
    }
    return-1
  };
  $__iced_k_noop$$ = function $$__iced_k_noop$$$() {
  };
  $iced$$2$$ = ($_ref$$1$$ = $global$$1$$.$iced$) != $JSCompiler_alias_NULL$$ ? $_ref$$1$$ : $global$$1$$.$iced$ = {};
  $util$$ = ($_ref2$$ = ($_base$$1$$ = $global$$1$$.$jaap$).$util$) != $JSCompiler_alias_NULL$$ ? $_ref2$$ : $_base$$1$$.$util$ = {};
  $ajax$$ = ($_ref3$$ = ($_base2$$ = $global$$1$$.$jaap$).$ajax$) != $JSCompiler_alias_NULL$$ ? $_ref3$$ : $_base2$$.$ajax$ = {};
  $fallbacks$$ = ["georgia", "arial", "verdana"];
  $getFontStyle$$ = function $$getFontStyle$$$($family$$) {
    if(0 <= $__indexOf$$.call($fallbacks$$, $family$$)) {
      return"normal"
    }
    switch($family$$[2]) {
      case "i":
        return"italic";
      case "o":
        return"oblique";
      default:
        return"normal"
    }
  };
  $getFontWeight$$ = function $$getFontWeight$$$($family$$1$$) {
    return 0 <= $__indexOf$$.call($fallbacks$$, $family$$1$$) ? 400 : 100 * $family$$1$$[3]
  };
  $Easel$$ = function() {
    function $Easel$$1$$($_arg$$) {
      var $_ref4$$, $_ref5$$;
      this.$minFontSize$ = $_arg$$.$minFontSize$;
      this.$maxFontSize$ = $_arg$$.$maxFontSize$;
      this.$getMetrics$ = $__bind$$(this.$getMetrics$, this);
      this.$lineHeightMul$ = 3;
      this.$minBaseline$ = this.$minFontSize$ / 2;
      this.$cnv0$ = document.createElement("canvas");
      this.$cnv1$ = document.createElement("canvas");
      this.$ctx0$ = this.$cnv0$.getContext("2d");
      this.$ctx1$ = this.$cnv1$.getContext("2d");
      this.$ctx0$.textBaseline = this.$ctx1$.textBaseline = "alphabetic";
      this.$ctx0$.textAlign = this.$ctx1$.textAlign = "left";
      this.$ctx0$.fillStyle = this.$ctx1$.fillStyle = "#000";
      $_ref4$$ = $util$$.createElement("div", '<img style="vertical-align: baseline" width="1" height="1" alt="" src="/img/1x1-black.png">bHxp');
      this.$div$ = $_ref4$$[0];
      $_ref5$$ = $_ref4$$[1], this.$img$ = $_ref5$$[0];
      this.$div$.style.whiteSpace = "nowrap";
      this.$div$.style.position = "absolute";
      this.$div$.style.lineHeight = this.$lineHeightMul$;
      document.body.insertBefore(this.$div$, document.body.firstChild);
      this.$cnv0$.style.backgroundColor = "#fee";
      this.$cnv1$.style.backgroundColor = "#eef";
      document.body.insertBefore(this.$cnv1$, document.body.children[0]);
      document.body.insertBefore(this.$cnv0$, this.$cnv1$)
    }
    var $firstPowerOfTwoLessThan$$;
    $Easel$$1$$.$__name$ = "Easel";
    $Easel$$1$$.prototype.$drawGlyph$ = function $$Easel$$1$$$$$drawGlyph$$($glyph$$, $upsideDown$$) {
      this.$ctx0$.clearRect(0, 0, this.fontSize, this.$baseline$);
      this.$ctx1$.clearRect(0, 0, this.fontSize, this.$baseline$);
      $upsideDown$$ && (this.$ctx0$.save(), this.$ctx0$.translate(0, this.$baseline$), this.$ctx0$.scale(1, -1), this.$ctx0$.translate(0, -this.$baseline$));
      this.$ctx0$.fillText($glyph$$, 0, this.$baseline$);
      $upsideDown$$ && this.$ctx0$.restore()
    };
    $firstPowerOfTwoLessThan$$ = function $$firstPowerOfTwoLessThan$$$($n$$1$$) {
      return 1 << Math.floor(Math.log($n$$1$$ - 1) / Math.log(2))
    };
    $Easel$$1$$.prototype.$horizontalSplat$ = function $$Easel$$1$$$$$horizontalSplat$$() {
      var $w$$4$$, $x$$48$$, $_ref4$$1$$, $_ref5$$1$$;
      this.$ctx1$.drawImage(this.$cnv0$, 0, 0);
      $x$$48$$ = $firstPowerOfTwoLessThan$$(this.fontSize);
      for($w$$4$$ = this.fontSize - $x$$48$$;$x$$48$$;) {
        this.$ctx1$.drawImage(this.$cnv0$, $x$$48$$, 0, $w$$4$$, this.$baseline$, 0, 0, $w$$4$$, this.$baseline$), $_ref4$$1$$ = [this.$ctx1$, this.$ctx0$], this.$ctx0$ = $_ref4$$1$$[0], this.$ctx1$ = $_ref4$$1$$[1], $_ref5$$1$$ = [this.$cnv1$, this.$cnv0$], this.$cnv0$ = $_ref5$$1$$[0], this.$cnv1$ = $_ref5$$1$$[1], $w$$4$$ = $x$$48$$ >>= 1
      }
    };
    $Easel$$1$$.prototype.$getFirstVerticalPixel$ = function $$Easel$$1$$$$$getFirstVerticalPixel$$() {
      var $data$$19$$, $y$$32$$;
      $data$$19$$ = this.$ctx0$.getImageData(0, 0, 1, this.$baseline$).data;
      $data$$19$$[$data$$19$$.length - 4 + 3] = 255;
      for($y$$32$$ = 3;0 === $data$$19$$[$y$$32$$];) {
        $y$$32$$ += 4
      }
      return($y$$32$$ - 3) / 4
    };
    $Easel$$1$$.prototype.$getGlyphMetric$ = function $$Easel$$1$$$$$getGlyphMetric$$($glyph$$1$$, $upsideDown$$1$$) {
      $upsideDown$$1$$ == $JSCompiler_alias_NULL$$ && ($upsideDown$$1$$ = !1);
      this.$drawGlyph$($glyph$$1$$, $upsideDown$$1$$);
      this.$horizontalSplat$();
      return this.$getFirstVerticalPixel$()
    };
    $Easel$$1$$.prototype.$getGlyphMetrics$ = function $$Easel$$1$$$$$getGlyphMetrics$$() {
      this.fontSize < this.$minFontSize$ || this.$baseline$ < this.$minBaseline$ ? this.$ascent$ = this.$cap$ = this.$ex$ = this.$descent$ = 0 : (this.$descent$ = this.$baseline$ - this.$getGlyphMetric$("p", !0), this.$ascent$ = this.$baseline$ - this.$getGlyphMetric$("b"), this.$ex$ = this.$baseline$ - this.$getGlyphMetric$("x"), this.$cap$ = this.$baseline$ - this.$getGlyphMetric$("H"))
    };
    $Easel$$1$$.prototype.$getSizedFamilyMetrics$ = function $$Easel$$1$$$$$getSizedFamilyMetrics$$($fontSize_halfLeading$$, $family$$2$$, $metrics$$, $cont$$) {
      this.fontSize = $fontSize_halfLeading$$;
      this.$div$.style.fontSize = "" + this.fontSize + "px";
      $fontSize_halfLeading$$ = (this.$lineHeightMul$ * this.fontSize - this.fontSize) / 2;
      this.$cnv0$.width = this.$cnv1$.width = this.fontSize;
      this.$baseline$ = this.$img$.offsetTop + 1 - $fontSize_halfLeading$$;
      this.$cnv0$.height = this.$cnv1$.height = this.$baseline$;
      this.$ctx0$.font = this.$ctx1$.font = "" + $getFontWeight$$($family$$2$$) + " " + $getFontStyle$$($family$$2$$) + " " + this.fontSize + "px " + $family$$2$$;
      this.$getGlyphMetrics$();
      $metrics$$.baseline[this.fontSize] = this.$baseline$;
      $metrics$$.descent[this.fontSize] = this.$ascent$;
      $metrics$$.ascent[this.fontSize] = this.$cap$;
      $metrics$$.ex[this.fontSize] = this.$ex$;
      $metrics$$.cap[this.fontSize] = this.$descent$;
      $util$$.$soon$($cont$$)
    };
    $Easel$$1$$.prototype.$getFamilyMetrics$ = function $$Easel$$1$$$$$getFamilyMetrics$$($family$$3$$, $cont$$1$$) {
      var $metrics$$1$$, $size$$9$$, $__iced_deferrals$$, $_this$$1$$ = this;
      this.$div$.style.fontFamily = $family$$3$$;
      this.$div$.style.fontStyle = $getFontStyle$$($family$$3$$);
      this.$div$.style.fontWeight = $getFontWeight$$($family$$3$$);
      $metrics$$1$$ = {baseline:[], ex:[], cap:[], ascent:[], descent:[]};
      (function($__iced_k$$1$$) {
        var $_results$$, $_while$$;
        $size$$9$$ = 0;
        $_results$$ = [];
        $_while$$ = function $$_while$$$($__iced_k$$2$$) {
          var $_break$$, $_continue$$, $_next$$;
          $_break$$ = function $$_break$$$() {
            return $__iced_k$$2$$($_results$$)
          };
          $_continue$$ = function $$_continue$$$() {
            ++$size$$9$$;
            return $_while$$($__iced_k$$2$$)
          };
          $_next$$ = function $$_next$$$($__iced_next_arg$$) {
            $_results$$.push($__iced_next_arg$$);
            return $_continue$$()
          };
          if($size$$9$$ <= $_this$$1$$.$maxFontSize$) {
            $__iced_deferrals$$ = new $iced$$2$$.$Deferrals$($_next$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee", $funcname$:"Easel.getFamilyMetrics"}), $_this$$1$$.$getSizedFamilyMetrics$($size$$9$$, $family$$3$$, $metrics$$1$$, $__iced_deferrals$$.defer({$lineno$:145})), $__iced_deferrals$$.$_fulfill$()
          }else {
            return $_break$$()
          }
        };
        $_while$$($__iced_k$$1$$)
      })(function() {
        return $cont$$1$$(!0, $metrics$$1$$)
      })
    };
    $Easel$$1$$.prototype.$getMetrics$ = function $$Easel$$1$$$$$getMetrics$$($families$$, $cont$$2$$) {
      var $fam$$, $family$$4$$, $met$$, $metrics$$2$$, $ok$$, $__iced_deferrals$$1$$, $_this$$2$$ = this;
      $metrics$$2$$ = {minFontSize:this.$minFontSize$, maxFontSize:this.$maxFontSize$, families:$families$$};
      (function($__iced_k$$5$$) {
        var $_i$$2$$, $_len$$1$$, $_results$$1$$, $_while$$1$$;
        $_len$$1$$ = $families$$.length;
        $_i$$2$$ = 0;
        $_results$$1$$ = [];
        $_while$$1$$ = function $$_while$$1$$$($__iced_k$$6$$) {
          var $_break$$1$$, $_continue$$1$$, $_next$$1$$;
          $_break$$1$$ = function $$_break$$1$$$() {
            return $__iced_k$$6$$($_results$$1$$)
          };
          $_continue$$1$$ = function $$_continue$$1$$$() {
            ++$_i$$2$$;
            return $_while$$1$$($__iced_k$$6$$)
          };
          $_next$$1$$ = function $$_next$$1$$$($__iced_next_arg$$1$$) {
            $_results$$1$$.push($__iced_next_arg$$1$$);
            return $_continue$$1$$()
          };
          if($_i$$2$$ < $_len$$1$$) {
            $family$$4$$ = $families$$[$_i$$2$$], function($__iced_k$$7$$) {
              $__iced_deferrals$$1$$ = new $iced$$2$$.$Deferrals$($__iced_k$$7$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee", $funcname$:"Easel.getMetrics"});
              $whenFontLoaded$$($family$$4$$, $__iced_deferrals$$1$$.defer({$assign_fn$:function() {
                return function($JSCompiler_OptimizeArgumentsArray_p0$$, $JSCompiler_OptimizeArgumentsArray_p1$$) {
                  $ok$$ = $JSCompiler_OptimizeArgumentsArray_p0$$;
                  return $fam$$ = $JSCompiler_OptimizeArgumentsArray_p1$$
                }
              }(), $lineno$:157}));
              $__iced_deferrals$$1$$.$_fulfill$()
            }($_next$$1$$)
          }else {
            return $_break$$1$$()
          }
        };
        $_while$$1$$($__iced_k$$5$$)
      })(function() {
        (function($__iced_k$$8$$) {
          if($ok$$) {
            (function($__iced_k$$9$$) {
              var $_i$$3$$, $_len$$2$$, $_results$$2$$, $_while$$2$$;
              $_len$$2$$ = $families$$.length;
              $_i$$3$$ = 0;
              $_results$$2$$ = [];
              $_while$$2$$ = function $$_while$$2$$$($__iced_k$$10$$) {
                var $_break$$2$$, $_continue$$2$$, $_next$$2$$;
                $_break$$2$$ = function $$_break$$2$$$() {
                  return $__iced_k$$10$$($_results$$2$$)
                };
                $_continue$$2$$ = function $$_continue$$2$$$() {
                  ++$_i$$3$$;
                  return $_while$$2$$($__iced_k$$10$$)
                };
                $_next$$2$$ = function $$_next$$2$$$($__iced_next_arg$$2$$) {
                  $_results$$2$$.push($__iced_next_arg$$2$$);
                  return $_continue$$2$$()
                };
                if($_i$$3$$ < $_len$$2$$) {
                  $family$$4$$ = $families$$[$_i$$3$$], function($__iced_k$$11$$) {
                    $__iced_deferrals$$1$$ = new $iced$$2$$.$Deferrals$($__iced_k$$11$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee", $funcname$:"Easel.getMetrics"});
                    $whenFontLoaded$$($family$$4$$, $__iced_deferrals$$1$$.defer({$assign_fn$:function() {
                      return function($JSCompiler_OptimizeArgumentsArray_p2$$, $JSCompiler_OptimizeArgumentsArray_p3$$) {
                        $ok$$ = $JSCompiler_OptimizeArgumentsArray_p2$$;
                        return $fam$$ = $JSCompiler_OptimizeArgumentsArray_p3$$
                      }
                    }(), $lineno$:161}));
                    $__iced_deferrals$$1$$.$_fulfill$()
                  }(function() {
                    (function($__iced_k$$12$$) {
                      if($ok$$) {
                        (function($__iced_k$$13$$) {
                          $__iced_deferrals$$1$$ = new $iced$$2$$.$Deferrals$($__iced_k$$13$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee", $funcname$:"Easel.getMetrics"});
                          $_this$$2$$.$getFamilyMetrics$($fam$$, $__iced_deferrals$$1$$.defer({$assign_fn$:function() {
                            return function($JSCompiler_OptimizeArgumentsArray_p4$$, $JSCompiler_OptimizeArgumentsArray_p5$$) {
                              $ok$$ = $JSCompiler_OptimizeArgumentsArray_p4$$;
                              return $met$$ = $JSCompiler_OptimizeArgumentsArray_p5$$
                            }
                          }(), $lineno$:163}));
                          $__iced_deferrals$$1$$.$_fulfill$()
                        })(function() {
                          return $__iced_k$$12$$($metrics$$2$$[$fam$$] = $ok$$ ? $met$$ : "error obtaining metrics")
                        })
                      }else {
                        return $__iced_k$$12$$()
                      }
                    })($_next$$2$$)
                  })
                }else {
                  return $_break$$2$$()
                }
              };
              $_while$$2$$($__iced_k$$9$$)
            })(function() {
              return $__iced_k$$8$$($_this$$2$$.$div$.parentNode.removeChild($_this$$2$$.$div$))
            })
          }else {
            return $__iced_k$$8$$()
          }
        })(function() {
          return $cont$$2$$($ok$$, $metrics$$2$$)
        })
      })
    };
    return $Easel$$1$$
  }();
  $exports$$1$$.$whenFontLoaded$ = $whenFontLoaded$$ = function $$whenFontLoaded$$$($family$$5$$, $cont$$3$$) {
    var $attempts$$, $complete$$, $div$$, $fallback$$, $loaded$$, $repeats_until_valid$$, $testFontLoaded$$, $_ref4$$4$$, $_ref5$$2$$;
    $_ref4$$4$$ = $util$$.createElement("div", "<span>b H x p</span><br><span>b H x p</span>");
    $div$$ = $_ref4$$4$$[0];
    $_ref5$$2$$ = $_ref4$$4$$[1], $fallback$$ = $_ref5$$2$$[0], $loaded$$ = $_ref5$$2$$[2];
    $div$$.style.cssText = "visibility: visible;\nposition: absolute;\ntop: 0;\nleft: 0;\nfont-family: serif;\nfont-size: 137px;\nfont-style: " + $getFontStyle$$($family$$5$$) + ";\nfont-weight: " + $getFontWeight$$($family$$5$$) + ";\nline-height: 1;\nwhite-space: nowrap;";
    $loaded$$.style.fontFamily = "" + $family$$5$$ + ", serif";
    document.body.insertBefore($div$$, document.body.firstChild);
    $attempts$$ = 75;
    $repeats_until_valid$$ = 2;
    $complete$$ = function $$complete$$$($ok$$1$$, $family$$6$$) {
      $div$$.parentNode.removeChild($div$$);
      return $cont$$3$$($ok$$1$$, $family$$6$$)
    };
    $testFontLoaded$$ = function $$testFontLoaded$$$() {
      return $fallback$$.offsetWidth !== $loaded$$.offsetWidth ? 0 === $repeats_until_valid$$-- ? $complete$$(!0, $family$$5$$) : $util$$.$soon$($testFontLoaded$$) : 0 === $attempts$$-- ? $complete$$(!1, $family$$5$$) : $util$$.$delay$($testFontLoaded$$, 40)
    };
    return $testFontLoaded$$()
  };
  $exports$$1$$.$getMetrics$ = function $$exports$$1$$$$getMetrics$$($families$$1$$) {
    var $data$$20$$, $easel$$, $family$$7$$, $metrics$$3$$, $ok$$2$$, $resp$$, $__iced_deferrals$$2$$, $_ref4$$5$$, $families$$1$$ = "psn7n-inv,tan2n,tan4c,tan4n,tan7n,tao4n,tmn4n,tsi4n,tsi4n-smcp,tsi4n-tnum-lnum,tsi7n,tsn4n,tsn4n-smcp,tsn4n-tnum-lnum,tsn7n,pan2n,pan2n-inv,pan4n,pan4n-inv,pan7n,pan7n-inv,psi4n,psi4n-inv,psi7n,psi7n-inv,psn4n,psn4n-inv,psn7n".split(",");
    if(($_ref4$$5$$ = $global$$1$$.$jaap$) != $JSCompiler_alias_NULL$$ && $_ref4$$5$$.$dev$) {
      $families$$1$$ = ["tan2n"]
    }
    $families$$1$$ = $fallbacks$$.concat($families$$1$$);
    $families$$1$$ = function() {
      var $_i$$4$$, $_len$$3$$, $_results$$3$$;
      $_results$$3$$ = [];
      for($_i$$4$$ = 0, $_len$$3$$ = $families$$1$$.length;$_i$$4$$ < $_len$$3$$;$_i$$4$$++) {
        $family$$7$$ = $families$$1$$[$_i$$4$$], $family$$7$$.indexOf("inv" < 0) && $_results$$3$$.push($family$$7$$)
      }
      return $_results$$3$$
    }();
    $easel$$ = new $Easel$$({$minFontSize$:8, $maxFontSize$:136});
    (function($__iced_k$$15$$) {
      $__iced_deferrals$$2$$ = new $iced$$2$$.$Deferrals$($__iced_k$$15$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee", $funcname$:"getMetrics"});
      $easel$$.$getMetrics$($families$$1$$, $__iced_deferrals$$2$$.defer({$assign_fn$:function() {
        return function($JSCompiler_OptimizeArgumentsArray_p6$$, $JSCompiler_OptimizeArgumentsArray_p7$$) {
          $ok$$2$$ = $JSCompiler_OptimizeArgumentsArray_p6$$;
          return $metrics$$3$$ = $JSCompiler_OptimizeArgumentsArray_p7$$
        }
      }(), $lineno$:252}));
      $__iced_deferrals$$2$$.$_fulfill$()
    })(function() {
      if($ok$$2$$) {
        $data$$20$$ = JSON.stringify({payload:$metrics$$3$$, browser:"unknown"}, $JSCompiler_alias_NULL$$, 4), function($__iced_k$$16$$) {
          $__iced_deferrals$$2$$ = new $iced$$2$$.$Deferrals$($__iced_k$$16$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee", $funcname$:"getMetrics"});
          $ajax$$.send("/ajax/json/type-metrics", $__iced_deferrals$$2$$.defer({$assign_fn$:function() {
            return function($JSCompiler_OptimizeArgumentsArray_p8$$, $JSCompiler_OptimizeArgumentsArray_p9$$) {
              $ok$$2$$ = $JSCompiler_OptimizeArgumentsArray_p8$$;
              return $resp$$ = $JSCompiler_OptimizeArgumentsArray_p9$$
            }
          }(), $lineno$:255}), $data$$20$$);
          $__iced_deferrals$$2$$.$_fulfill$()
        }(function() {
          return $__iced_k_noop$$(alert("ok: " + $ok$$2$$ + ", resp: " + $resp$$))
        })
      }else {
        return $__iced_k_noop$$()
      }
    })
  }
}).call(void 0, window, function() {
  var $_base$$2$$;
  window.$jaap$ == $JSCompiler_alias_NULL$$ && (window.$jaap$ = {});
  if(($_base$$2$$ = window.$jaap$).font == $JSCompiler_alias_NULL$$) {
    $_base$$2$$.font = {}
  }
  return window.$jaap$.font
}());
(function($global$$2$$, $exports$$2$$) {
  $exports$$2$$.time = function $$exports$$2$$$time$($fun$$5$$) {
    var $start$$5$$;
    $start$$5$$ = new Date;
    $fun$$5$$();
    return new Date - $start$$5$$
  };
  $exports$$2$$.$isNumber$ = function $$exports$$2$$$$isNumber$$($obj$$16$$) {
    return $obj$$16$$ === +$obj$$16$$ || "[object Number]" === Object.prototype.toString.call($obj$$16$$)
  };
  $exports$$2$$.$isUndefined$ = function $$exports$$2$$$$isUndefined$$($obj$$17$$) {
    return"undefined" === typeof $obj$$17$$
  };
  $exports$$2$$.$onKeyUp$ = function $$exports$$2$$$$onKeyUp$$($key$$13$$, $fun$$6$$) {
    var $_this$$3$$ = this;
    window.addEventListener("keydown", function($e$$9$$) {
      ($_this$$3$$.$isNumber$($key$$13$$) && $key$$13$$ === $e$$9$$.keyCode || $key$$13$$.toUpperCase() === String.fromCharCode($e$$9$$.keyCode || $e$$9$$.charCode).toUpperCase()) && $fun$$6$$()
    })
  };
  $exports$$2$$.createElement = function $$exports$$2$$$createElement$($tag$$, $innerHTML$$) {
    var $elem$$1$$;
    $elem$$1$$ = document.createElement($tag$$);
    $elem$$1$$.innerHTML = $innerHTML$$;
    return[$elem$$1$$, $elem$$1$$.children]
  };
  $exports$$2$$.$delay$ = function $$exports$$2$$$$delay$$($func$$3$$, $wait$$) {
    var $args$$;
    $args$$ = this.$tail$(arguments, 2);
    return setTimeout(function() {
      return $func$$3$$.apply($func$$3$$, $args$$)
    }, $wait$$)
  };
  $exports$$2$$.$soon$ = function $$exports$$2$$$$soon$$($func$$4$$) {
    return this.$delay$.apply(this, [$func$$4$$, 1].concat(this.$tail$(arguments)))
  };
  $exports$$2$$.$tail$ = function $$exports$$2$$$$tail$$($array$$9$$, $index$$51$$) {
    return Array.prototype.slice.call($array$$9$$, this.$isUndefined$($index$$51$$) ? 1 : $index$$51$$)
  }
}).call(void 0, window, function() {
  var $_base$$3$$;
  window.$jaap$ == $JSCompiler_alias_NULL$$ && (window.$jaap$ = {});
  if(($_base$$3$$ = window.$jaap$).$util$ == $JSCompiler_alias_NULL$$) {
    $_base$$3$$.$util$ = {}
  }
  return window.$jaap$.$util$
}());
(function($font_global$$3$$) {
  var $iced$$3_util$$1$$, $prop$$4$$, $_base$$4$$, $_base2$$1$$, $_ref$$2$$, $_ref2$$1$$, $__slice$$ = [].slice, $__hasProp$$ = {}.hasOwnProperty;
  $iced$$3_util$$1$$ = {$Deferrals$:function() {
    function $_Class$$($_arg$$1$$) {
      this.$continuation$ = $_arg$$1$$;
      this.count = 1;
      this.$ret$ = $JSCompiler_alias_NULL$$
    }
    $_Class$$.prototype.$_fulfill$ = function $$_Class$$$$$_fulfill$$() {
      if(!--this.count) {
        return this.$continuation$(this.$ret$)
      }
    };
    $_Class$$.prototype.defer = function $$_Class$$$$defer$($defer_params$$) {
      var $_this$$4$$ = this;
      ++this.count;
      return function() {
        var $inner_params$$, $_ref$$3$$;
        $inner_params$$ = 1 <= arguments.length ? $__slice$$.call(arguments, 0) : [];
        $defer_params$$ != $JSCompiler_alias_NULL$$ && ($_ref$$3$$ = $defer_params$$.$assign_fn$) != $JSCompiler_alias_NULL$$ && $_ref$$3$$.apply($JSCompiler_alias_NULL$$, $inner_params$$);
        return $_this$$4$$.$_fulfill$()
      }
    };
    return $_Class$$
  }(), $findDeferral$:function $$iced$$3_util$$1$$$$findDeferral$$() {
    return $JSCompiler_alias_NULL$$
  }};
  for($prop$$4$$ in $iced$$3_util$$1$$) {
    $__hasProp$$.call($iced$$3_util$$1$$, $prop$$4$$) && ($font_global$$3$$.$iced$[$prop$$4$$] = $iced$$3_util$$1$$[$prop$$4$$])
  }
  $iced$$3_util$$1$$ = ($_ref$$2$$ = ($_base$$4$$ = $font_global$$3$$.$jaap$).$util$) != $JSCompiler_alias_NULL$$ ? $_ref$$2$$ : $_base$$4$$.$util$ = {};
  $font_global$$3$$ = ($_ref2$$1$$ = ($_base2$$1$$ = $font_global$$3$$.$jaap$).font) != $JSCompiler_alias_NULL$$ ? $_ref2$$1$$ : $_base2$$1$$.font = {};
  top === window && ($iced$$3_util$$1$$.$onKeyUp$("B", function() {
    var $elem$$2$$;
    if($elem$$2$$ = document.querySelector("#baseline-checkbox")) {
      return $elem$$2$$.checked = !$elem$$2$$.checked
    }
  }), $iced$$3_util$$1$$.$onKeyUp$("T", $font_global$$3$$.$getMetrics$))
}).call(void 0, window, function() {
  window.$jaap$ == $JSCompiler_alias_NULL$$ && (window.$jaap$ = {});
  return window.$jaap$
}());

