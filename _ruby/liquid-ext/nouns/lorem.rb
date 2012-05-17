require 'solid'

module Jaap
  module LiquidExt
    class Lorem < Solid::Tag

      tag_name :lorem

      @@words = nil

      def lazy_class_initialize
        @@words = @@words || Paths.glob('_posts/*.markdown').reduce([]) { |words, markdown|
          words += File.read(markdown).split.reject { |w| w.match /[^a-zA-Z0-9'-]/ }
        }.shuffle!
      end

      def display
        Jaap::Reload.try_reload
        lazy_class_initialize
               
        words_per_sentence = (6..11)
        sentences_per_paragraph = (3..6)

        word_counts = (0..rand(sentences_per_paragraph)).map { rand words_per_sentence }
        sentences = word_counts.map { |n| @@words.sample(n).tap { |ws| ws.first.smart_capitalize! }.join(' ') + '.' }
        paragraph = sentences.join(' ')

        "<p>#{paragraph}</p>"
      end      
    end    
  end
end