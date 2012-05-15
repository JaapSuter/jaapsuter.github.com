module Jaap
  module LiquidExt
    class Musicalize < Liquid::Block
      def initialize(tag_name, markup, tokens)
        super
      end
            
      def render(context)
        Jaap::Reload.try_reload
        "<div class='rhythm'><div class='melody'>\n\n#{super context}\n\n</div></div>"
      end
    end
  end
end

Liquid::Template.register_tag('musicalize', Jaap::LiquidExt::Musicalize)
