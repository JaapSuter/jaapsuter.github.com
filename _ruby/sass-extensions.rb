require 'sass'
require 'fileutils'
require 'json'
require_relative 'framework/config'

module Jaap
  module SassExtensions
   
    def try_reload_extensions()
      Jaap::Reload.try_reload      
      Sass::Script::Bool.new(true)
    end
    
    def raise_error_message(message)
      raise Sass::SyntaxError, message.value
    end
    
    def in_development_mode()
      Sass::Script::Bool.new(Jaap::Config.in_development_mode)
    end
        
    def get_char_at(str, idx)
      assert_type str, :String
      assert_type idx, :Number
      Sass::Script::String.new(str.value[idx.value, 1])
    end
    
    def get_json_value_func(obj, *members)
      
      assert_type obj, :String
            
      file = Paths.get("_json/#{obj.value}.json")
      text = File.read(file)
      json = JSON.parse text
      
      val = members.inject(json) do |location, member|
        if is_number? unwrap member
          location[unwrap member]
        else
          assert_type member, :String      
          location.respond_to?( :keys) ? location[unwrap member] : nil
        end
      end
      
      to_sass val
    end
    
    def unwrap(v)
      return v if v.is_a? Fixnum
      return v.value if v.respond_to? 'value'
      v      
    end
    
    def get_metric_for_metric(unknown_metric, family, known_metric, known_value)
      family = unwrap family
      known_metric = unwrap known_metric
      known_value = unwrap known_value
      unknown_metric = unwrap unknown_metric
      
      if known_metric == 'ppm'
        to_sass @@textMetrics.get(font, unknown_metric, known_value)
      elsif unknown_metric == 'ppm'
        ppm = @@textMetrics[family][known_metric].index(known_value)
        raise Sass::SyntaxError, "#{family} has no font-size where #{metric} equals #{value}." if ppm == nil
        to_sass ppm
      else
        raise Sass::SyntaxError, "To get a metric for a metric, either the known or the unknown must be the pixels-per-em (ppm)."
      end
    end
    
    def get_font_size_where_metric_is(family, metric, value)
      family = unwrap family
      metric = unwrap metric
      value = unwrap value
      
      
    end
    
    def get_metric_when_font_size_is(family, size, metric)
      family = unwrap family
      metric = unwrap metric
      size = unwrap size
      
      
    end
    
    def make_grid_svg_for_font(tem, em, family)
      tem = unwrap tem
      em = unwrap em
      family = unwrap family
      
      half_leading = (tem - em) / 2
    
      metrics = @@textMetrics[family]
      
      baseline = half_leading + metrics['baseline'][em]
      ascent = baseline - metrics['ascent'][em]
      cap = baseline - metrics['cap'][em]
      ex = baseline - metrics['ex'][em]
      descent = baseline + metrics['descent'][em]
      
      make_grid_svg(tem, baseline, ascent, cap, ex, descent)
    end
    
    def make_grid_svg(tem, baseline, ascent, cap, ex, descent)
      scale = 8
      half_pix = 0.5 * scale
      tem = scale * (unwrap tem)
      baseline = scale * (unwrap baseline)
      ascent = scale * (unwrap ascent)
      cap = scale * (unwrap cap)
      ex = scale * (unwrap ex)
      descent = scale * (unwrap descent)
      
      # Not used:
      # <line stroke-width="1" x1="0" y1="#{ascent   + half_pix}" x2="#{tem}" y2="#{ascent   + half_pix}" shape-rendering="crispEdges" stroke="#400" stroke-opacity="0.2"/>
      # <line stroke-width="1" x1="0" y1="#{cap      + half_pix}" x2="#{tem}" y2="#{cap      + half_pix}" shape-rendering="crispEdges" stroke="#040" stroke-opacity="0.2" stroke-dasharray="4 2"/>
      # <line stroke-width="1" x1="0" y1="#{ex       + half_pix}" x2="#{tem}" y2="#{ex       + half_pix}" shape-rendering="crispEdges" stroke="#040" stroke-opacity="0.2" stroke-dasharray="2 4"/>
      # <line stroke-width="1" x1="0" y1="#{baseline + half_pix}" x2="#{tem}" y2="#{baseline + half_pix}" shape-rendering="crispEdges" stroke="#000" stroke-opacity="0.7"/>
      # <line stroke-width="1" x1="0" y1="#{descent  + half_pix}" x2="#{tem}" y2="#{descent  + half_pix}" shape-rendering="crispEdges" stroke="#004" stroke-opacity="0.2"/>
      svg = <<-eosvg.unindent
        <svg xmlns="http://www.w3.org/2000/svg" width="#{tem}" height="#{2 * tem}" viewbox="0 0 #{tem} #{2 * tem}">
          <!-- <rect fill="#a89" width="#{tem}" y="#{ascent}"   height="#{tem - ascent}" /> -->
          <!-- <rect fill="#8a9" width="#{tem}" y="#{cap}"      height="#{tem - cap}" /> -->
          <!-- <rect fill="#b39" width="#{tem}" y="#{ex}"       height="#{tem - ex}" /> -->
               <rect fill="#e9e3fe" width="#{tem}" y="#{baseline}" height="#{tem}" />
          <!-- <rect fill="#091" width="#{tem}" y="#{descent}"  height="#{tem - descent}" /> -->
        </svg>
      eosvg
      
      File.open(Paths.get('img/grid.svg'), 'w') { |f| f.write(svg) }
      
      to_sass 0
    end

    def split(str, sep = '.')
      assert_type str, :String
      assert_type sep, :String
      arr = str.value.split(sep.value)
      arr.map! { |ar| Sass::Script::String.new(ar) }
      Sass::Script::List.new(arr, :space)
    end
  
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
    
    def is_number?(object)
      true if Float(object) rescue false
    end
    
    def is_bool?(object)
      !!object == object
    end       
    
    def to_sass(obj)
      if obj.kind_of?(Array)
        arr = obj.map! { |ar| to_sass(ar) }
        Sass::Script::List.new(arr, :space)
      elsif is_number?(obj)
        Sass::Script::Number.new(obj)
      elsif is_bool?(obj)
        Sass::Script::Bool.new(obj)
      elsif obj.nil?
        Sass::Script::String.new("!ERROR, obj == nil")
      else
        Sass::Script::Parser.parse obj, 0, 0
      end
    end
    
    def self.add_extension(owner, method)
      self.module_eval <<-end_eval
        def #{method}(*args)
          to_sass (#{owner}.#{method} *(args.map {|arg| arg.value}))
        end
      end_eval
    end    
    
    def self.add_font_extensions()
      Jaap::Font.singleton_methods.each do |m|
        m = m.to_s
        add_extension('Font', m) if m.start_with? 'is_' or m.start_with? 'get_'
      end
    end
            
    add_font_extensions()
    
    class TextMetrics < ::Jaap::Cached
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
    end
    
    @@textMetrics = TextMetrics.new
  end
end

module Sass::Script::Functions
  include Jaap::SassExtensions
  
  declare :raise_error_message, [:message]
  declare :try_reload_extensions, []
  declare :in_development_mode, []
  
  declare :get_metric_for_metric, [:unknown_metric, :family, :known_metric, :known_value]
  declare :get_char_at, [:str, :idx]
  declare :get_json_value_func, [:obj], :var_args => true
  
  declare :split, [:str, :sep]
  
  declare :tint, [:color, :dilution]
  declare :shade, [:color, :dilution]  
end
