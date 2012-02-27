require 'json'
require 'nokogiri'

module Jaap
  module Font

    def self.is_with_postscript_curves(name) 'p' == name[0] end    
    
    def self.is_serif(name) 's' == name[1] end
    def self.is_sans(name) 'a' == name[1] end
    def self.is_mono(name) 'm' == name[1] end
    
    def self.is_italic(name) 'i' == name[2] end
    def self.is_bold(name) '7' == name[3] end
    def self.is_light(name) '2' == name[3] end
    def self.is_condensed(name) 'c' == name[4] end    
    
    def self.is_for_small_caps(name) name.endsWidth '-smcp' end
    def self.is_for_tabular_lining_numerals(name) name.endsWidth '-tnum-lnum' end
    
    def self.get_font_list()
      Paths.glob('fonts/*.woff').map { |file| File.basename(file, File.extname(file)) }
    end
    
    def self.build(filter = false, psify = true)
    
      ensure_font_list_and_merge_unicode_superset_into_all_subsets()
      
      forge_temp_dir = Paths.get_or_make '.jaap-build'
      forge_cmd_path = File.join forge_temp_dir, '_forge-cmd.txt'
      
      File.open(forge_cmd_path, 'w') do |forge_cmd_file|
      
        srcs = Paths.glob('_fonts/dejavu-fonts-ttf-2.33/ttf/*.ttf')
        srcs.each { |src|
        
          name = File.basename(src).sub('-', '')
                                   .sub('DejaVu', '')
                                   .sub('Serif', 's_')
                                   .sub('SansMono', 'm_')
                                   .sub('Sans', 'a_')
        
          family, fvd = name.split('_')
          weight = (fvd.include? 'Bold') ? '7' : (fvd.include? 'ExtraLight') ? '2' : '4'
          style = (fvd.include? 'Oblique') ? 'o' : (fvd.include? 'Italic') ? 'i' : 'n'
          variant = (fvd.include? 'Condensed') ? 'c' : 'n'        
        
          flavor = 't'
          name = flavor + family + style + weight + variant 
                  
          next if filter and name != filter
          next if not @@subsets.has_key? name
          
          cmd = Hash['name' => name,
                     'src'  => Paths.to_xming(src),
                     'dir'  => Paths.to_xming(forge_temp_dir),
                     'unicodes' => @@subsets[name]['unicodes']]
          
          forge_cmd_file.puts cmd.to_s.gsub '=>', ': '
          
          if ['tsn4n', 'tsi4n'].include? name
            cmd['name'] = name + '-smcp'
            forge_cmd_file.puts cmd.to_s.gsub '=>', ': '
            
            cmd['name'] = name + '-tnum-lnum'
            cmd['unicodes'] = ("0".codepoints.first.."9".codepoints.first + 1).to_a
            forge_cmd_file.puts cmd.to_s.gsub '=>', ': '
          end
                                   
          flavor = 'p'
          name = flavor + family + style + weight + variant
          
          next if not psify        
          next if not @@subsets.has_key? name
          
          cmd = Hash['name' => name,
                     'src'  => Paths.to_xming(src),
                     'dir'  => Paths.to_xming(forge_temp_dir),
                     'unicodes' => @@subsets[name]['unicodes']]
          
          forge_cmd_file.puts cmd.to_s.gsub '=>', ': '          
        }        
      end
      
      Tool.font_forge "-script", Paths.get('_fonts/scripts/forge.py'), Paths.to_xming(forge_cmd_path)
      
      Paths.glob(forge_temp_dir, '**/*.{ttf,otf}').each do |src|
        ttxify(File.basename(src, File.extname(src)), src, Paths.get('fonts'))
      end
    end
    
    def self.ttxify(name, src, dst_dir)
    
      using_ttx(src, Paths.get('fonts')) { |xml|
        
        xHeight = File.read(src + '.xHeight').to_i
        capHeight = File.read(src + '.capHeight').to_i
     
        xml.css('ttFont > FFTM').each { |node| node.remove }
        
        os2_version_node = xml.at_css('ttFont > OS_2 > version')
        os2_version_node['value'] = '3'
        os2_version_node.add_next_sibling Nokogiri::XML::DocumentFragment.parse <<-eoxml
          <sxHeight value="#{xHeight}"/>
          <sCapHeight value="#{capHeight}"/>
          <usDefaultChar value="32"/>
          <usBreakChar value="32"/>
          <usMaxContex value="4"/>
        eoxml
        
        some_head_node = xml.at_css('ttFont > head > fontRevision')
        some_head_node['value'] = '10.18'
      
        # head.flags:
        #  bit 0 => baseline for font at y=0
        #  bit 1 => left sidebearing point at x=0
        #  bit 2 => instructions may depend on point size
        #  bit 3 => force ppem to integer values for all internal scaler math
        #  bit 4 => instructions may alter advance width
        #  bit c => optimized for cleartype
        overwrite_head_flags = false
        if overwrite_head_flags
          #                                               fedcba98 76543210
          xml.at_css('ttFont > head > flags')['value'] = '00000000 00001101'
        end
        
        yMin = 0
        yMax = 0
        xml.css('ttFont > glyf > TTGlyph').each { |ttGlyph|
          yMin = [yMin, ttGlyph['yMin'].to_i].min
          yMax = [yMax, ttGlyph['yMax'].to_i].max
        }
        
        yMin = xml.at_css('ttFont > head > yMin')['value'] if yMin == 0
        yMax = xml.at_css('ttFont > head > yMax')['value'] if yMax == 0
      
        yMin = yMin.to_s
        yMax = yMax.to_s
        
        xml.at_css('ttFont > head > yMax')['value'] = yMax
        xml.at_css('ttFont > hhea > ascent')['value'] = yMax
        xml.at_css('ttFont > OS_2 > sTypoAscender')['value'] = yMax
        xml.at_css('ttFont > OS_2 > usWinAscent')['value'] = yMax
      
        xml.at_css('ttFont > head > yMin')['value'] = yMin
        xml.at_css('ttFont > hhea > descent')['value'] = yMin
        xml.at_css('ttFont > OS_2 > sTypoDescender')['value'] = yMin
        xml.at_css('ttFont > OS_2 > usWinDescent')['value'] = yMin.sub('-', '')
      
        xml.at_css('ttFont > OS_2 > sTypoLineGap')['value'] = '0'
        xml.at_css('ttFont > hhea > lineGap')['value'] = '0'
      
        xml.at_css('ttFont > OS_2 > ulUnicodeRange1')['value'] = '00000000 00000000 00000000 00000000'
        xml.at_css('ttFont > OS_2 > ulUnicodeRange2')['value'] = '00000000 00000000 00000000 00000000'
        xml.at_css('ttFont > OS_2 > ulUnicodeRange3')['value'] = '00000000 00000000 00000000 00000000'
        xml.at_css('ttFont > OS_2 > ulUnicodeRange4')['value'] = '00000000 00000000 00000000 00000000'
      
        xml.at_css('ttFont > OS_2 > ulCodePageRange1')['value'] = '00000000 00000000 00000000 00000000'
        xml.at_css('ttFont > OS_2 > ulCodePageRange2')['value'] = '00000000 00000000 00000000 00000000'
      
        gasp = xml.at_css('ttFont > gasp')
        if gasp
          if is_italic(name) or is_condensed(name)
            xml.at_css('ttFont > gasp').children= Nokogiri::XML::DocumentFragment.parse <<-eoxml
              <gaspRange rangeMaxPPEM="65535" rangeGaspBehavior="15"/>
            eoxml
          else
            xml.at_css('ttFont > gasp').children= Nokogiri::XML::DocumentFragment.parse <<-eoxml
              <gaspRange rangeMaxPPEM="8" rangeGaspBehavior="2"/>
              <gaspRange rangeMaxPPEM="18" rangeGaspBehavior="13"/>
              <gaspRange rangeMaxPPEM="65535" rangeGaspBehavior="15"/>
            eoxml
          end
        end
        
        style = "Regular"
        style = "Italic" if is_italic(name)
        style = "Bold" if is_bold(name)
        style = "Bold Italic" if is_italic(name) && is_bold(name)
        
        name_table_node = xml.at_css('ttFont > name')
        name_table_node.children= Nokogiri::XML::DocumentFragment.parse <<-eoxml
          <namerecord nameID="0" platformID="1" platEncID="0" langID="0x0">http://dejavu-fonts.org</namerecord>
          <namerecord nameID="1" platformID="1" platEncID="0" langID="0x0">#{name}</namerecord>
          <namerecord nameID="2" platformID="1" platEncID="0" langID="0x0">#{style}</namerecord>
          <namerecord nameID="3" platformID="1" platEncID="0" langID="0x0">1018</namerecord>
          <namerecord nameID="4" platformID="1" platEncID="0" langID="0x0">#{name} #{style}</namerecord>
          <namerecord nameID="5" platformID="1" platEncID="0" langID="0x0">Version 10.18</namerecord>
          <namerecord nameID="6" platformID="1" platEncID="0" langID="0x0">#{name}-#{style.sub(' ', '-')}</namerecord>
        
          <namerecord nameID="0" platformID="3" platEncID="1" langID="0x409">http://dejavu-fonts.org</namerecord>
          <namerecord nameID="1" platformID="3" platEncID="1" langID="0x409">#{name}</namerecord>
          <namerecord nameID="2" platformID="3" platEncID="1" langID="0x409">#{style}</namerecord>
          <namerecord nameID="3" platformID="3" platEncID="1" langID="0x409">1018</namerecord>
          <namerecord nameID="4" platformID="3" platEncID="1" langID="0x409">#{name} #{style}</namerecord>
          <namerecord nameID="5" platformID="3" platEncID="1" langID="0x409">Version 10.18</namerecord>
          <namerecord nameID="6" platformID="3" platEncID="1" langID="0x409">#{name}-#{style.sub(' ', '-')}</namerecord>
        eoxml
        
        if is_mono(name)
          xml.css('ttFont > GDEF').each { |node| node.remove }
          xml.css('ttFont > GPOS').each { |node| node.remove }
          xml.css('ttFont > GSUB').each { |node| node.remove }          
        end
      }
      
    end
        
    def self.using_ttx(src, dst_dir)
      dst = File.join(dst_dir, File.basename(src))
      return if File.exists?(dst) and File.stat(dst).mtime >= File.stat(src).mtime
      
      ttx = Pathname.new(src).sub_ext('.ttx').to_s
      FileUtils.remove ttx if File.exists?(ttx)
      
      Tool.ttx "-e -i", src      
      xml = Nokogiri::XML File.read(ttx)
      yield xml
      File.open(ttx, 'w') { |file| file.write xml.to_xml }      
      
      FileUtils.remove dst if File.exists?(dst)
      Tool.ttx "-e -i -d", dst_dir, ttx
    end
    
    def self.ensure_font_list_and_merge_unicode_superset_into_all_subsets()
      %w[tsn4n tsi4n tsn7n tsi7n
         psn4n psi4n psn7n psi7n
         tan4n tan2n tan7n
         pan4n pan2n pan7n
         tao4n
         tmn4n].each { |name| @@subsets[name] = {} }
      
      @@subsets.values.each { |subset|
        subset['unicodes'] = @@superset['unicodes']
        subset['characters'] = @@superset['characters']
      }
    end
    
    @@subsets = JSON.parse File.read Paths.get '_json/type-subsets.json'
    @@superset = { 
      'characters' => @@subsets.values.reduce("") { |accum, cur| accum << cur['characters'] },
      'unicodes' => @@subsets.values.reduce([]) { |accum, cur| accum |= cur['unicodes'] }
    }
  end
end
