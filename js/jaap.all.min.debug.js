C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:5: WARNING - Suspicious code. This code lacks side-effects. Is there a bug?
  undefined;
  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:352: WARNING - dangerous use of the global this object
  this.whenFontLoaded = function(family, cont) {
  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:384: WARNING - dangerous use of the global this object
  this.getMetrics = function(families) {
  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:462: WARNING - dangerous use of the global this object
  this.send = function(url, cb, postData) {
  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:597: WARNING - dangerous use of the global this object
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
                                                                                                                                                   ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:623: WARNING - dangerous use of the global this object
  this.time = function(fun) {
  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:630: WARNING - dangerous use of the global this object
  this.isNumber = function(obj) {
  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:634: WARNING - dangerous use of the global this object
  this.isUndefined = function(obj) {
  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:638: WARNING - dangerous use of the global this object
  this.onKeyUp = function(key, fun) {
  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:647: WARNING - dangerous use of the global this object
  this.createElement = function(tag, innerHTML) {
  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:654: WARNING - dangerous use of the global this object
  this.delay = function(func, wait) {
  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:656: WARNING - dangerous use of the global this object
    args = this.tail(arguments, 2);
           ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:662: WARNING - dangerous use of the global this object
  this.soon = function(func) {
  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:663: WARNING - dangerous use of the global this object
    return this.delay.apply(this, [func, 1].concat(this.tail(arguments)));
           ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:663: WARNING - dangerous use of the global this object
    return this.delay.apply(this, [func, 1].concat(this.tail(arguments)));
                                                   ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:666: WARNING - dangerous use of the global this object
  this.tail = function(array, index) {
  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:667: WARNING - dangerous use of the global this object
    return Array.prototype.slice.call(array, this.isUndefined(index) ? 1 : index);
                                             ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:717: WARNING - dangerous use of the global this object
  this.entryPoint = function() {
  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:719: WARNING - dangerous use of the global this object
    this.util.onKeyUp('B', toggleBaseline);
    ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:720: WARNING - dangerous use of the global this object
    return this.util.onKeyUp('T', this.font.getMetrics);
           ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:720: WARNING - dangerous use of the global this object
    return this.util.onKeyUp('T', this.font.getMetrics);
                                  ^

C:\Users\Jaap\AppData\Local\Temp\closure_compiler20120218-2264-2u7oob:723: WARNING - dangerous use of the global this object
  this.entryPoint();
  ^

0 error(s), 22 warning(s)
'use strict';var $JSCompiler_alias_NULL$$ = null;
void 0;
var $Easel$$, $fallbacks$$, $getFontStyle$$, $getFontWeight$$, $namespace$$, $__indexOf$$ = [].indexOf || function($item$$) {
  for(var $i$$1$$ = 0, $l$$ = this.length;$i$$1$$ < $l$$;$i$$1$$++) {
    if($i$$1$$ in this && this[$i$$1$$] === $item$$) {
      return $i$$1$$
    }
  }
  return-1
};
function $__bind$$($fn$$, $me$$) {
  return function() {
    return $fn$$.apply($me$$, arguments)
  }
}
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
$namespace$$ = this;
$Easel$$ = function() {
  function $Easel$$1$$($_arg$$) {
    var $_ref$$, $_ref2$$;
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
    $_ref$$ = jaap.$util$.createElement("div", '<img style="vertical-align: baseline" width="1" height="1" alt="" src="/img/1x1-black.png">bHxp');
    this.$div$ = $_ref$$[0];
    $_ref2$$ = $_ref$$[1], this.$img$ = $_ref2$$[0];
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
  $Easel$$1$$.name = "Easel";
  $Easel$$1$$.prototype = function $$Easel$$1$$$$() {
  };
  $Easel$$1$$.prototype.prototype = $namespace$$;
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
    var $w$$4$$, $x$$48$$, $_ref$$1$$, $_ref2$$1$$;
    this.$ctx1$.drawImage(this.$cnv0$, 0, 0);
    $x$$48$$ = $firstPowerOfTwoLessThan$$(this.fontSize);
    for($w$$4$$ = this.fontSize - $x$$48$$;$x$$48$$;) {
      this.$ctx1$.drawImage(this.$cnv0$, $x$$48$$, 0, $w$$4$$, this.$baseline$, 0, 0, $w$$4$$, this.$baseline$), $_ref$$1$$ = [this.$ctx1$, this.$ctx0$], this.$ctx0$ = $_ref$$1$$[0], this.$ctx1$ = $_ref$$1$$[1], $_ref2$$1$$ = [this.$cnv1$, this.$cnv0$], this.$cnv0$ = $_ref2$$1$$[0], this.$cnv1$ = $_ref2$$1$$[1], $w$$4$$ = $x$$48$$ >>= 1
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
    jaap.$util$.$soon$($cont$$)
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
          $__iced_deferrals$$ = new iced.$Deferrals$($_next$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/master/_coffee/jaap/font.coffee", $funcname$:"Easel.getFamilyMetrics"}), $_this$$1$$.$getSizedFamilyMetrics$($size$$9$$, $family$$3$$, $metrics$$1$$, $__iced_deferrals$$.defer({$lineno$:146})), $__iced_deferrals$$.$_fulfill$()
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
    (function($__iced_k$$4$$) {
      var $_i$$1$$, $_len$$, $_results$$1$$, $_while$$1$$;
      $_len$$ = $families$$.length;
      $_i$$1$$ = 0;
      $_results$$1$$ = [];
      $_while$$1$$ = function $$_while$$1$$$($__iced_k$$5$$) {
        var $_break$$1$$, $_continue$$1$$, $_next$$1$$;
        $_break$$1$$ = function $$_break$$1$$$() {
          return $__iced_k$$5$$($_results$$1$$)
        };
        $_continue$$1$$ = function $$_continue$$1$$$() {
          ++$_i$$1$$;
          return $_while$$1$$($__iced_k$$5$$)
        };
        $_next$$1$$ = function $$_next$$1$$$($__iced_next_arg$$1$$) {
          $_results$$1$$.push($__iced_next_arg$$1$$);
          return $_continue$$1$$()
        };
        if($_i$$1$$ < $_len$$) {
          $family$$4$$ = $families$$[$_i$$1$$], function($__iced_k$$6$$) {
            $__iced_deferrals$$1$$ = new iced.$Deferrals$($__iced_k$$6$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/master/_coffee/jaap/font.coffee", $funcname$:"Easel.getMetrics"});
            window.$jaap$.font.$whenFontLoaded$($family$$4$$, $__iced_deferrals$$1$$.defer({$assign_fn$:function() {
              return function($JSCompiler_OptimizeArgumentsArray_p0$$, $JSCompiler_OptimizeArgumentsArray_p1$$) {
                $ok$$ = $JSCompiler_OptimizeArgumentsArray_p0$$;
                return $fam$$ = $JSCompiler_OptimizeArgumentsArray_p1$$
              }
            }(), $lineno$:158}));
            $__iced_deferrals$$1$$.$_fulfill$()
          }($_next$$1$$)
        }else {
          return $_break$$1$$()
        }
      };
      $_while$$1$$($__iced_k$$4$$)
    })(function() {
      (function($__iced_k$$7$$) {
        if($ok$$) {
          (function($__iced_k$$8$$) {
            var $_i$$2$$, $_len$$1$$, $_results$$2$$, $_while$$2$$;
            $_len$$1$$ = $families$$.length;
            $_i$$2$$ = 0;
            $_results$$2$$ = [];
            $_while$$2$$ = function $$_while$$2$$$($__iced_k$$9$$) {
              var $_break$$2$$, $_continue$$2$$, $_next$$2$$;
              $_break$$2$$ = function $$_break$$2$$$() {
                return $__iced_k$$9$$($_results$$2$$)
              };
              $_continue$$2$$ = function $$_continue$$2$$$() {
                ++$_i$$2$$;
                return $_while$$2$$($__iced_k$$9$$)
              };
              $_next$$2$$ = function $$_next$$2$$$($__iced_next_arg$$2$$) {
                $_results$$2$$.push($__iced_next_arg$$2$$);
                return $_continue$$2$$()
              };
              if($_i$$2$$ < $_len$$1$$) {
                $family$$4$$ = $families$$[$_i$$2$$], function($__iced_k$$10$$) {
                  $__iced_deferrals$$1$$ = new iced.$Deferrals$($__iced_k$$10$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/master/_coffee/jaap/font.coffee", $funcname$:"Easel.getMetrics"});
                  window.$jaap$.font.$whenFontLoaded$($family$$4$$, $__iced_deferrals$$1$$.defer({$assign_fn$:function() {
                    return function($JSCompiler_OptimizeArgumentsArray_p2$$, $JSCompiler_OptimizeArgumentsArray_p3$$) {
                      $ok$$ = $JSCompiler_OptimizeArgumentsArray_p2$$;
                      return $fam$$ = $JSCompiler_OptimizeArgumentsArray_p3$$
                    }
                  }(), $lineno$:162}));
                  $__iced_deferrals$$1$$.$_fulfill$()
                }(function() {
                  (function($__iced_k$$11$$) {
                    if($ok$$) {
                      (function($__iced_k$$12$$) {
                        $__iced_deferrals$$1$$ = new iced.$Deferrals$($__iced_k$$12$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/master/_coffee/jaap/font.coffee", $funcname$:"Easel.getMetrics"});
                        $_this$$2$$.$getFamilyMetrics$($fam$$, $__iced_deferrals$$1$$.defer({$assign_fn$:function() {
                          return function($JSCompiler_OptimizeArgumentsArray_p4$$, $JSCompiler_OptimizeArgumentsArray_p5$$) {
                            $ok$$ = $JSCompiler_OptimizeArgumentsArray_p4$$;
                            return $met$$ = $JSCompiler_OptimizeArgumentsArray_p5$$
                          }
                        }(), $lineno$:164}));
                        $__iced_deferrals$$1$$.$_fulfill$()
                      })(function() {
                        return $__iced_k$$11$$($metrics$$2$$[$fam$$] = $ok$$ ? $met$$ : "error obtaining metrics")
                      })
                    }else {
                      return $__iced_k$$11$$()
                    }
                  })($_next$$2$$)
                })
              }else {
                return $_break$$2$$()
              }
            };
            $_while$$2$$($__iced_k$$8$$)
          })(function() {
            return $__iced_k$$7$$($_this$$2$$.$div$.parentNode.removeChild($_this$$2$$.$div$))
          })
        }else {
          return $__iced_k$$7$$()
        }
      })(function() {
        return $cont$$2$$($ok$$, $metrics$$2$$)
      })
    })
  };
  return $Easel$$1$$
}();
this.$whenFontLoaded$ = function $this$$whenFontLoaded$$($family$$5$$, $cont$$3$$) {
  var $attempts$$, $complete$$, $div$$, $fallback$$, $loaded$$, $repeats_until_valid$$, $testFontLoaded$$, $_ref$$4$$, $_ref2$$2$$;
  $_ref$$4$$ = jaap.$util$.createElement("div", "<span>b H x p</span><br><span>b H x p</span>");
  $div$$ = $_ref$$4$$[0];
  $_ref2$$2$$ = $_ref$$4$$[1], $fallback$$ = $_ref2$$2$$[0], $loaded$$ = $_ref2$$2$$[2];
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
    return $fallback$$.offsetWidth !== $loaded$$.offsetWidth ? 0 === $repeats_until_valid$$-- ? $complete$$(!0, $family$$5$$) : jaap.$util$.$soon$($testFontLoaded$$) : 0 === $attempts$$-- ? $complete$$(!1, $family$$5$$) : jaap.$util$.$delay$($testFontLoaded$$, 40)
  };
  $testFontLoaded$$()
};
this.$getMetrics$ = function $this$$getMetrics$$($families$$1$$) {
  var $data$$20$$, $easel$$, $family$$7$$, $metrics$$3$$, $ok$$2$$, $resp$$, $__iced_deferrals$$2$$, $_i$$3$$, $_len$$2$$, $families$$1$$ = ["tsn4n", "tsi4n"], $families$$1$$ = $fallbacks$$.concat($families$$1$$);
  for($_i$$3$$ = 0, $_len$$2$$ = $families$$1$$.length;$_i$$3$$ < $_len$$2$$;$_i$$3$$++) {
    $family$$7$$ = $families$$1$$[$_i$$3$$], 0 < $family$$7$$.indexOf("inv") && ($families$$1$$ = $family$$7$$)
  }
  $easel$$ = new $Easel$$({$minFontSize$:10, $maxFontSize$:64});
  (function($__iced_k$$13$$) {
    $__iced_deferrals$$2$$ = new iced.$Deferrals$($__iced_k$$13$$, {parent:$JSCompiler_alias_NULL$$, filename:"B:/Projects/Web/jaapsuter.github.com/master/_coffee/jaap/font.coffee", $funcname$:"getMetrics"});
    $easel$$.$getMetrics$($families$$1$$, $__iced_deferrals$$2$$.defer({$assign_fn$:function() {
      return function($JSCompiler_OptimizeArgumentsArray_p6$$, $JSCompiler_OptimizeArgumentsArray_p7$$) {
        $ok$$2$$ = $JSCompiler_OptimizeArgumentsArray_p6$$;
        return $metrics$$3$$ = $JSCompiler_OptimizeArgumentsArray_p7$$
      }
    }(), $lineno$:222}));
    $__iced_deferrals$$2$$.$_fulfill$()
  })(function() {
    if($ok$$2$$) {
      return $data$$20$$ = JSON.stringify({payload:$metrics$$3$$, browser:"unknown"}, $JSCompiler_alias_NULL$$, 4), alert($data$$20$$), window.$jaap$.$ajax$.send("/ajax/json/type-metrics", $__iced_deferrals$$2$$.defer({$assign_fn$:function() {
        return function($JSCompiler_OptimizeArgumentsArray_p8$$, $JSCompiler_OptimizeArgumentsArray_p9$$) {
          $ok$$2$$ = $JSCompiler_OptimizeArgumentsArray_p8$$;
          return $resp$$ = $JSCompiler_OptimizeArgumentsArray_p9$$
        }
      }(), $lineno$:226}), $data$$20$$), alert("ok: " + $ok$$2$$ + ", resp: " + $resp$$)
    }
  })
};
var $create$$, $factories$$;
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
  var $f$$, $xhr$$, $_i$$4$$, $_len$$3$$;
  $xhr$$ = !1;
  for($_i$$4$$ = 0, $_len$$3$$ = $factories$$.length;$_i$$4$$ < $_len$$3$$;$_i$$4$$++) {
    $f$$ = $factories$$[$_i$$4$$];
    try {
      $xhr$$ = $f$$()
    }catch($e$$8$$) {
      continue
    }
    return $xhr$$
  }
};
this.send = function $this$send$($url$$21$$, $cb$$, $postData$$) {
  var $xhr$$1$$;
  if($xhr$$1$$ = $create$$()) {
    if($xhr$$1$$.open($postData$$ ? "PUT" : "GET", $url$$21$$, !0), $postData$$ && $xhr$$1$$.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), $xhr$$1$$.onreadystatechange = function $$xhr$$1$$$onreadystatechange$() {
      if(4 === $xhr$$1$$.readyState) {
        return 200 === $xhr$$1$$.status || 304 === $xhr$$1$$.status ? $cb$$(!0, req) : $cb$$(!1)
      }
    }, 4 !== $xhr$$1$$.readyState) {
      return $xhr$$1$$.send($postData$$)
    }
  }else {
    return $cb$$(!1)
  }
};
var $__hasProp$$ = {}.hasOwnProperty;
function $__extends$$($child$$1$$, $parent$$2$$) {
  function $ctor$$() {
    this.constructor = $child$$1$$
  }
  for(var $key$$13$$ in $parent$$2$$) {
    $__hasProp$$.call($parent$$2$$, $key$$13$$) && ($child$$1$$[$key$$13$$] = $parent$$2$$[$key$$13$$])
  }
  $ctor$$.prototype = $parent$$2$$.prototype;
  $child$$1$$.prototype = new $ctor$$;
  $child$$1$$.$__super__$ = $parent$$2$$.prototype
}
(function($_super$$) {
  function $Derived$$1$$() {
    return $Derived$$1$$.$__super__$.constructor.apply(this, arguments)
  }
  $__extends$$($Derived$$1$$, $_super$$);
  $Derived$$1$$.name = "Derived";
  return $Derived$$1$$
})(function() {
  function $Base$$1$$() {
  }
  $Base$$1$$.name = "Base";
  return $Base$$1$$
}());
this.time = function $this$time$($fun$$5$$) {
  var $start$$5$$;
  $start$$5$$ = new Date;
  $fun$$5$$();
  return new Date - $start$$5$$
};
this.$isNumber$ = function $this$$isNumber$$($obj$$16$$) {
  return $obj$$16$$ === +$obj$$16$$ || "[object Number]" === Object.prototype.toString.call($obj$$16$$)
};
this.$isUndefined$ = function $this$$isUndefined$$($obj$$17$$) {
  return"undefined" === typeof $obj$$17$$
};
this.$onKeyUp$ = function $this$$onKeyUp$$($key$$14$$, $fun$$6$$) {
  var $_this$$3$$ = this;
  window.addEventListener("keydown", function($e$$9$$) {
    ($_this$$3$$.$isNumber$($key$$14$$) && $key$$14$$ === $e$$9$$.keyCode || $key$$14$$.toUpperCase() === String.fromCharCode($e$$9$$.keyCode || $e$$9$$.charCode).toUpperCase()) && $fun$$6$$()
  })
};
this.createElement = function $this$createElement$($tag$$, $innerHTML$$) {
  var $elem$$1$$;
  $elem$$1$$ = document.createElement($tag$$);
  $elem$$1$$.innerHTML = $innerHTML$$;
  return[$elem$$1$$, $elem$$1$$.children]
};
this.$delay$ = function $this$$delay$$($func$$3$$, $wait$$) {
  var $args$$;
  $args$$ = this.$tail$(arguments, 2);
  return setTimeout(function() {
    return $func$$3$$.apply($func$$3$$, $args$$)
  }, $wait$$)
};
this.$soon$ = function $this$$soon$$($func$$4$$) {
  return this.$delay$.apply(this, [$func$$4$$, 1].concat(this.$tail$(arguments)))
};
this.$tail$ = function $this$$tail$$($array$$9$$, $index$$51$$) {
  return Array.prototype.slice.call($array$$9$$, this.$isUndefined$($index$$51$$) ? 1 : $index$$51$$)
};
var iced, $toggleBaseline$$, $__slice$$ = [].slice;
window.$iced$ = {$Deferrals$:function() {
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
      var $inner_params$$, $_ref$$5$$;
      $inner_params$$ = 1 <= arguments.length ? $__slice$$.call(arguments, 0) : [];
      $defer_params$$ != $JSCompiler_alias_NULL$$ && ($_ref$$5$$ = $defer_params$$.$assign_fn$) != $JSCompiler_alias_NULL$$ && $_ref$$5$$.apply($JSCompiler_alias_NULL$$, $inner_params$$);
      return $_this$$4$$.$_fulfill$()
    }
  };
  return $_Class$$
}(), $findDeferral$:function $window$$iced$$$findDeferral$$() {
  return $JSCompiler_alias_NULL$$
}};
iced = window.iced = window.$iced$;
$toggleBaseline$$ = function $$toggleBaseline$$$() {
  var $elem$$2$$;
  if($elem$$2$$ = document.querySelector("#baseline-checkbox")) {
    return $elem$$2$$.checked = !$elem$$2$$.checked
  }
};
this.$entryPoint$ = function $this$$entryPoint$$() {
  top === window && (this.$util$.$onKeyUp$("B", $toggleBaseline$$), this.$util$.$onKeyUp$("T", this.font.$getMetrics$))
};
this.$entryPoint$();

