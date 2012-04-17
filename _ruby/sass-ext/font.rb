require 'sass'
require 'fileutils'
require 'json'
require_relative '../framework/config'
require_relative 'util'

puts "Jaap::SassExt::Font is rocking da kaboozle!"

module Jaap
  module SassExt
   
    @@textMetrics = Class.new(::Jaap::Cached) do
      def initialize()
        super Paths.get('_json/type-metrics.json')
      end
      
      def [](elem)
        maybe_load()
        @dict.dig(elem) || "#{elem.join('.')} not found"
      end
      
      def get(*path)
        maybe_load()
        @dict.dig(*path) || "#{path.join('.')} not found"
      end
    end.new

    def get_metric_for_metric(unknown_metric, family, known_metric, known_value)
      family = unwrap family
      known_metric = unwrap known_metric
      known_value = unwrap known_value
      unknown_metric = unwrap unknown_metric
      
      if known_metric == 'ppem'
        to_sass @@textMetrics.get(family, unknown_metric, known_value)
      elsif unknown_metric == 'ppem'
        ppem = @@textMetrics[family][known_metric].index(known_value)
        raise Sass::SyntaxError, "#{family} has no font-size where #{known_metric} equals #{known_value}." if ppem == nil
        to_sass ppem
      else
        raise Sass::SyntaxError, "To get a metric for a metric, either the known or the unknown must be the pixels-per-em (ppem)."
      end
    end

    def self.add_font_extensions()
      Jaap::Font.singleton_methods.each do |m|
        m = m.to_s
        add_extension('Font', m) if m.start_with? 'is_' or m.start_with? 'get_'
      end
    end
            
    add_font_extensions()
  end
end

module Sass::Script::Functions
  include Jaap::SassExt

  declare :get_metric_for_metric, [:unknown_metric, :family, :known_metric, :known_value]    
end
