require 'solid'

module Jaap
  module LiquidExt
    class Rhythm < Solid::Block

      tag_name :rhythm
            
      def display
        Jaap::Reload.try_reload
        "<div class='rhythm'><div class='melody'>\n\n#{yield}\n\n</div></div>"
      end
    end
  end
end
