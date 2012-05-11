module Jaap
  module LiquidExt
    class Musicalize < Liquid::Block
      def initialize(tag_name, markup, tokens)
        super
      end

      def squish_indent(text)
        text.gsub /^.{#{text[/\s*^\s/].length}}/, ''
      end      
      
      def musicalize(text)
        html = <<-eohtml
          <div class='rhythm'>
            <div class='melody'>
              #{text}
            </div>
            <div class='drum' role='presentational'></div>
          </div>
        eohtml
        
        html.unindent.gsub(/\n/, '').squeeze(' ')
      end

      def render(context)
        Jaap::Reload.try_reload
        inner = musicalize super context 
        puts inner
        inner
      end
    end
  end
end

Liquid::Template.register_tag('musicalize', Jaap::LiquidExt::Musicalize)
