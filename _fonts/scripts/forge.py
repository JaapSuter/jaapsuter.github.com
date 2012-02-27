import sys, re
reload(sys)
sys.setdefaultencoding('utf-8')

import ast
import getopt
import os
import glob
import psMat
import fontforge
import math

# 0x002d = hyphen-minus
# 0x00ad = soft hyphen
# 0x2010 = non ambiguous hyphen
# 0x2010 = non breaking hyphen
# 0x2212 = non ambiguous minus;

# IE9               shy = 0x002d
# Firefox 8         shy = 0x2010
# Chrome 16         shy = 0x2010
# Opera 11          shy = 0x00ad
# iPhone 4.2        shy = 0x002d
# Safari 5.1.2 Win  shy = 0x2010
# Safari 3.1.2 Mac  shy = 0x00ad

g_log_file = None

def log(s):
  locals  = sys._getframe(1).f_locals
  globals = sys._getframe(1).f_globals
  for item in re.findall(r'#\{([^{]*)\}', s):
    s = s.replace('#{%s}' % item, str(eval(item, globals, locals)))
  
  s += '\n'
  print s
  sys.stdout.flush()
  sys.stderr.flush()
  if g_log_file:
    g_log_file.write(s)
    g_log_file.flush()


def log_font(f, name):
  log("  INFO:    #{name} src em: #{f.em}")
  log("  INFO:    #{name} src ascent: #{f.ascent}")
  log("  INFO:    #{name} src descent: #{f.descent}")
  log("  INFO:    #{name} src x-height: #{f.xHeight}")
  log("  INFO:    #{name} src cap-height: #{f.capHeight}")
  log("  INFO: private dictionary")
  log("      BlueScale:  #{f.private['BlueScale'] if 'BlueScale' in f.private else 'x'}")
  log("      BlueFuzz:   #{f.private['BlueFuzz'] if 'BlueFuzz' in f.private else 'x'}")
  log("      BlueShift:  #{f.private['BlueShift'] if 'BlueShift' in f.private else 'x'}")
  log("      BlueValues: #{f.private['BlueValues'] if 'BlueValues' in f.private else 'x'}")
  log("      OtherBlues: #{f.private['OtherBlues'] if 'OtherBlues' in f.private else 'x'}")
  log("      StdHW:      #{f.private['StdHW'] if 'StdHW' in f.private else 'x'}")
  log("      StdVW:      #{f.private['StdVW'] if 'StdVW' in f.private else 'x'}")
  log("      StemSnapH:  #{f.private['StemSnapH'] if 'StemSnapH' in f.private else 'x'}")
  log("      StemSnapV:  #{f.private['StemSnapV'] if 'StemSnapV' in f.private else 'x'}")
  log("      StemSnapV:  #{f.private['StemSnapV'] if 'StemSnapV' in f.private else 'x'}")
  log("      Validation: u%0.8X" % f.validate(True))

def select_more_unicode(f, name, unicode):
  f.selection.select(('more', 'unicode'), unicode)

  glyphName = fontforge.nameFromUnicode(unicode)
  unicodeAsString = "u%0.6X" % unicode

  if not glyphName in f:
    log("  WARNING: font '#{name}' does not have glyph '#{glyphName}' for requested unicode value: #{unicodeAsString}.")
  elif f[unicode].references:
    log("  WARNING: font '#{name}' contains glyph '#{glyphName}' with references.")
    for ref in f[unicode].references:
      try:
        f.selection.select(('more',), ref[0])
      except:
        log("  WARNING: font '#{name}' with glyph '#{glyphName}' (unicode: #{unicodeAsString}) could not resolve reference: #{str(ref[0])}.")

def copy_glyph_from_to(f, src, dst):
  f.selection.select(src)
  f.unlinkReferences()
  f.copy()

  g = f.createChar(dst) if isinstance(dst, int) else f[dst]
  g.removePosSub('*')
  f.selection.none()
  f.selection.select(g)
  f.paste()

  return g, f[src]
  
def try_replace_glyph_with(f, reinstructables, corig, calt):
  if corig in f and calt in f:
    log("Replacing '#{corig}' with '#{calt}'...")

    g, h = copy_glyph_from_to(f, calt, corig)

    if not h or not h.ttinstrs or len(h.ttinstrs) == 0:
      log("Reinstructing '#{corig}' because '#{calt}' had no instructions...")
      correct_round_and_clean(g)
      reinstructables.append(g)
    else:
      log("Reusing instructions for '#{corig}' coming from '#{calt}'...")
      g.ttinstrs = h.ttinstrs
    
    return g
  else:
    return None


def autohint_entire_font(f):
  guessOtherBlues = False
  guessHorizontalStems = True
  guessVerticalStems = True

  f.private["BlueValues"] = ()
  f.private["BlueScale"] = ()
  f.private["BlueFuzz"] = ()
  f.private["BlueShift"] = ()
  f.private["StdHW"] = ()
  f.private["StemSnapH"] = ()
  f.private["StdVW"] = ()
  f.private["StdVW"] = ()

  for g in f.glyphs():
    g.dhints = ()
    g.hhints = ()
    g.vhints = ()

  for idx in range(0, 2):

    f.selection.all()  
    f.autoHint()
    
    f.private.guess("BlueValues")
    f.private.guess("BlueScale")
    f.private.guess("BlueFuzz")
    f.private.guess("BlueShift")    
    
    if guessOtherBlues:
      f.private.guess("OtherBlues")
    if guessHorizontalStems:
      f.private.guess("StdHW")     
      f.private.guess("StemSnapH")
      if "StemSnapH" in f.private and len(f.private["StemSnapH"]) > 0:
        f.private["StdHW"] = (f.private["StemSnapH"][0],)
    if guessVerticalStems:
      f.private.guess("StdVW")
      f.private.guess("StemSnapV")
      if "StemSnapV" in f.private and len(f.private["StemSnapV"]) > 0:
        f.private["StdVW"] = (f.private["StemSnapV"][0],)

  f.autoHint()

  for g in f.glyphs():
    g.autoHint()

def adjust_left_side_bearings(f, min_bearing):
  f.selection.all()
  for g in f.glyphs():
    xMin = g.boundingBox()[0]
    if xMin < min_bearing:
      g.transform(psMat.translate(min_bearing - xMin, 0))    

def invert_glyphs(f, is_serif):
  
  line_height = 1.5
  half_em = f.em / 2.0
  leading = (f.em * line_height - (f.ascent + f.descent))

  top = f.ascent + math.floor(leading / 2)
  bottom = -f.descent - math.ceil(leading / 2)

  f.selection.all()
  for g in f.glyphs():
    
    g.left_side_bearing = g.right_side_bearing = 0
    g.width = math.ceil(g.width / half_em) * half_em
    g.left_side_bearing = g.right_side_bearing = (g.left_side_bearing + g.right_side_bearing) / 2

    left = 0
    right = g.width

    foreground_idx = 1
    
    # ...within FontForge all outer boundaries must be
    # drawn clockwise, while all inner boundaries must
    # be drawn counter-clockwise.
    old_foreground = g.layers[foreground_idx]
    new_foreground = fontforge.layer()
    
    new_c = fontforge.contour()
    new_c.is_quadratic = False
    new_c.moveTo(left, bottom)
    new_c.lineTo(left, top)
    new_c.lineTo(right, top)
    new_c.lineTo(right, bottom)
    new_c.closed = True
    new_c.simplify()

    new_foreground += new_c
    
    for old_c in old_foreground:
      new_c = old_c.dup()
      new_c.reverseDirection()
      new_foreground += new_c
  
    new_foreground.removeOverlap()
    
    g.layers[foreground_idx] = new_foreground
    g.layers[foreground_idx].correctDirection()
    
    g.left_side_bearing = g.right_side_bearing = 0
    
    correct_round_and_clean(g)
    
  autohint_entire_font(f)

def correct_round_and_clean(font_or_glyph):
  font_or_glyph.correctDirection()
  font_or_glyph.removeOverlap()
  font_or_glyph.addExtrema()
  font_or_glyph.round()
  font_or_glyph.canonicalContours()
  font_or_glyph.canonicalStart()

def remove_cvt_fpgm_and_prep(f):
  f.setTableData('cvt', None)
  f.setTableData('fpgm', None)
  f.setTableData('prep', None)

def convert_to_postscript_curves(f):
  for name in f.layers:
    f.layers[name].is_quadratic = False
            
  f.em = 1000

  remove_cvt_fpgm_and_prep(f)
  
  # min_bearing = 4
  # adjust_left_side_bearings(f, min_bearing)
  
  correct_round_and_clean(f)
  autohint_entire_font(f)

def generate(f, name, dst):
  log_font(f, name)

  with open(dst + ".xHeight", "w") as fl:
    fl.write(str(f.xHeight))
  with open(dst + ".capHeight", "w") as fl:
    fl.write(str(f.capHeight))

  f.generate(dst)

def do_possible_manual_glyphs(f, dir, name, reinstructables):
  candidates = os.path.join(dir, "../_fonts/manual-glyphs", "*." + name + ".sfd")
  for c in glob.glob(candidates):
    
    m = fontforge.open(c)
    m.selection.all()
    names = [g.glyphname for g in m.selection.byGlyphs]
    
    for n in names:
      if n in f:
        log("Replacing #{n} in #{name} with glyph from #{c}...")      
        m.selection.select(n)
        m.copy()
        f.selection.select(n)
        f.paste()
        reinstructables.extend(f.selection.byGlyphs)
      else:
        log("Replacement failure during #{c}, because #{n} does not exist in #{name}...")
        
    
    # We don't close the font, because it appears to result in access violations... since we're going to exit
    # soon anyway, it's not a big problem...        m.close()

def make_small_caps(f, is_italic, reinstructables):

  lowercase_to_smallcap_map = {
    'a': 0x1D00,
    'b': 0x0299 if is_italic else 0x0432,
    'c': 0x1D04,
    'd': 0x1D05,
    'e': 0x1D07,
    'f': 0xA730,
    'g': 0x0262,
    'h': 0x029C,
    'i': 0x026A,
    'j': 0x1D0A,
    'k': 0x1D0B,
    'l': 0x029F,
    'm': 0x1D0D,
    'n': 0x0274,
    'o': 0x1D0F,
    'p': 0x1D18,
    'q': 0x01EB,
    'r': 0x0280,
    's': 0xA731,
    't': 0x1D1B,
    'u': 0x1D1C,
    'v': 0x1D20,
    'w': 0x1D21,
         # reusing existing lowercase 'x' glyph
    'y': 0x028F,
    'z': 0x1D22,
  }

  for lowercase, smallcap in lowercase_to_smallcap_map.iteritems():
    try_replace_glyph_with(f, reinstructables, lowercase, smallcap)

  # foreground_idx = 1
  # first_contour_idx = 0
  # adjustment = 29
  # n = f['N'].layers[foreground_idx][first_contour_idx]
  # n[ 7] = fontforge.point(n[ 7].x, n[ 7].y + adjustment)
  # n[14] = fontforge.point(n[14].x, n[14].y + adjustment)
  # n[15] = fontforge.point(n[15].x, n[15].y + adjustment)
  # f['N'].layers[foreground_idx][first_contour_idx] = n

def make_font_face_load_detection_glyph(f, unicodes, is_monospace):
  unicode = 0xA6
  width = 4 * f.em if not is_monospace else f['m'].width

  g = f.createChar(unicode)
  g.clear()
  g.left_side_bearing = g.right_side_bearing = 0
  g.width = width

  unicodes.append(unicode)
      
def forge_one(name, src, dir, unicodes):
    
  is_for_postscript = name[0] == 'p'
  is_serif = name[1] == 's'
  is_monospace = name[1] == 'm'
  is_italic = name[2] == 'i'
  is_condensed = name[4] == 'c'  
  is_for_small_caps = name.endswith('-smcp')
    
  rehinstr = is_italic or is_condensed or is_for_small_caps
  
  ttf = os.path.join(dir, name + ".ttf")
  otf = os.path.join(dir, name + ".otf")
  otf_inv = os.path.join(dir, name + "-inv.otf")
  
  f = fontforge.open(src)
    
  log("OPEN: font #{name}")

  f.sfnt_names = ()
  f.selection.all()
  f.unlinkReferences()    
  for g in f.glyphs():
    g.anchorPoints = []
  f.selection.none()

  reinstructables = []
  if not is_italic:
    reinstructables = [
      try_replace_glyph_with(f, reinstructables, 'g', 'g.alt'),
      try_replace_glyph_with(f, reinstructables, 'l', 'l.alt')
    ]
    
  if is_for_small_caps:
    make_small_caps(f, is_italic, reinstructables)
    unicodes = range(ord('a'), ord('z') + 1)

  do_possible_manual_glyphs(f, dir, name, reinstructables)
  
  if False:
    make_font_face_load_detection_glyph(f, unicodes, is_monospace)

  if unicodes:
    unicodes.extend(range(0, ord(' ')))    # .null, .notdef, CR, etc.
    unicodes.extend([     
      ord(' '),                            # space
      ord('x'),                            # x, for ex-height measurements
      ord('-'),                            # hyphen-minus
      0x0085,                              # next-line
      0x00A0,                              # no break space
      0x00AD,                              # soft hyphen
      0x200A,                              # zero width space
      0x200C,                              # zero width non-joiner
      0x200D,                              # zero width joiner
      0x2010,                              # hyphen
      0x2011,                              # non-breaking hyphen	as hyphen (U+2010), but not an allowed line break point
      0x2028,                              # line separator
      0x2029])                             # paragraph separator

    ligatures = [0xfb01, 0xfb02, 0xfb03, 0xfb04, 0xfb05]
    exclude = ligatures if not is_serif else []

    unicodes = [unicode for unicode in set(unicodes) if unicode not in exclude]

    f.selection.none()
    for unicode in unicodes:
      select_more_unicode(f, name, unicode)

    f.selection.invert()
    f.clear()

  if rehinstr:
    remove_cvt_fpgm_and_prep(f)

  autohint_entire_font(f)
    
  if rehinstr:
    f.selection.all()
    f.autoInstr()
  else:
    [r.autoInstr() for r in reinstructables if r]

  generate(f, name, ttf)

  if is_for_postscript:
    convert_to_postscript_curves(f)
    generate(f, name, otf)
      
    invert_glyphs(f, is_serif)
    generate(f, name, otf_inv)

  f.close()

def forge_all(cmds):    
  for cmd in cmds:
    forge_one(cmd['name'], cmd['src'], cmd['dir'], cmd['unicodes'])

def main(argv):
  with open(argv[0]) as f:
    cmds = [ast.literal_eval(line.strip()) for line in f.readlines()]
  
  with open(os.path.join(cmds[0]['dir'], "../.jaap-build/_forge-log.txt"), "a") as log_file:
    global g_log_file
    g_log_file = log_file
    forge_all(cmds)
  
if __name__ == '__main__':
  main(sys.argv[1:])
