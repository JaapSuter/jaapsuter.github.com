module Jaap
  module LiquidExtensions
    class Hyphenate < Liquid::Block
      require 'text/hyphen'

      @@left = 2
      @@right = 2
      @@hyp = Text::Hyphen.new(:language => 'en_us', :left => @@left, :right => @@right)
        
      def initialize(tag_name, markup, tokens)
        super
      end
      
      def self.hyphenate(text)
        ret = ''
        shy_placeholder = '|'
        text.scan(/\w+|\W+/) { |word|
          w = word.dup
          if w.length > (@@left + @@right) and not w.include? shy_placeholder and w.match(/\S/) != nil
            @@hyp.hyphenate(w).each_with_index do |pos, n|
              w[pos.to_i + n, 0] = shy_placeholder if pos != 0
            end
          end
          ret += w.gsub(shy_placeholder, '&shy;')
        }
        ret
      end

      def render(context)
        Jaap::Reload.try_reload
        self.class.hyphenate super context
      end
    end
        
    def hyphenate(text)
      Hyphenate.hyphenate(text)
    end    
  end
end

Liquid::Template.register_filter(Jaap::LiquidExtensions)
Liquid::Template.register_tag('hyphenate', Jaap::LiquidExtensions::Hyphenate)
