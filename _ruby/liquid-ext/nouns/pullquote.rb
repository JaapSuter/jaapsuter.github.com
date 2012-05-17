module Jaap
  module LiquidExt
    class Pullquote < Liquid::Block
      
      def initialize(tag_name, markup, tokens)
        super
      end

      def render(context)
        Jaap::Reload.try_reload
        "<aside><div class='pullquote' data-pullquote='' role='presentation'>#{super context}</div></aside>"
      end
    end
  end
end

Liquid::Template.register_tag('pullquote', Jaap::LiquidExt::Pullquote)
