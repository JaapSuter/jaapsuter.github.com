module Jaap
  module LiquidExt
    class SizedParagraph < Liquid::Tag
      @@short = Set.new
      @@medium = Set.new
      @@long = Set.new
      
      def initialize(tag_name, markup, tokens, length)
         super tag_name, markup, tokens
         @length = length
      end

      def render(context)
        Jaap::Reload.try_reload
        
        set = nil
        case @length
        when :short
          set = @@short = @@short.empty? ? get_bunch_of_paragraphs(5, 27) : @@short
        when :medium
          set = @@medium = @@medium.empty? ? get_bunch_of_paragraphs(27, 41) : @@medium
        when :long
          set = @@long = @@long.empty? ? get_bunch_of_paragraphs(41, 88) : @@long
        else
          return "Unsupported paragraph length '#{@length}', must be one of :short, :medium, :long"
        end
        
        if set.empty?
          "<p>No paragraph found... todo!</p>" 
        else    
          set.to_a[rand set.length]
        end
      end
      
      def get_bunch_of_paragraphs(min_wc, max_wc)
        require 'nokogiri'
        set = Set.new
        Paths.glob('_site/**/*.html').each { |file|
          html = Nokogiri::HTML File.read(file), encoding = 'UTF-8'
          html.css('#content p').each { |p|
            next if p.at_css('object, iframe') != nil
            wc = p.content.scan(/[\w-]+/).size
            if (min_wc..max_wc).include? wc
              set << p.to_html
            end
          }
        }
        set
      end
    end
    
    class ShortParagraph < SizedParagraph
      def initialize(tag_name, markup, tokens)
        super tag_name, markup, tokens, :short
      end
    end
    
    class MediumParagraph < SizedParagraph
      def initialize(tag_name, markup, tokens)
        super tag_name, markup, tokens, :medium
      end
    end
    
    class LongParagraph < SizedParagraph
      def initialize(tag_name, markup, tokens)
        super tag_name, markup, tokens, :long
      end
    end
  end
end

Liquid::Template.register_tag('short_paragraph', Jaap::LiquidExt::ShortParagraph)
Liquid::Template.register_tag('medium_paragraph', Jaap::LiquidExt::MediumParagraph)
Liquid::Template.register_tag('long_paragraph', Jaap::LiquidExt::LongParagraph)
