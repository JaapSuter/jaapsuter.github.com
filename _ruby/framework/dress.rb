require 'nokogiri'

module Jaap
  module Dress
    def self.last_hook_before_write(text, dest)
      Jaap::Reload.try_reload
            
      return text if text.nil? or not dest.end_with? '.html'
      return text
      
      tidy_args = "--tidy-mark no --indent no --wrap 0 --ascii-chars no --preserve-entities yes
                   --break-before-br yes --sort-attributes alpha --vertical-space no --hide-endtags yes
                   --char-encoding ascii --numeric-entities yes --output-html yes --show-errors 2 --quiet 1
                   --show-warnings no --bare yes --write-back yes".gsub(/\s+/, ' ')
      
      begin
        text = Typogruby.improve text
        html = Nokogiri::HTML text
        html = @@abbrs.abbreviate html
        html = clean_descender_underlines html
        text = html.to_html :encoding => 'US-ASCII'
        text = text.gsub '<meta http-equiv="Content-Type" content="text/html; charset=US-ASCII">', ''
        text = text.gsub '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">', ''
        text = text.encode 'US-ASCII'
        text = Tool.tidy tidy_args, :stdin => text, :ok_exit_codes => [0, 1]
        
        File.open(Paths.suffix(dest, '.ajax'), 'w') do |f|
          html = Nokogiri::HTML text, nil, 'US-ASCII'
          ajax_text = html.at_css('#main').to_html
          ajax_text = ajax_text.encode 'US-ASCII'
          ajax_text = Tool.tidy tidy_args, :stdin => ajax_text, :ok_exit_codes => [0, 1]
          ajax_text = ajax_text.gsub('[%presentational empty%]', '')
          
          f.write ajax_text          
        end
        
        text = text.gsub('[%presentational empty%]', '')
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
    
    def self.first_hook_after_write(dest) 
      # return dest if not dest.end_with? '.html'
    end
    
    def self.clean_descender_underlines(html)    
      html.css('a').each do |a|
        next if 0 == a.content.length
        foo = 0
        a.inner_html = Nokogiri::HTML.fragment a.content.gsub(/([gjpqpy3459]+)|([^gjpqpy3459]+)/) { |match|
          if /[gjpqpy3459]+/.match match
            "<span class='no-underline'>#{match}</span>"
          else
            "<span class='yes-underline'>#{match}</span>"
          end
        }
      end
      
      html
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
