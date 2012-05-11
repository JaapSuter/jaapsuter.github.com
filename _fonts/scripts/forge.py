# Todo, Jaap Suter, February 2012, investigate INSTCTRL 3, 4, see
# here for more information: http://www.microsoft.com/typography/cleartype/truetypecleartype.aspx

import sys, re
reload(sys)
sys.setdefaultencoding('utf-8')

import ast
import getopt
import os
import shutil
import glob
import psMat
import fontforge
import math
import random

# 0x002d = hyphen-minus
# 0x00ad = soft hyphen
# 0x2010 = non ambiguous hyphen
# 0x2010 = non breaking hyphen
# 0x2212 = non ambiguous minus

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
      if reinstructables:
        reinstructables.append(g)
    else:
      log("Reusing instructions for '#{corig}' coming from '#{calt}'...")
      g.ttinstrs = h.ttinstrs
    
    return g
  else:
    return None


def autohint_entire_font(f, use_existing_privates = False):
  guessOtherBlues = False
  guessHorizontalStems = True and not use_existing_privates
  guessVerticalStems = True and not use_existing_privates

  if not use_existing_privates:
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
    
    if not use_existing_privates:
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

def make_underline(f, name, src, dst):

  if name != 'tsn4n':
    return

  name += '-underline'

  shutil.copy2(src, dst)

  m = fontforge.open(dst)  
  
  m.selection.all()
  remove_cvt_fpgm_and_prep(m)

  m.private["BlueValues"] =   f.private["BlueValues"]
  m.private["BlueScale"] =    f.private["BlueScale"]
  m.private["BlueFuzz"] =     f.private["BlueFuzz"]
  m.private["BlueShift"] =    f.private["BlueShift"]
  m.private["StdHW"] =        f.private["StdHW"]
  m.private["StemSnapH"] =    f.private["StemSnapH"]
  m.private["StdVW"] =        f.private["StdVW"]
  m.private["StdVW"] =        f.private["StdVW"]

  # Quoting from http://www.microsoft.com/typography/cursivescriptguidelines.mspx
  #
  #   "When designing connecting glyphs to avoid pixel dropout caused by rounding, it
  #    is necessary to provide for a minimum of a 70 font unit overlap when a 2048 em
  #    square (recommended value) is used for TrueType outlines. The amount of 70 units
  #    will allow for at least the width of the character to be maintained during the
  #    rasterization process at all PPEM sizes.
  #
  #    To make the overlap most effective, the overlap should be totally on either the left
  #    side of the glyph or the right side of the glyph. My recommendation would be that the
  #    overlap would be on the trailing side of the glyph.
  #
  # In other words, these conditions must apply to resulting glyph metrics:
  #
  #     1. Advance width must stay the same (so that the underlined
  #        font advances exactly like the original does.)
  #     2. The left side goes as far left as necessary; that means 0 in most
  #        cases, and further left (negative) for characters with an existing 
  #        negative left bearing (like the letter 'j' might have for example).
  #     3. The right side goes as far right as necessary; that means the advance
  #        width in most cases... _plus_ the furthest of a negative right side bearing and
  #        the above mentioned overshoot.

  recommended_overshoot = 70

  # The slash is a 'tricky' character (read: don't feel like firing up font-forge
  # right now), so let's raise its bottom by dumping a hardcoded contour in there.
  hardcoded_slash = fontforge.contour()
  hardcoded_slash.is_quadratic = True
  hardcoded_slash.moveTo(530, 1493)
  hardcoded_slash.lineTo(60, 0)
  hardcoded_slash.lineTo(270, 0)
  hardcoded_slash.lineTo(690, 1493)
  hardcoded_slash.closed = True
  
  # Descender test line: ep:/ajaqug, (3241527890); JaQ-$_@.a
  manual_descenders = {
    # Pair of left and right fix-ups (0 on the rhs means end of glyph, per above).
    fontforge.nameFromUnicode(ord('g')): [],
    fontforge.nameFromUnicode(ord('j')): [],
    fontforge.nameFromUnicode(ord('p')): [(578, 0)], # Not used: (0, 78)
    fontforge.nameFromUnicode(ord('q')): [(0, 690)], # Not used: (1213, 1311 + recommended_overshoot)
    fontforge.nameFromUnicode(ord('y')): [(-6, 160), (755, 0)],
    fontforge.nameFromUnicode(ord(',')): [(433, 0)],
    fontforge.nameFromUnicode(ord(';')): [(460, 0)],
    fontforge.nameFromUnicode(ord('(')): [(0, 288)],
    fontforge.nameFromUnicode(ord(')')): [(509, 0)],
    fontforge.nameFromUnicode(ord('$')): [(0, 490), (790, 0)],
    fontforge.nameFromUnicode(ord('@')): [(0, 300), (1720, 0)],
    fontforge.nameFromUnicode(ord('J')): [],
    fontforge.nameFromUnicode(ord('Q')): [(0, 728), (1478, 0)],
    fontforge.nameFromUnicode(ord('3')): [],
    fontforge.nameFromUnicode(ord('4')): [(0, 567), (1036, 0)],
    fontforge.nameFromUnicode(ord('5')): [],
    fontforge.nameFromUnicode(ord('7')): [(0, 312), (682, 0)],
    fontforge.nameFromUnicode(ord('9')): [],
    fontforge.nameFromUnicode(ord('_')): [],
  }

  thickness = 90
  vertical_pos = -180
  top = vertical_pos + thickness / 2
  bottom = vertical_pos - thickness / 2
    
  for g in m.glyphs():

    ow, olb, orb = g.width, g.left_side_bearing, g.right_side_bearing
    
    width = g.width
    far_left = min(g.left_side_bearing, 0)
    far_right = g.width - min(-recommended_overshoot, min(g.right_side_bearing, 0))

    underline_sections = [(far_left, far_right)]

    if g.glyphname in manual_descenders:
      underline_sections = manual_descenders[g.glyphname]

    for section in underline_sections:
      
      # Some hard-coded fixups defined in the table above use 0 for the right
      # side, implying the glyph's full-width
      left = section[0]
      right = section[1] if section[1] != 0 else far_right

      underline = fontforge.contour()
      underline.is_quadratic = True
      underline.moveTo(left, top)
      underline.lineTo(left, bottom)
      underline.lineTo(right, bottom)
      underline.lineTo(right, top)
      underline.closed = True
    
      foreground_idx = 1
      if g.glyphname == 'slash':
        g.layers[foreground_idx] = hardcoded_slash

      g.layers[foreground_idx] += underline

    correct_round_and_clean(g)

    bbox = g.boundingBox()    
    g.left_side_bearing = bbox[0]
    g.right_side_bearing = g.width - bbox[2]

    nw, nlb, nrb = g.width, g.left_side_bearing, g.right_side_bearing

    # log("#{g.glyphname}: #{ow}, #{olb}, #{orb} -> #{nw}, #{nlb}, #{nrb}")
        
  autohint_entire_font(m, use_existing_privates = True)
  m.selection.all()
  m.autoInstr()

  generate(m, name, dst)

  m.close()

def make_stripe(f, name, src, dst):

  if name != 'pan7n':
    return

  name += '-stripe'

  shutil.copy2(src, dst)

  m = fontforge.open(dst)  
  m.selection.all()
  
  for g in m.glyphs():

    ow, olb, orb = g.width, g.left_side_bearing, g.right_side_bearing

    bbox = g.boundingBox()    
    angle = 90 + random.randint(17, 118)
    thickness = random.randint(math.floor(m.xHeight / 9), math.ceil(m.xHeight / 4))
    x_middle = bbox[0] + (bbox[2] - bbox[0]) / 2
    y_middle = bbox[1] + (bbox[3] - bbox[1]) / 2
    top = y_middle + thickness / 2
    bottom = y_middle - thickness / 2
    left = -m.em * 2
    right = m.em * 3

    log("#{g.glyphname} #{thickness}, #{x_middle}, #{y_middle}, #{top}, #{bottom}");

    left_sb = min(g.left_side_bearing, 0)
    right_sb = g.width - min(g.right_side_bearing, 0)
    advance_width = g.width

    rect = fontforge.contour()
    rect.is_quadratic = False
    rect.moveTo(left, top)
    rect.lineTo(right, top)
    rect.lineTo(right, bottom)
    rect.lineTo(left, bottom)
    rect.closed = True

    mat_to_origin = psMat.translate(-x_middle, -y_middle)
    mat_from_origin = psMat.translate(x_middle, y_middle)
    mat_rotate = psMat.rotate(math.radians(angle))
    mat_transform = psMat.compose(psMat.compose(mat_to_origin, mat_rotate), mat_from_origin)

    rect.transform(mat_transform)
    
    foreground_idx = 1    
    foreground = g.layers[foreground_idx]
    foreground += rect
    foreground.intersect()

    # mask = fontforge.layer()
    # mask += rect
    # mask.intersect()
    # foreground = g.layers[foreground_idx]
    # foreground.exclude(mask)

    g.layers[foreground_idx] = foreground

    correct_round_and_clean(g)

    bbox = g.boundingBox()
    
    if g.layers[foreground_idx].isEmpty():
      log("#{g.glyphname}: isEmpty")
      g.left_side_bearing = 0
      g.right_side_bearing = 0
    elif bbox[0] == bbox[2]:
      log("#{g.glyphname}: bbox same")
      g.left_side_bearing = 0
      g.right_side_bearing = 0
    else:
      log("#{g.glyphname}: still volume")
      g.left_side_bearing = bbox[0]
      g.right_side_bearing = advance_width - bbox[2]
    
    g.width = advance_width

    nw, nlb, nrb = g.width, g.left_side_bearing, g.right_side_bearing

    log("#{g.glyphname}: #{ow}, #{olb}, #{orb} -> #{nw}, #{nlb}, #{nrb}")
    
  autohint_entire_font(m, use_existing_privates = True)
  
  # Handy for debugging, not needed otherwise: 
  m.save(dst.replace('.otf', '.sfd'))

  generate(m, name, dst)

  m.close()

def invert_glyphs(f, is_serif):
  
  recommended_overshoot = math.ceil(70.0 * 1000 / 2048)
  center_glyph = False

  half_leading = math.ceil((1.5 * f.em - (f.ascent + f.descent)) / 2.0)
  top = f.ascent + half_leading
  bottom = -f.descent - half_leading

  if center_glyph:
    line_height = 1.4

    box_size = f.em * line_height
    leading = (f.em * line_height - (f.ascent + f.descent))

    f.ascent = f.descent = box_size * 0.5

    top = 0.5 * box_size
    bottom = -top

  f.selection.all()
  for g in f.glyphs():

    ow, olb, orb = g.width, g.left_side_bearing, g.right_side_bearing

    width = g.width
    left = min(g.left_side_bearing, 0)
    right = g.width - min(-recommended_overshoot, min(g.right_side_bearing, 0))
    
    if center_glyph:
      bbox = g.boundingBox()    
      vertical_center = bbox[1] + (bbox[3] - bbox[1]) / 2
      
      g.transform(psMat.translate(0, -vertical_center))
      
      g.left_side_bearing = g.right_side_bearing = 0
      g.width = box_size;
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
    
    correct_round_and_clean(g)
    
    bbox = g.boundingBox()
    g.left_side_bearing = bbox[0]
    g.right_side_bearing = g.width - bbox[2]

    nw, nlb, nrb = g.width, g.left_side_bearing, g.right_side_bearing

    log("#{g.glyphname}: #{ow}, #{olb}, #{orb} -> #{nw}, #{nlb}, #{nrb}")
    
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
        
    
    # We don't close the font, because it appears to result in
    # access violations... Might be fixed in newer FontForge version, but 
    # since we're going to exit soon anyway, it's not a big problem.
    #
    #     m.close()

def make_small_caps(f, is_italic, is_serif, reinstructables, unicodes):

  lowercase_to_smallcap_map = {
    'A': 0x1D00,                                                              
    'B': 0x0299, # other candidate maybe: 0x0432
    'C': 0x1D04,                                                              
    'D': 0x1D05,                                                              
    'E': 0x1D07,                                                              
    'F': 0xA730,                                                              
    'G': 0x0262,                                                              
    'H': 0x029C,                                                              
    'I': 0x026A,                                                              
    'J': 0x1D0A,                                                              
    'K': 0x1D0B,                                                              
    'L': 0x029F,                                                              
    'M': 0x1D0D,                                                              
    'N': 0x0274,                                                              
    'O': 0x1D0F,                                                              
    'P': 0x1D18,                                                              
    'Q': 0x01EB,                                                              
    'R': 0x0280,                                                              
    'S': 0xA731,                                                              
    'T': 0x1D1B,                                                              
    'U': 0x1D1C,                                                              
    'V': 0x1D20,                                                              
    'W': 0x1D21,                                                              
    'X': ord('x'),
    'Y': 0x028F,                                                              
    'Z': 0x1D22,                                                              
  }

  for lowercase, smallcap in lowercase_to_smallcap_map.iteritems():
    try_replace_glyph_with(f, reinstructables, lowercase, smallcap)

  move_downables = [0x2018, 0x2019, 0x201c, 0x201d]
  for md in move_downables:
    unicodes.append(md)

    g = f[fontforge.nameFromUnicode(md)]

    bbox = g.boundingBox()
    current_top = max(bbox[1], bbox[3])
    lower = psMat.translate(0, f.xHeight - current_top)
    
    g.transform(lower)

  del unicodes[:]

  unicodes.extend(range(ord('A'), ord('Z') + 1))
  unicodes.extend(move_downables)
  unicodes.extend(range(ord('0'), ord('9') + 1))
  unicodes.append(ord('.'))
  unicodes.append(ord('&'))
  unicodes.append(ord('('))
  unicodes.append(ord(')'))
  unicodes.append(ord('!'))
  unicodes.append(ord('?'))  
    
def make_font_face_load_detection_glyph(f, unicodes, is_monospace):
  unicode = 0xA6
  width = 4 * f.em if not is_monospace else f['m'].width

  g = f.createChar(unicode)
  g.clear()
  g.left_side_bearing = g.right_side_bearing = 0
  g.width = width

  unicodes.append(unicode)

def fix_and_add_rhythm_glyphs(f, unicodes):

  unicodes.append(ord('|'))

  # No special rhythm glyphs used at the moment, just the vertical
  # bar. Remove remainder of function if stale (today is May 1st 2012)
  return 

  width = 512
  height = f.ascent
  unicode_x_left_x_right = [(0x258f, 0, width / 2), (0x2595, width / 2, width)]
  for ulr in unicode_x_left_x_right:
    
    unicode = ulr[0]
    left = ulr[1]
    right = ulr[2]

    unicodes.append(unicode)
    g = f.createChar(unicode)
    g.clear()
    
    rect = fontforge.contour()
    rect.is_quadratic = True
    rect.moveTo(left, height)
    rect.lineTo(left, 0)
    rect.lineTo(right, 0)
    rect.lineTo(right, height)
    rect.closed = True

    foreground_idx = 1    
    g.layers[foreground_idx] = rect

    g.left_side_bearing = left
    g.right_side_bearing = width - right
    g.width = width


def forge_one(name, src, dir, unicodes):
    
  is_base_no_exts = len(name) == 5
  is_for_postscript = name[0] == 'p'
  is_serif = name[1] == 's'
  is_sans = name[1] == 'a'
  is_monospace = name[1] == 'm'
  is_italic = name[2] == 'i'
  is_condensed = name[4] == 'c'  
  is_for_small_caps = name.endswith('-c2pc')  
    
  rehinstr = is_italic or is_condensed or is_for_small_caps
  
  ttf = os.path.join(dir, name + ".ttf")
  otf = os.path.join(dir, name + ".otf")
  otf_inv = os.path.join(dir, name + "-inv.otf")  
  otf_stripe = os.path.join(dir, name + "-stripe.otf")  
  
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
    make_small_caps(f, is_italic, is_serif, reinstructables, unicodes)
    
  do_possible_manual_glyphs(f, dir, name, reinstructables)
  
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
    0x2011,                              # non-breaking hyphen as hyphen (U+2010), but not an allowed line break point
    0x2028,                              # line separator
    0x2029])                             # paragraph separator

  # Base serifs include the ligatures. Sans and mono do not, they're not worth it.   
  if is_serif and is_base_no_exts:
    unicodes.extend([0xfb01, 0xfb02, 0xfb03, 0xfb04, 0xfb05])
    unicodes.append(0xb6) # Pilcrow

  # The body font gets a vertical rhythm stick
  if name == 'tsn4n':
    fix_and_add_rhythm_glyphs(f, unicodes)

  # Remove any duplicates
  unicodes = list(set(unicodes))

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
    for r in reinstructables:
      if r:
        r.addExtrema()
        r.autoInstr()
        
  generate(f, name, ttf)

  if True:
    make_underline(f, name, ttf, os.path.join(dir, name + "-underline.ttf"))

  if True:
    if is_for_postscript:
      convert_to_postscript_curves(f)
      generate(f, name, otf)

      if True and is_sans:
        make_stripe(f, name, otf, otf_stripe)
      
      if True:
        invert_glyphs(f, is_serif)
        generate(f, name, otf_inv)

  f.close()

def forge_all(cmds):    
  for cmd in cmds:
    forge_one(cmd['name'], cmd['src'], cmd['dir'], cmd['unicodes'])

def main(argv):
  random.seed()

  with open(argv[0]) as f:
    cmds = [ast.literal_eval(line.strip()) for line in f.readlines()]
  
  with open(os.path.join(cmds[0]['dir'], "../.jaap-build/_forge-log.txt"), "a") as log_file:
    global g_log_file
    g_log_file = log_file
    forge_all(cmds)
  
if __name__ == '__main__':
  main(sys.argv[1:])
