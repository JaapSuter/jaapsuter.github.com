require 'sass'

module Jaap
  module SassExt
   
    # Mixes a color with white to the dilution indicated by percentage
    # Courtesy of Robert Head: http://blog.roberthead.net/?p=37
    def tint(color, dilution = Sass::Script::Number.new(50))
      assert_type color, :Color
      white = Sass::Script::Color.new([255, 255, 255, 1])
      assert_type dilution, :Number
      unless (0..100).include?(dilution.value)
        raise ArgumentError.new(
          "Dilution #{dilution} must be between 0% and 100%"
        )
      end
      Sass::Script::Functions::mix(color, white, Sass::Script::Number.new(100-dilution.value))
    end

    # Mixes a color with black to the dilution indicated by percentage
    # Courtesy of Robert Head: http://blog.roberthead.net/?p=37
    def shade(color, dilution = Sass::Script::Number.new(50))
      assert_type color, :Color
      black = Sass::Script::Color.new([0, 0, 0, 1])
      assert_type dilution, :Number
      unless (0..100).include?(dilution.value)
        raise ArgumentError.new(
          "Dilution #{dilution} must be between 0% and 100%"
        )
      end
      Sass::Script::Functions::mix(color, black, Sass::Script::Number.new(100-dilution.value))
    end
  end    
end

module Sass::Script::Functions
  include Jaap::SassExt
end