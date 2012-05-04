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

    def trim_to_font_base_name(name)
      to_sass (unwrap name)[/^[^-]+/]
    end

    def blank_font_style_and_weight(name)
      name = unwrap name
      name = name[0...2] + 'xx' + name[4..-1]
      to_sass name
    end
    
    def get_font_metric_at_size(family, ppem, metric)
      Jaap::Reload.try_reload

      family = unwrap trim_to_font_base_name family
      ppem = unwrap_px ppem
      metric = unwrap metric
      
      Sass::Script::Number.new @@textMetrics.get(family, metric, ppem), ['px']
    end

    def get_font_size_when_metric(family, metric, value)
      Jaap::Reload.try_reload

      family = unwrap trim_to_font_base_name family
      metric = unwrap metric      
      value = unwrap_px value
      
      ret = @@textMetrics[family][metric]
      ret = ret.index(value) if ret != nil
      if ret == nil
        raise Sass::SyntaxError, "#{family} has no font-size where #{known_metric} equals #{known_value}."
      end
      
      Sass::Script::Number.new ret, ['px']
    end

    def self.add_font_extensions()
      Jaap::Font.singleton_methods.each do |m|
        m = m.to_s
        puts m
        add_extension('Font', m) if m.start_with? 'is_' or m.start_with? 'get_'
      end
    end
            
    add_font_extensions()
  end
end

module Sass::Script::Functions
  include Jaap::SassExt
end
