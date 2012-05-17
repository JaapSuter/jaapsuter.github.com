require 'solid'

module Jaap
  module LiquidExt
    class Hamlerate < Solid::Block

      tag_name :hamlerate

      def display
        Jaap::Reload.try_reload
        Hamlerate.hamlerate yield
      end

      def self.hamlerate(text)
        require "haml"
        
        options = { 
          :format => :html5,
          :ugly => false,
          :autoclose => %w[meta img link br hr input area param col base source],
        }
        
        text = squish_indent(text)
        Haml::Engine.new(text, options).render
      end

      def self.squish_indent(text)
        text.gsub /^.{#{text[/\s*^\s/].length}}/, ''
      end
    end
  end
end
