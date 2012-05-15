require_relative '../liquid-ext/musicalize'
require_relative '../liquid-ext/pullquote'

module Jaap
  module LiquidExt
    class Hamlize < Liquid::Block
      def initialize(tag_name, markup, tokens)
        super
      end
      
      def squish_indent(text)
        text.gsub /^.{#{text[/\s*^\s/].length}}/, ''
      end
      
      def hamlize(text)
        require "haml"
        
        options = { 
          :format => :html5,
          :ugly => false,
          :autoclose => %w[meta img link br hr input area param col base source],
        }
        
        text = squish_indent(text)
        Haml::Engine.new(text, options).render
      end

      def render(context)
        Jaap::Reload.try_reload
        hamlize super context 
      end
    end
  end
end

Liquid::Template.register_tag('hamlize', Jaap::LiquidExt::Hamlize)
