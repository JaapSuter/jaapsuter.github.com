module Jaap
  module LiquidExtensions
    class IncludeWildcardTag < Liquid::Tag
      def initialize(tag_name, wildcard, tokens)
        super
        @wildcard = wildcard.strip        
      end

      def render(context)
        combined = Paths.glob('_includes', @wildcard.strip) do |file|
          source = File.read(file)
          partial = Liquid::Template.parse(source)
          context.stack do
            return partial.render(context)
          end
        end
        
        combined.join("\n")
      end
    end
  end
end

Liquid::Template.register_tag('include_wildcard', Jaap::LiquidExtensions::IncludeWildcardTag)
