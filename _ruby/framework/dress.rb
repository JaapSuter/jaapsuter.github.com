require 'nokogiri'
require_relative '../typogruby-fork/typogruby'

module Jaap
  module Dress
    @@last_update_cache = Hash.new {|h, src| h[src] = Time.at(0) }
  
    def self.last_hook_before_write(src, text, dst)
      
      # Todo, Jaap Suter, March 2012, this reload hack is rather silly...
      last_update_cache = @@last_update_cache
      Jaap::Reload.try_reload
      @@last_update_cache = last_update_cache
            
      if text.nil? or not dst.end_with? '.html'
        return text
      end
      
      if (File.mtime(src) == @@last_update_cache[src]) and File.exists? dst
        return File.read(dst)
      else
        @@last_update_cache[src] = File.mtime(src)
      end

      tidy_args = "--tidy-mark no --indent no --wrap 0 --ascii-chars no --preserve-entities yes
                   --break-before-br yes --sort-attributes none --vertical-space no --hide-endtags yes
                   --char-encoding ascii --numeric-entities yes --output-html yes --show-errors 2 --quiet 1
                   --show-warnings no --bare yes --write-back yes".gsub(/\s+/, ' ')
      
      begin
        
        text = Typogruby.improve text
        html = Nokogiri::HTML text
        html = @@abbrs.abbreviate html
        html = stripeify html
        html = fix_pullquotes html
        text = html.to_html :encoding => 'US-ASCII'
        
        # Todo:
        # <a ref='external' href="http://wikipedia.org">go to wikipedia</a>
        # <a rel='license' href="http://www.opensource.org/licenses/mit-license.php">MIT Licensed</a>
        # <a rel='help' href="help.html">Site help</a>
        # <a rel='tag' href="site/help/">Music</a>
        # <a rel="bookmark" href="a.html">Post Permalink</a>

        # Unclusterhug some undesirable Nokogiri mashups, not pretty - but gotta get 'r done.
        puts "Tidying: #{src}"        
        text = text.gsub "-->", "-->\n"
        text = text.gsub '<meta http-equiv="Content-Type" content="text/html; charset=US-ASCII">', ''
        text = text.gsub '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">', ''
        text = text.encode 'US-ASCII'
        text = Tool.w3c_tidy_html5 tidy_args, :stdin => text, :ok_exit_codes => [0, 1]
        text = text.gsub /\[%\s*presentational-empty\s*%\]/, ''
        text = text.gsub /\[%\s*excerpt-begin\s*%\]/, ''
        text = text.gsub /\[%\s*excerpt-end[^%]*%\]/, ''
        
        fix_boolean_attributes text
                                
        dst_dir = Pathname.new(dst).parent
        Dir.mkdir(dst_dir) if not Dir.exists? dst_dir        
        
        File.open(Paths.suffix(dst, '.ajax'), 'w') do |f|
          html = Nokogiri::HTML text, nil, 'US-ASCII'
          ajax = "<!DOCTYPE html>\n" + html.at_css('title').to_html + "\n" + html.at_css('.ajax').to_html
          ajax = ajax.encode 'US-ASCII'
          ajax = Tool.w3c_tidy_html5 tidy_args, :stdin => ajax, :ok_exit_codes => [0, 1]
          ajax = ajax.gsub('[%presentational empty%]', '')
          
          f.write ajax
        end
        
        text
      rescue => err
        puts 'Rescued...'
        puts "\t" + err.to_s
        puts "\t" + err.inspect.to_s
        puts "\t" + err.backtrace.join("\n\t")
        puts "\t"
        puts "\t" + text.to_s[0..100]
        text
      end
    end
    
    def self.stripeify(html)
      html.css('.stripe').each do |elem|
        # elem['data-content'] = elem.content = elem.content.gsub("\n", ' ').squeeze(' ').strip
        word_idx = -1
        elem.xpath('child::text()').each do |text|
          replacement = text.content.gsub /[^\s]+/ do |word|
            "<span class='s w-#{word_idx += 1} l-#{word.length}' data-content='#{word}'>#{word}</span>"
          end
          text.replace Nokogiri::XML::DocumentFragment.parse replacement
        end
      end
        
      html
    end

    def self.fix_boolean_attributes(text)
      %w[checked disabled autoplay async autofocus controls
         default defer formnovalidate hidden ismap itemscope loop multiple
         novalidate open pubdate readonly required reversed
         scoped seamless selected
      ].each do |ba|
        text.gsub! "#{ba}=\"\"", ba
      end
    end

    def self.fix_pullquotes(html)
      html.css('[data-pullquote]').each do |pq|
        pq['data-pullquote'] = pq.content.strip
        pq.content = ''
      end

      html
    end
        
    def self.add_anchor_data_content_attrs(html)
      html.css('a').each do |a|
        has_elements = 0 < a.children.count {|c| c.element? }
        if has_elements
          a.css('*').each do |c|
            # Really, this should recurse instead of doing just one level.
            c["data-underline"] = c.content.gsub /\s+/, ' '
          end
        else
          a["data-underline"] = a.content.gsub /\s+/, ' '
        end
      end
        
      html
    end
    
    def self.first_hook_after_write(dst) 
      # return dst if not dst.end_with? '.html'
    end
    
    class Abbrs < ::Jaap::Cached
      def initialize()
        super Paths.get('_abbr.yml')
      end
      
      def abbreviate(html)
        maybe_load()
        
        html.css('span.caps').each do |span|
          next if 0 == span.content.length or
                  not span.content[0].match /[A-Z]/ or
                  not span.content.match /[A-Z.]*/
          span.replace Nokogiri::HTML.fragment @dict[span.content].gsub '$', span.content
        end
      
        maybe_save()
        html
      end
    end
    
    @@abbrs = Abbrs.new
  end
end
