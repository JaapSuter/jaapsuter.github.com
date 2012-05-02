'use strict';var $JSCompiler_alias_VOID$$ = void 0, $JSCompiler_alias_TRUE$$ = !0, $JSCompiler_alias_NULL$$ = null, $JSCompiler_alias_FALSE$$ = !1;
(function($global$$) {
  var $iced$$1$$, $__slice$$ = [].slice;
  $iced$$1$$ = {$Deferrals$:function() {
    function $_Class$$($_arg$$) {
      this.$continuation$ = $_arg$$;
      this.count = 1;
      this.$ret$ = $JSCompiler_alias_NULL$$
    }
    $_Class$$.prototype.$_fulfill$ = function $$_Class$$$$$_fulfill$$() {
      if(!--this.count) {
        return this.$continuation$(this.$ret$)
      }
    };
    $_Class$$.prototype.defer = function $$_Class$$$$defer$($defer_params$$) {
      var $_this$$ = this;
      ++this.count;
      return function() {
        var $inner_params$$, $_ref$$;
        $inner_params$$ = 1 <= arguments.length ? $__slice$$.call(arguments, 0) : [];
        $defer_params$$ != $JSCompiler_alias_NULL$$ && ($_ref$$ = $defer_params$$.$assign_fn$) != $JSCompiler_alias_NULL$$ && $_ref$$.apply($JSCompiler_alias_NULL$$, $inner_params$$);
        return $_this$$.$_fulfill$()
      }
    };
    return $_Class$$
  }(), $findDeferral$:function $$iced$$1$$$$findDeferral$$() {
    return $JSCompiler_alias_NULL$$
  }};
  $global$$.$iced$ = $iced$$1$$;
  $global$$.$jaap$ = {$util$:{}, $dom$:{}, font:{}, keys:{}, $ajax$:{}}
}).call($JSCompiler_alias_VOID$$, window, function() {
  window.$modules$ == $JSCompiler_alias_NULL$$ && (window.$modules$ = {});
  return window.$modules$
}());
(function($global$$1$$, $exports$$1$$) {
  var $create$$, $factories$$;
  $global$$1$$.$iced$ != $JSCompiler_alias_NULL$$ || ($global$$1$$.$iced$ = {});
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
    $xhr$$ = $JSCompiler_alias_FALSE$$;
    $_i$$ = 0;
    for($_len$$ = $factories$$.length;$_i$$ < $_len$$;$_i$$++) {
      $f$$ = $factories$$[$_i$$];
      try {
        $xhr$$ = $f$$()
      }catch($e$$8$$) {
        continue
      }
      return $xhr$$
    }
  };
  $exports$$1$$.send = function $$exports$$1$$$send$($url$$21$$, $cb$$, $postData$$) {
    var $xhr$$1$$;
    if($xhr$$1$$ = $create$$()) {
      if($xhr$$1$$.open($postData$$ ? "PUT" : "GET", $url$$21$$, $JSCompiler_alias_TRUE$$), $postData$$ && $xhr$$1$$.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), $xhr$$1$$.onreadystatechange = function $$xhr$$1$$$onreadystatechange$() {
        if(4 === $xhr$$1$$.readyState) {
          return 200 === $xhr$$1$$.status || 304 === $xhr$$1$$.status ? $cb$$($JSCompiler_alias_TRUE$$, $xhr$$1$$.responseText) : $cb$$($JSCompiler_alias_FALSE$$)
        }
      }, 4 !== $xhr$$1$$.readyState) {
        return $xhr$$1$$.send($postData$$)
      }
    }else {
      return $cb$$($JSCompiler_alias_FALSE$$)
    }
  }
}).call($JSCompiler_alias_VOID$$, window, function() {
  var $_base$$;
  window.$jaap$ == $JSCompiler_alias_NULL$$ && (window.$jaap$ = {});
  if(($_base$$ = window.$jaap$).$ajax$ == $JSCompiler_alias_NULL$$) {
    $_base$$.$ajax$ = {}
  }
  return window.$jaap$.$ajax$
}());
(function($global$$2$$, $exports$$2$$) {
  function $__bind$$($fn$$, $me$$) {
    return function() {
      return $fn$$.apply($me$$, arguments)
    }
  }
  var $Easel$$, $ajax$$, $dom$$, $fallbacks$$, $getFontStyle$$, $getFontWeight$$, $getTextFromElementStrict$$, $iced$$3$$, $util$$, $whenFontLoaded$$, $__iced_k_noop$$, $_ref$$2$$, $__indexOf$$ = [].indexOf || function($item$$) {
    for(var $i$$1$$ = 0, $l$$ = this.length;$i$$1$$ < $l$$;$i$$1$$++) {
      if($i$$1$$ in this && this[$i$$1$$] === $item$$) {
        return $i$$1$$
      }
    }
    return-1
  }, $__hasProp$$ = {}.hasOwnProperty;
  $__iced_k_noop$$ = function $$__iced_k_noop$$$() {
  };
  $iced$$3$$ = $global$$2$$.$iced$;
  $_ref$$2$$ = $global$$2$$.$jaap$;
  $util$$ = $_ref$$2$$.$util$;
  $ajax$$ = $_ref$$2$$.$ajax$;
  $dom$$ = $_ref$$2$$.$dom$;
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
    function $Easel$$1$$($_arg$$1__ref2$$) {
      this.$minFontSize$ = $_arg$$1__ref2$$.$minFontSize$;
      this.$maxFontSize$ = $_arg$$1__ref2$$.$maxFontSize$;
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
      $_arg$$1__ref2$$ = $dom$$.create("div", '<img style="vertical-align: baseline" width="1" height="1" alt="" src="/img/1x1-black.png">bHxp');
      this.$div$ = $_arg$$1__ref2$$[0];
      this.$img$ = $_arg$$1__ref2$$[1][0];
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
      var $_ref2$$1__ref3$$1_w$$4$$, $x$$48$$;
      this.$ctx1$.drawImage(this.$cnv0$, 0, 0);
      $x$$48$$ = $firstPowerOfTwoLessThan$$(this.fontSize);
      for($_ref2$$1__ref3$$1_w$$4$$ = this.fontSize - $x$$48$$;$x$$48$$;) {
        this.$ctx1$.drawImage(this.$cnv0$, $x$$48$$, 0, $_ref2$$1__ref3$$1_w$$4$$, this.$baseline$, 0, 0, $_ref2$$1__ref3$$1_w$$4$$, this.$baseline$), $_ref2$$1__ref3$$1_w$$4$$ = [this.$ctx1$, this.$ctx0$], this.$ctx0$ = $_ref2$$1__ref3$$1_w$$4$$[0], this.$ctx1$ = $_ref2$$1__ref3$$1_w$$4$$[1], $_ref2$$1__ref3$$1_w$$4$$ = [this.$cnv1$, this.$cnv0$], this.$cnv0$ = $_ref2$$1__ref3$$1_w$$4$$[0], this.$cnv1$ = $_ref2$$1__ref3$$1_w$$4$$[1], $_ref2$$1__ref3$$1_w$$4$$ = $x$$48$$ >>= 1
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
      $upsideDown$$1$$ == $JSCompiler_alias_NULL$$ && ($upsideDown$$1$$ = $JSCompiler_alias_FALSE$$);
      this.$drawGlyph$($glyph$$1$$, $upsideDown$$1$$);
      this.$horizontalSplat$();
      return this.$getFirstVerticalPixel$()
    };
    $Easel$$1$$.prototype.$getGlyphMetrics$ = function $$Easel$$1$$$$$getGlyphMetrics$$() {
      this.fontSize < this.$minFontSize$ || this.$baseline$ < this.$minBaseline$ ? this.$ascent$ = this.$cap$ = this.$ex$ = this.$descent$ = 0 : (this.$ascent$ = this.$baseline$ - this.$getGlyphMetric$("b"), this.$ex$ = this.$baseline$ - this.$getGlyphMetric$("x"), this.$cap$ = this.$baseline$ - this.$getGlyphMetric$("H"), this.$descent$ = this.$baseline$ - this.$getGlyphMetric$("p", $JSCompiler_alias_TRUE$$))
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
      $metrics$$.ascent[this.fontSize] = this.$ascent$;
      $metrics$$.cap[this.fontSize] = this.$cap$;
      $metrics$$.ex[this.fontSize] = this.$ex$;
      $metrics$$.descent[this.fontSize] = this.$descent$;
      $util$$.$soon$($cont$$)
    };
    $Easel$$1$$.prototype.$getFamilyMetrics$ = function $$Easel$$1$$$$$getFamilyMetrics$$($family$$3$$, $cont$$1$$) {
      var $metrics$$1$$, $size$$9$$, $__iced_deferrals$$, $_this$$2$$ = this;
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
          if($size$$9$$ <= $_this$$2$$.$maxFontSize$) {
            $__iced_deferrals$$ = new $iced$$3$$.$Deferrals$($_next$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee", $funcname$:"Easel.getFamilyMetrics"}), $_this$$2$$.$getSizedFamilyMetrics$($size$$9$$, $family$$3$$, $metrics$$1$$, $__iced_deferrals$$.defer({$lineno$:143})), $__iced_deferrals$$.$_fulfill$()
          }else {
            return $_break$$()
          }
        };
        $_while$$($__iced_k$$1$$)
      })(function() {
        return $cont$$1$$($JSCompiler_alias_TRUE$$, $metrics$$1$$)
      })
    };
    $Easel$$1$$.prototype.$getMetrics$ = function $$Easel$$1$$$$$getMetrics$$($families$$, $cont$$2$$) {
      var $fam$$, $family$$4$$, $met$$, $metrics$$2$$, $ok$$, $__iced_deferrals$$1$$, $_this$$3$$ = this;
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
              $__iced_deferrals$$1$$ = new $iced$$3$$.$Deferrals$($__iced_k$$7$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee", $funcname$:"Easel.getMetrics"});
              $whenFontLoaded$$($family$$4$$, $__iced_deferrals$$1$$.defer({$assign_fn$:function() {
                return function($JSCompiler_OptimizeArgumentsArray_p0$$, $JSCompiler_OptimizeArgumentsArray_p1$$) {
                  $ok$$ = $JSCompiler_OptimizeArgumentsArray_p0$$;
                  return $fam$$ = $JSCompiler_OptimizeArgumentsArray_p1$$
                }
              }(), $lineno$:155}));
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
                    $__iced_deferrals$$1$$ = new $iced$$3$$.$Deferrals$($__iced_k$$11$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee", $funcname$:"Easel.getMetrics"});
                    $whenFontLoaded$$($family$$4$$, $__iced_deferrals$$1$$.defer({$assign_fn$:function() {
                      return function($JSCompiler_OptimizeArgumentsArray_p2$$, $JSCompiler_OptimizeArgumentsArray_p3$$) {
                        $ok$$ = $JSCompiler_OptimizeArgumentsArray_p2$$;
                        return $fam$$ = $JSCompiler_OptimizeArgumentsArray_p3$$
                      }
                    }(), $lineno$:159}));
                    $__iced_deferrals$$1$$.$_fulfill$()
                  }(function() {
                    (function($__iced_k$$12$$) {
                      if($ok$$) {
                        (function($__iced_k$$13$$) {
                          $__iced_deferrals$$1$$ = new $iced$$3$$.$Deferrals$($__iced_k$$13$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee", $funcname$:"Easel.getMetrics"});
                          $_this$$3$$.$getFamilyMetrics$($fam$$, $__iced_deferrals$$1$$.defer({$assign_fn$:function() {
                            return function($JSCompiler_OptimizeArgumentsArray_p4$$, $JSCompiler_OptimizeArgumentsArray_p5$$) {
                              $ok$$ = $JSCompiler_OptimizeArgumentsArray_p4$$;
                              return $met$$ = $JSCompiler_OptimizeArgumentsArray_p5$$
                            }
                          }(), $lineno$:161}));
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
              return $__iced_k$$8$$($_this$$3$$.$div$.parentNode.removeChild($_this$$3$$.$div$))
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
  $exports$$2$$.$whenFontLoaded$ = $whenFontLoaded$$ = function $$whenFontLoaded$$$($family$$5$$, $cont$$3$$) {
    var $attempts$$, $complete$$, $div$$, $fallback$$, $loaded$$, $repeats_until_valid$$, $testFontLoaded$$, $_ref2$$4__ref3$$2$$;
    $_ref2$$4__ref3$$2$$ = $dom$$.create("div", "<span>b H x p</span><br><span>b H x p</span>");
    $div$$ = $_ref2$$4__ref3$$2$$[0];
    $_ref2$$4__ref3$$2$$ = $_ref2$$4__ref3$$2$$[1];
    $fallback$$ = $_ref2$$4__ref3$$2$$[0];
    $loaded$$ = $_ref2$$4__ref3$$2$$[2];
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
      return $fallback$$.offsetWidth !== $loaded$$.offsetWidth ? 0 === $repeats_until_valid$$-- ? $complete$$($JSCompiler_alias_TRUE$$, $family$$5$$) : $util$$.$soon$($testFontLoaded$$) : 0 === $attempts$$-- ? $complete$$($JSCompiler_alias_FALSE$$, $family$$5$$) : $util$$.$delay$(40, $testFontLoaded$$)
    };
    return $testFontLoaded$$()
  };
  $exports$$2$$.$getMetrics$ = function $$exports$$2$$$$getMetrics$$($families$$1$$) {
    var $data$$20$$, $easel$$, $family$$7$$, $metrics$$3$$, $ok$$2$$, $resp$$, $__iced_deferrals$$2$$, $families$$1$$ = "tan2n,tan4c,tan4n,tan7n,tao4n,tmn4n,tsi4n,tsi4n-smcp,tsi4n-tnum-lnum,tsi7n,tsn4n,tsn4n-smcp,tsn4n-tnum-lnum,tsn7n,pan2n,pan4n,pan4n-smcp,pan7n,pan7n-smcp,psi4n,psi7n,psn4n,psn7n".split(","), $families$$1$$ = $fallbacks$$.concat($families$$1$$), $families$$1$$ = function() {
      var $_i$$4$$, $_len$$3$$, $_results$$3$$;
      $_results$$3$$ = [];
      $_i$$4$$ = 0;
      for($_len$$3$$ = $families$$1$$.length;$_i$$4$$ < $_len$$3$$;$_i$$4$$++) {
        $family$$7$$ = $families$$1$$[$_i$$4$$], 0 > $family$$7$$.indexOf("inv") && $_results$$3$$.push($family$$7$$)
      }
      return $_results$$3$$
    }();
    $easel$$ = new $Easel$$({$minFontSize$:8, $maxFontSize$:213});
    (function($__iced_k$$15$$) {
      $__iced_deferrals$$2$$ = new $iced$$3$$.$Deferrals$($__iced_k$$15$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee", $funcname$:"getMetrics"});
      $easel$$.$getMetrics$($families$$1$$, $__iced_deferrals$$2$$.defer({$assign_fn$:function() {
        return function($JSCompiler_OptimizeArgumentsArray_p6$$, $JSCompiler_OptimizeArgumentsArray_p7$$) {
          $ok$$2$$ = $JSCompiler_OptimizeArgumentsArray_p6$$;
          return $metrics$$3$$ = $JSCompiler_OptimizeArgumentsArray_p7$$
        }
      }(), $lineno$:244}));
      $__iced_deferrals$$2$$.$_fulfill$()
    })(function() {
      if($ok$$2$$) {
        $data$$20$$ = JSON.stringify({payload:$metrics$$3$$, browser:"unknown"}, $JSCompiler_alias_NULL$$, 2), function($__iced_k$$16$$) {
          $__iced_deferrals$$2$$ = new $iced$$3$$.$Deferrals$($__iced_k$$16$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee", $funcname$:"getMetrics"});
          $ajax$$.send("/ajax/json/type-metrics", $__iced_deferrals$$2$$.defer({$assign_fn$:function() {
            return function($JSCompiler_OptimizeArgumentsArray_p8$$, $JSCompiler_OptimizeArgumentsArray_p9$$) {
              $ok$$2$$ = $JSCompiler_OptimizeArgumentsArray_p8$$;
              return $resp$$ = $JSCompiler_OptimizeArgumentsArray_p9$$
            }
          }(), $lineno$:247}), $data$$20$$);
          $__iced_deferrals$$2$$.$_fulfill$()
        }(function() {
          return $__iced_k_noop$$(alert("ok: " + $ok$$2$$ + ", resp: " + $resp$$))
        })
      }else {
        return $__iced_k_noop$$()
      }
    })
  };
  $getTextFromElementStrict$$ = function $$getTextFromElementStrict$$$($childNode_el$$1$$) {
    var $_i$$inline_3$$, $_len$$inline_4$$, $_ref2$$inline_5$$, $_results$$inline_6$$;
    $_ref2$$inline_5$$ = $childNode_el$$1$$.childNodes;
    $_results$$inline_6$$ = [];
    $_i$$inline_3$$ = 0;
    for($_len$$inline_4$$ = $_ref2$$inline_5$$.length;$_i$$inline_3$$ < $_len$$inline_4$$;$_i$$inline_3$$++) {
      $childNode_el$$1$$ = $_ref2$$inline_5$$[$_i$$inline_3$$], 3 === $childNode_el$$1$$.nodeType && $_results$$inline_6$$.push($childNode_el$$1$$.nodeValue)
    }
    return $_results$$inline_6$$.join("")
  };
  $exports$$2$$.$getSubsets$ = function $$exports$$2$$$$getSubsets$$() {
    var $getFontFamilyTextForGeneratedContent$$, $textPerFontFamily$$;
    $textPerFontFamily$$ = {};
    $getFontFamilyTextForGeneratedContent$$ = function $$getFontFamilyTextForGeneratedContent$$$($el$$2$$, $pseudo$$) {
      var $fontFamily$$, $style$$;
      $style$$ = window.getComputedStyle($el$$2$$, $pseudo$$);
      $fontFamily$$ = $style$$.fontFamily.split(",")[0];
      return $textPerFontFamily$$[$fontFamily$$] += $style$$.content
    };
    return $dom$$.$crawl$(function($doc_el$$3$$) {
      var $fontFamily$$1_style$$1$$, $_i$$6$$, $_len$$5$$, $_ref2$$6$$, $_results$$5$$;
      console.log("Crawling: " + $doc_el$$3$$.location.href + " for font subsets.");
      $_ref2$$6$$ = [$doc_el$$3$$.body].concat(Array.prototype.slice.call($doc_el$$3$$.querySelectorAll("body *")));
      $_results$$5$$ = [];
      $_i$$6$$ = 0;
      for($_len$$5$$ = $_ref2$$6$$.length;$_i$$6$$ < $_len$$5$$;$_i$$6$$++) {
        $doc_el$$3$$ = $_ref2$$6$$[$_i$$6$$], $fontFamily$$1_style$$1$$ = window.getComputedStyle($doc_el$$3$$, $JSCompiler_alias_NULL$$), $fontFamily$$1_style$$1$$ = $fontFamily$$1_style$$1$$.fontFamily.split(",")[0], $textPerFontFamily$$[$fontFamily$$1_style$$1$$] == $JSCompiler_alias_NULL$$ && ($textPerFontFamily$$[$fontFamily$$1_style$$1$$] = ""), $textPerFontFamily$$[$fontFamily$$1_style$$1$$] += $getTextFromElementStrict$$($doc_el$$3$$), $getFontFamilyTextForGeneratedContent$$($doc_el$$3$$, 
        ":before"), $_results$$5$$.push($getFontFamilyTextForGeneratedContent$$($doc_el$$3$$, ":after"))
      }
      return $_results$$5$$
    }, function() {
      var $char$$, $data$$21$$, $fontFamily$$2$$, $ok$$3$$, $resp$$1$$, $text$$6$$, $__iced_deferrals$$3$$;
      for($fontFamily$$2$$ in $textPerFontFamily$$) {
        $__hasProp$$.call($textPerFontFamily$$, $fontFamily$$2$$) && ($text$$6$$ = $textPerFontFamily$$[$fontFamily$$2$$], $text$$6$$ = $util$$.unique($text$$6$$).sort().join("").replace("\n", ""), $textPerFontFamily$$[$fontFamily$$2$$] = {$characters$:$text$$6$$, $unicodes$:function() {
          var $_i$$7$$, $_len$$6$$, $_results$$6$$;
          $_results$$6$$ = [];
          $_i$$7$$ = 0;
          for($_len$$6$$ = $text$$6$$.length;$_i$$7$$ < $_len$$6$$;$_i$$7$$++) {
            $char$$ = $text$$6$$[$_i$$7$$], $_results$$6$$.push($char$$.charCodeAt())
          }
          return $_results$$6$$
        }()})
      }
      $data$$21$$ = JSON.stringify({payload:$textPerFontFamily$$, browser:"unknown"}, $JSCompiler_alias_NULL$$, 2);
      (function($__iced_k$$18$$) {
        $__iced_deferrals$$3$$ = new $iced$$3$$.$Deferrals$($__iced_k$$18$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/dev/_coffee/jaap/font.coffee"});
        $ajax$$.send("/ajax/json/type-subsets", $__iced_deferrals$$3$$.defer({$assign_fn$:function() {
          return function($JSCompiler_OptimizeArgumentsArray_p10$$, $JSCompiler_OptimizeArgumentsArray_p11$$) {
            $ok$$3$$ = $JSCompiler_OptimizeArgumentsArray_p10$$;
            return $resp$$1$$ = $JSCompiler_OptimizeArgumentsArray_p11$$
          }
        }(), $lineno$:282}), $data$$21$$);
        $__iced_deferrals$$3$$.$_fulfill$()
      })(function() {
        return alert("ok: " + $ok$$3$$ + ", resp: " + $resp$$1$$)
      })
    })
  }
}).call($JSCompiler_alias_VOID$$, window, function() {
  var $_base$$1$$;
  window.$jaap$ == $JSCompiler_alias_NULL$$ && (window.$jaap$ = {});
  if(($_base$$1$$ = window.$jaap$).font == $JSCompiler_alias_NULL$$) {
    $_base$$1$$.font = {}
  }
  return window.$jaap$.font
}());
(function($global$$3$$, $exports$$3$$) {
  $exports$$3$$.time = function $$exports$$3$$$time$($fun$$5$$) {
    var $start$$5$$;
    $start$$5$$ = new Date;
    $fun$$5$$();
    return new Date - $start$$5$$
  };
  $exports$$3$$.$isNumber$ = function $$exports$$3$$$$isNumber$$($obj$$16$$) {
    return $obj$$16$$ === +$obj$$16$$ || "[object Number]" === Object.prototype.toString.call($obj$$16$$)
  };
  $exports$$3$$.$isUndefined$ = function $$exports$$3$$$$isUndefined$$($obj$$17$$) {
    return"undefined" === typeof $obj$$17$$
  };
  $exports$$3$$.$delay$ = function $$exports$$3$$$$delay$$($wait$$, $func$$3$$) {
    var $args$$;
    $args$$ = this.$tail$(arguments, 2);
    return setTimeout(function() {
      return $func$$3$$.apply($func$$3$$, $args$$)
    }, $wait$$)
  };
  $exports$$3$$.$soon$ = function $$exports$$3$$$$soon$$($func$$4$$) {
    return this.$delay$.apply(this, [1, $func$$4$$].concat(this.$tail$(arguments)))
  };
  $exports$$3$$.$tail$ = function $$exports$$3$$$$tail$$($array$$9$$, $index$$51$$) {
    return Array.prototype.slice.call($array$$9$$, this.$isUndefined$($index$$51$$) ? 1 : $index$$51$$)
  };
  $exports$$3$$.unique = function $$exports$$3$$$unique$($arr$$10_value$$41$$) {
    var $key$$13$$, $output$$, $_i$$8__results$$7$$, $_ref$$3$$;
    $output$$ = {};
    $key$$13$$ = $_i$$8__results$$7$$ = 0;
    for($_ref$$3$$ = $arr$$10_value$$41$$.length;0 <= $_ref$$3$$ ? $_i$$8__results$$7$$ < $_ref$$3$$ : $_i$$8__results$$7$$ > $_ref$$3$$;$key$$13$$ = 0 <= $_ref$$3$$ ? ++$_i$$8__results$$7$$ : --$_i$$8__results$$7$$) {
      $output$$[$arr$$10_value$$41$$[$key$$13$$]] = $arr$$10_value$$41$$[$key$$13$$]
    }
    $_i$$8__results$$7$$ = [];
    for($key$$13$$ in $output$$) {
      $arr$$10_value$$41$$ = $output$$[$key$$13$$], $_i$$8__results$$7$$.push($arr$$10_value$$41$$)
    }
    return $_i$$8__results$$7$$
  }
}).call($JSCompiler_alias_VOID$$, window, function() {
  var $_base$$2$$;
  window.$jaap$ == $JSCompiler_alias_NULL$$ && (window.$jaap$ = {});
  if(($_base$$2$$ = window.$jaap$).$util$ == $JSCompiler_alias_NULL$$) {
    $_base$$2$$.$util$ = {}
  }
  return window.$jaap$.$util$
}());
(function($global$$4$$, $exports$$4$$) {
  var $addEvent$$, $assignKey$$, $k$$, $_MAP$$, $_MODIFIERS$$, $_handlers$$, $_i$$9$$, $_mods$$, $__hasProp$$1$$ = {}.hasOwnProperty, $__indexOf$$1$$ = [].indexOf || function($item$$1$$) {
    for(var $i$$2$$ = 0, $l$$1$$ = this.length;$i$$2$$ < $l$$1$$;$i$$2$$++) {
      if($i$$2$$ in this && this[$i$$2$$] === $item$$1$$) {
        return $i$$2$$
      }
    }
    return-1
  };
  $assignKey$$ = function $$assignKey$$$($key$$16$$, $method$$3$$) {
    var $i$$4$$, $keys$$, $mi$$, $mods$$, $_results$$9$$, $key$$16$$ = $key$$16$$.replace(/\s/g, "");
    $keys$$ = $key$$16$$.split(",");
    "" === $keys$$[$keys$$.length - 1] && ($keys$$[$keys$$.length - 2] += ",");
    $i$$4$$ = 0;
    for($_results$$9$$ = [];$i$$4$$ < $keys$$.length;) {
      $mods$$ = [];
      $key$$16$$ = $keys$$[$i$$4$$].split("+");
      if(1 < $key$$16$$.length) {
        $mods$$ = $key$$16$$.slice(0, $key$$16$$.length - 1);
        for($mi$$ = 0;$mi$$ < $mods$$.length;) {
          $mods$$[$mi$$] = $_MODIFIERS$$[$mods$$[$mi$$]], $mi$$++
        }
        $key$$16$$ = [$key$$16$$[$key$$16$$.length - 1]]
      }
      $key$$16$$ = $key$$16$$[0];
      $key$$16$$ = $_MAP$$[$key$$16$$] || $key$$16$$.toUpperCase().charCodeAt(0);
      $key$$16$$ in $_handlers$$ || ($_handlers$$[$key$$16$$] = []);
      $_handlers$$[$key$$16$$].push({$shortcut$:$keys$$[$i$$4$$], method:$method$$3$$, key:$keys$$[$i$$4$$], $mods$:$mods$$});
      $_results$$9$$.push($i$$4$$++)
    }
    return $_results$$9$$
  };
  $assignKey$$.filter = function $$assignKey$$$filter$($event$$5_tagName$$1$$) {
    $event$$5_tagName$$1$$ = ($event$$5_tagName$$1$$.target || $event$$5_tagName$$1$$.srcElement).tagName;
    return!("INPUT" === $event$$5_tagName$$1$$ || "SELECT" === $event$$5_tagName$$1$$ || "TEXTAREA" === $event$$5_tagName$$1$$)
  };
  $addEvent$$ = function $$addEvent$$$($object$$, $event$$6$$, $method$$4$$) {
    $object$$.addEventListener ? $object$$.addEventListener($event$$6$$, $method$$4$$, $JSCompiler_alias_FALSE$$) : $object$$.attachEvent && $object$$.attachEvent("on" + $event$$6$$, function() {
      return $method$$4$$(window.event)
    })
  };
  $_handlers$$ = {};
  $_mods$$ = {16:$JSCompiler_alias_FALSE$$, 18:$JSCompiler_alias_FALSE$$, 17:$JSCompiler_alias_FALSE$$, 91:$JSCompiler_alias_FALSE$$};
  $_MODIFIERS$$ = {shift:16, alt:18, $option$:18, $ctrl$:17, $command$:91};
  for($k$$ = $_i$$9$$ = 1;20 > $_i$$9$$;$k$$ = ++$_i$$9$$) {
    $_MODIFIERS$$["f" + $k$$] = 111 + $k$$
  }
  $_MAP$$ = {$backspace$:8, $tab$:9, clear:12, $enter$:13, "return":13, $esc$:27, escape:27, $space$:32, left:37, $up$:38, right:39, $down$:40, $del$:46, "delete":46, home:36, end:35, $pageup$:33, $pagedown$:34, ",":188, ".":190, "/":191, "`":192, "-":189, "=":187, ";":186, "'":222, "[":219, "]":221, "\\":220};
  for($k$$ in $_MODIFIERS$$) {
    $__hasProp$$1$$.call($_MODIFIERS$$, $k$$) && ($assignKey$$[$k$$] = $JSCompiler_alias_FALSE$$)
  }
  $addEvent$$(document, "keydown", function($event$$3$$) {
    var $handler$$3$$, $i$$3$$, $k$$1$$, $key$$14$$, $modifiersMatch$$, $_ref$$4$$, $_results$$8$$;
    $key$$14$$ = $event$$3$$.keyCode;
    if(93 === $key$$14$$ || 224 === $key$$14$$) {
      $key$$14$$ = 91
    }
    if($key$$14$$ in $_mods$$) {
      for($k$$1$$ in $_mods$$[$key$$14$$] = $JSCompiler_alias_TRUE$$, $_MODIFIERS$$) {
        $_MODIFIERS$$[$k$$1$$] === $key$$14$$ && ($assignKey$$[$k$$1$$] = $JSCompiler_alias_TRUE$$)
      }
    }else {
      if($assignKey$$.filter.call(this, $event$$3$$) && $key$$14$$ in $_handlers$$) {
        $i$$3$$ = 0;
        for($_results$$8$$ = [];$i$$3$$ < $_handlers$$[$key$$14$$].length;) {
          $handler$$3$$ = $_handlers$$[$key$$14$$][$i$$3$$];
          $modifiersMatch$$ = 0 < $handler$$3$$.$mods$.length;
          for($k$$1$$ in $_mods$$) {
            if($__hasProp$$1$$.call($_mods$$, $k$$1$$) && (!$_mods$$[$k$$1$$] && 0 <= $__indexOf$$1$$.call($handler$$3$$.$mods$, +$k$$1$$) || $_mods$$[$k$$1$$] && ($_ref$$4$$ = !+$k$$1$$, 0 <= $__indexOf$$1$$.call($handler$$3$$.$mods$, $_ref$$4$$)))) {
              $modifiersMatch$$ = $JSCompiler_alias_FALSE$$
            }
          }
          if((0 === $handler$$3$$.$mods$.length && !$_mods$$[16] && !$_mods$$[18] && !$_mods$$[17] && !$_mods$$[91] || $modifiersMatch$$) && $handler$$3$$.method($event$$3$$, $handler$$3$$) === $JSCompiler_alias_FALSE$$) {
            $event$$3$$.preventDefault ? $event$$3$$.preventDefault() : $event$$3$$.returnValue = $JSCompiler_alias_FALSE$$, $event$$3$$.stopPropagation && $event$$3$$.stopPropagation(), $event$$3$$.cancelBubble && ($event$$3$$.cancelBubble = $JSCompiler_alias_TRUE$$)
          }
          $_results$$8$$.push($i$$3$$++)
        }
        return $_results$$8$$
      }
    }
  });
  $addEvent$$(document, "keyup", function($event$$4_key$$15$$) {
    var $k$$2$$, $event$$4_key$$15$$ = $event$$4_key$$15$$.keyCode;
    if(93 === $event$$4_key$$15$$ || 224 === $event$$4_key$$15$$) {
      $event$$4_key$$15$$ = 91
    }
    if($event$$4_key$$15$$ in $_mods$$) {
      for($k$$2$$ in $_mods$$[$event$$4_key$$15$$] = $JSCompiler_alias_FALSE$$, $_MODIFIERS$$) {
        $_MODIFIERS$$[$k$$2$$] === $event$$4_key$$15$$ && ($assignKey$$[$k$$2$$] = $JSCompiler_alias_FALSE$$)
      }
    }
  });
  $addEvent$$(window, "focus", function() {
    for(var $k$$3$$ in $_mods$$) {
      $_mods$$[$k$$3$$] = $JSCompiler_alias_FALSE$$
    }
    for($k$$3$$ in $_MODIFIERS$$) {
      $assignKey$$[$k$$3$$] = $JSCompiler_alias_FALSE$$
    }
  });
  $exports$$4$$.$on$ = $assignKey$$
}).call($JSCompiler_alias_VOID$$, window, function() {
  var $_base$$3$$;
  window.$jaap$ == $JSCompiler_alias_NULL$$ && (window.$jaap$ = {});
  if(($_base$$3$$ = window.$jaap$).keys == $JSCompiler_alias_NULL$$) {
    $_base$$3$$.keys = {}
  }
  return window.$jaap$.keys
}());
(function($global$$5$$, $exports$$5$$) {
  var $gatherCss$$, $specificity$$, $_crawl$$, $__indexOf$$2$$ = [].indexOf || function($item$$2$$) {
    for(var $i$$5$$ = 0, $l$$2$$ = this.length;$i$$5$$ < $l$$2$$;$i$$5$$++) {
      if($i$$5$$ in this && this[$i$$5$$] === $item$$2$$) {
        return $i$$5$$
      }
    }
    return-1
  }, $__hasProp$$2$$ = {}.hasOwnProperty, $__slice$$1$$ = [].slice;
  $exports$$5$$.create = function $$exports$$5$$$create$($tag$$, $innerHTML$$) {
    var $elem$$1$$;
    $elem$$1$$ = document.createElement($tag$$);
    $elem$$1$$.innerHTML = $innerHTML$$;
    return[$elem$$1$$, $elem$$1$$.children]
  };
  $exports$$5$$.$toggleClass$ = function $$exports$$5$$$$toggleClass$$() {
    var $e$$9$$ = document.body;
    return 0 <= $e$$9$$.className.indexOf("baseline") ? $e$$9$$.className = $e$$9$$.className.replace(/(?:^|\s)baseline(?!\S)/, "") : $e$$9$$.className += " baseline"
  };
  $exports$$5$$.$crawl$ = function $$exports$$5$$$$crawl$$($docFun$$, $doneFun$$) {
    return $_crawl$$($docFun$$, $doneFun$$, document, [document.location.href.replace(/#.*/, "")])
  };
  $_crawl$$ = function $$_crawl$$$($docFun$$1$$, $doneFun$$1$$, $a_doc$$1$$, $visited$$, $visits$$, $iframe$$) {
    var $href$$, $_i$$10$$, $_len$$7$$, $_ref$$5$$;
    $visits$$ == $JSCompiler_alias_NULL$$ && ($visits$$ = []);
    $iframe$$ == $JSCompiler_alias_NULL$$ && ($iframe$$ = $JSCompiler_alias_NULL$$);
    $docFun$$1$$($a_doc$$1$$);
    $iframe$$ || ($iframe$$ = document.createElement("iframe"), $iframe$$.className = "hidden", document.body.insertBefore($iframe$$, document.body.firstChild));
    $_ref$$5$$ = document.querySelectorAll("a");
    $_i$$10$$ = 0;
    for($_len$$7$$ = $_ref$$5$$.length;$_i$$10$$ < $_len$$7$$;$_i$$10$$++) {
      $a_doc$$1$$ = $_ref$$5$$[$_i$$10$$], $href$$ = $a_doc$$1$$.href.replace(/#.*/, ""), 0 <= $__indexOf$$2$$.call($visits$$, $href$$) || 0 <= $__indexOf$$2$$.call($visited$$, $href$$) || $href$$.match(/\.[^.]{0,5}/) || $a_doc$$1$$.host !== document.location.host || $visits$$.push($href$$)
    }
    if($visits$$.length) {
      return $href$$ = $visits$$.pop(), $visited$$.push($href$$), $iframe$$.onload = function $$iframe$$$onload$() {
        return $_crawl$$($docFun$$1$$, $doneFun$$1$$, $iframe$$.contentDocument, $visited$$, $visits$$, $iframe$$)
      }, $iframe$$.setAttribute("src", $href$$)
    }
    console.log("removing iframe");
    $iframe$$.parentNode.removeChild($iframe$$);
    return $doneFun$$1$$()
  };
  $exports$$5$$.$verifyCss$ = function $$exports$$5$$$$verifyCss$$() {
    var $className$$1_elem$$2_fullName$$, $css$$, $decl_val$$, $elementsWithoutStyling$$, $hasAtLeastOneStyledPropertyNotFromUniversal$$, $idName_matches$$, $matchesSelector$$, $prop$$4$$, $sel$$, $sels$$, $specificity$$1$$, $tagName$$2$$, $_i$$11$$, $_len$$8$$, $_ref$$6$$, $_ref2$$7$$;
    if($matchesSelector$$ = document.documentElement.matchesSelector || document.documentElement.webkitMatchesSelector || document.documentElement.mozMatchesSelector || document.documentElement.$oMatchesSelector$ || document.documentElement.msMatchesSelector) {
      $elementsWithoutStyling$$ = "head,title,link,meta,script,style,header,figure,figcaption,hgroup,nav,footer,summary,details,article,section,aside".split(",");
      $css$$ = $gatherCss$$.apply($JSCompiler_alias_NULL$$, document.styleSheets);
      $_ref$$6$$ = document.querySelectorAll("*");
      $_i$$11$$ = 0;
      for($_len$$8$$ = $_ref$$6$$.length;$_i$$11$$ < $_len$$8$$;$_i$$11$$++) {
        $className$$1_elem$$2_fullName$$ = $_ref$$6$$[$_i$$11$$];
        $tagName$$2$$ = $className$$1_elem$$2_fullName$$.nodeName.toLowerCase();
        $hasAtLeastOneStyledPropertyNotFromUniversal$$ = $JSCompiler_alias_FALSE$$;
        $_ref2$$7$$ = $css$$.$properties$;
        for($prop$$4$$ in $_ref2$$7$$) {
          if($__hasProp$$2$$.call($_ref2$$7$$, $prop$$4$$)) {
            for($sel$$ in $sels$$ = $_ref2$$7$$[$prop$$4$$], $idName_matches$$ = {}, $sels$$) {
              $__hasProp$$2$$.call($sels$$, $sel$$) && ($decl_val$$ = $sels$$[$sel$$], $matchesSelector$$.call($className$$1_elem$$2_fullName$$, $sel$$) && ($specificity$$1$$ = $css$$.$selectors$[$sel$$], $decl_val$$ = "" + $sel$$ + " { " + $prop$$4$$ + ": " + $decl_val$$ + "; }", $idName_matches$$[$specificity$$1$$] ? console.log("Error, element " + $tagName$$2$$ + " declares property " + $prop$$4$$ + " more than once at same specificity:\n  Before: " + $idName_matches$$[$specificity$$1$$] + "\n  Now:    " + 
              $decl_val$$) : ($hasAtLeastOneStyledPropertyNotFromUniversal$$ = "*" !== $sel$$, $idName_matches$$[$specificity$$1$$] = $decl_val$$)))
            }
          }
        }
        $idName_matches$$ = $className$$1_elem$$2_fullName$$.id ? "#" + $className$$1_elem$$2_fullName$$.id : "";
        $className$$1_elem$$2_fullName$$ = $className$$1_elem$$2_fullName$$.className ? "." + $className$$1_elem$$2_fullName$$.className.split(" ").join(".") : "";
        $className$$1_elem$$2_fullName$$ = "" + $tagName$$2$$ + $idName_matches$$ + $className$$1_elem$$2_fullName$$;
        $hasAtLeastOneStyledPropertyNotFromUniversal$$ ? 0 <= $__indexOf$$2$$.call($elementsWithoutStyling$$, $tagName$$2$$) && console.log("Error, '" + $className$$1_elem$$2_fullName$$ + "' has unexpected styling applied beyond the universal selector - likely an error.") : 0 > $__indexOf$$2$$.call($elementsWithoutStyling$$, $tagName$$2$$) && console.log("Error, '" + $className$$1_elem$$2_fullName$$ + "' only styling comes from the universal selector - likely an error.")
      }
      console.log("Done verifying CSS.")
    }
  };
  $gatherCss$$ = function $$gatherCss$$$() {
    var $css$$1$$, $property$$3_rule$$2$$, $_base$$4_selector$$, $selectors$$8_sheet$$, $sheets$$, $_k_style$$2$$, $_len3_value$$42$$, $_i$$12$$, $_j$$, $_l$$, $_len$$9$$, $_len2$$, $_len4$$, $_len5$$, $_m$$, $_ref$$7$$;
    $sheets$$ = 1 <= arguments.length ? $__slice$$1$$.call(arguments, 0) : [];
    $css$$1$$ = {$properties$:{}, $selectors$:{}, $values$:{}};
    $_i$$12$$ = 0;
    for($_len$$9$$ = $sheets$$.length;$_i$$12$$ < $_len$$9$$;$_i$$12$$++) {
      $selectors$$8_sheet$$ = $sheets$$[$_i$$12$$];
      $_ref$$7$$ = $selectors$$8_sheet$$.cssRules;
      $_j$$ = 0;
      for($_len2$$ = $_ref$$7$$.length;$_j$$ < $_len2$$;$_j$$++) {
        if($property$$3_rule$$2$$ = $_ref$$7$$[$_j$$], 1 === $property$$3_rule$$2$$.type) {
          $selectors$$8_sheet$$ = $property$$3_rule$$2$$.selectorText.split(",");
          $_k_style$$2$$ = 0;
          for($_len3_value$$42$$ = $selectors$$8_sheet$$.length;$_k_style$$2$$ < $_len3_value$$42$$;$_k_style$$2$$++) {
            $_base$$4_selector$$ = $selectors$$8_sheet$$[$_k_style$$2$$], $css$$1$$.$selectors$[$_base$$4_selector$$] = $specificity$$($_base$$4_selector$$)
          }
          $_k_style$$2$$ = $property$$3_rule$$2$$.style;
          $_l$$ = 0;
          for($_len4$$ = $_k_style$$2$$.length;$_l$$ < $_len4$$;$_l$$++) {
            $property$$3_rule$$2$$ = $_k_style$$2$$[$_l$$];
            $_len3_value$$42$$ = $_k_style$$2$$.getPropertyValue($property$$3_rule$$2$$);
            if(($_base$$4_selector$$ = $css$$1$$.$properties$)[$property$$3_rule$$2$$] == $JSCompiler_alias_NULL$$) {
              $_base$$4_selector$$[$property$$3_rule$$2$$] = {}
            }
            $_m$$ = 0;
            for($_len5$$ = $selectors$$8_sheet$$.length;$_m$$ < $_len5$$;$_m$$++) {
              $_base$$4_selector$$ = $selectors$$8_sheet$$[$_m$$], $css$$1$$.$properties$[$property$$3_rule$$2$$][$_base$$4_selector$$] && puts("Oddity: " + $css$$1$$.$properties$[$property$$3_rule$$2$$][$_base$$4_selector$$]), $css$$1$$.$properties$[$property$$3_rule$$2$$][$_base$$4_selector$$] = $_len3_value$$42$$
            }
          }
        }
      }
    }
    return $css$$1$$
  };
  $specificity$$ = function $$specificity$$$($elems_s$$2$$) {
    for(var $_ref$$8_classes$$, $ids$$, $_ref2$$8$$, $_ref3$$3$$, $elems_s$$2$$ = $elems_s$$2$$.replace("*", ""), $elems_s$$2$$ = $elems_s$$2$$.replace(/"[^"]*"/g, ""), $elems_s$$2$$ = $elems_s$$2$$.replace(/'[^"]*'/g, ""), $elems_s$$2$$ = $elems_s$$2$$.replace(/\[[^\]]*\]/g, "[]"), $elems_s$$2$$ = $elems_s$$2$$.replace(/[>+~]/g, " ");0 <= $elems_s$$2$$.indexOf("(");) {
      $elems_s$$2$$ = $elems_s$$2$$.replace(/\([^\)]*?\)/, "")
    }
    $elems_s$$2$$ = $elems_s$$2$$.replace(/:(first-child|last-child|link|visited|hover|active|focus|lang)/g, ".pseudo-class");
    $elems_s$$2$$ = $elems_s$$2$$.replace(/::?[\w-]+/g, " pseudo-elem");
    $ids$$ = (($_ref$$8_classes$$ = $elems_s$$2$$.match(/#[\w-]+/g)) != $JSCompiler_alias_NULL$$ ? $_ref$$8_classes$$.length : $JSCompiler_alias_VOID$$) || 0;
    $_ref$$8_classes$$ = (($_ref2$$8$$ = $elems_s$$2$$.match(/\.[\w-]+|\[\]/g)) != $JSCompiler_alias_NULL$$ ? $_ref2$$8$$.length : $JSCompiler_alias_VOID$$) || 0;
    $elems_s$$2$$ = (($_ref3$$3$$ = $elems_s$$2$$.match(/(^|\s)[\w_-]+/g)) != $JSCompiler_alias_NULL$$ ? $_ref3$$3$$.length : $JSCompiler_alias_VOID$$) || 0;
    return 1E6 * $ids$$ + 1E3 * $_ref$$8_classes$$ + $elems_s$$2$$
  }
}).call($JSCompiler_alias_VOID$$, window, function() {
  var $_base$$5$$;
  window.$jaap$ == $JSCompiler_alias_NULL$$ && (window.$jaap$ = {});
  if(($_base$$5$$ = window.$jaap$).$dom$ == $JSCompiler_alias_NULL$$) {
    $_base$$5$$.$dom$ = {}
  }
  return window.$jaap$.$dom$
}());
(function($_ref$$9_global$$6$$) {
  var $diagnose$$, $dom$$1$$, $font$$, $keys$$1$$, $toggleBaseline$$, $util$$1$$, $_ref$$9_global$$6$$ = $_ref$$9_global$$6$$.$jaap$;
  $util$$1$$ = $_ref$$9_global$$6$$.$util$;
  $dom$$1$$ = $_ref$$9_global$$6$$.$dom$;
  $keys$$1$$ = $_ref$$9_global$$6$$.keys;
  $font$$ = $_ref$$9_global$$6$$.font;
  $toggleBaseline$$ = function $$toggleBaseline$$$() {
    return $dom$$1$$.$toggleClass$()
  };
  $diagnose$$ = function $$diagnose$$$() {
    var $body$$1$$, $get$$, $ppgd$$;
    $body$$1$$ = document.body;
    $ppgd$$ = parseFloat(window.getComputedStyle($body$$1$$).lineHeight);
    $get$$ = function $$get$$$($name$$54$$) {
      var $elem$$3_height$$9$$, $ppem$$, $pplh_style$$3$$;
      $pplh_style$$3$$ = {fontSize:"0", lineHeight:"0"};
      ($elem$$3_height$$9$$ = document.querySelector($name$$54$$)) && ($pplh_style$$3$$ = window.getComputedStyle($elem$$3_height$$9$$));
      $ppem$$ = parseFloat($pplh_style$$3$$.fontSize);
      $pplh_style$$3$$ = parseFloat($pplh_style$$3$$.lineHeight);
      $elem$$3_height$$9$$ = $elem$$3_height$$9$$.getBoundingClientRect().height;
      return"" + $ppem$$ + "/" + $pplh_style$$3$$ + ("html" === $name$$54$$ || "body" === $name$$54$$ ? "" : " " + $elem$$3_height$$9$$ + " / " + $ppgd$$ + " = " + $elem$$3_height$$9$$ / $ppgd$$) + ": " + $name$$54$$ + "<br/>"
    };
    return document.querySelector("#dimensions").innerHTML = "" + $get$$("html") + "\n" + $get$$("body") + "\n" + $get$$("p") + "\n" + $get$$("h1") + "\n" + $get$$("h2") + "\n" + $get$$("h3") + "\n" + $get$$(".small") + "\nviewport: " + window.innerWidth + "\u00d7" + window.innerHeight + ", " + window.orientation + "<br/>\nbody:     " + $body$$1$$.offsetWidth + "\u00d7" + $body$$1$$.offsetWidth
  };
  (function() {
    var $repeated_diagnose$$;
    if(top === window) {
      return $keys$$1$$.$on$("b", $toggleBaseline$$), $keys$$1$$.$on$("shift+t", $font$$.$getMetrics$), $keys$$1$$.$on$("shift+s", $font$$.$getSubsets$), $keys$$1$$.$on$("shift+d", $diagnose$$), $keys$$1$$.$on$("shift+c", $dom$$1$$.$verifyCss$), $repeated_diagnose$$ = function $$repeated_diagnose$$$() {
        $diagnose$$();
        return $util$$1$$.$delay$(300, $repeated_diagnose$$)
      }
    }
  })()
}).call($JSCompiler_alias_VOID$$, window, function() {
  window.$jaap$ == $JSCompiler_alias_NULL$$ && (window.$jaap$ = {});
  return window.$jaap$
}());

