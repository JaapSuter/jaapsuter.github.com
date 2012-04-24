require 'sass'
require 'fileutils'
require 'json'
require_relative '../framework/config'
require_relative 'util'

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

    def get_font_metric(family, unknown, where_its, will_be)
      Jaap::Reload.try_reload

      family = unwrap family
      known_metric = unwrap where_its
      known_value = unwrap_px will_be
      unknown_metric = unwrap unknown
      
      if known_metric == 'ppem'
        ret = @@textMetrics.get(family, unknown_metric, known_value)
      elsif unknown_metric == 'ppem'
        ret = @@textMetrics[family][known_metric]
        ret = ret.index(known_value) if ret != nil
        if ret == nil
          raise Sass::SyntaxError, "#{family} has no font-size where #{known_metric} equals #{known_value}."
        end
      else
        raise Sass::SyntaxError, "To get a metric for a metric, either the known or the unknown must be the pixels-per-em (ppem)."
      end

      to_sass ret
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

  declare :get_font_metric, [:family, :metric, :where_its, :will_be]  
end
