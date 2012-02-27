require 'sass'
require 'fileutils'
require 'json'

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
      Sass::Script::Bool.new(Jaap::in_development_mode)
    end
        
    def get_char_at(str, idx)
      assert_type str, :String
      assert_type idx, :Number
      Sass::Script::String.new(str.value[idx.value, 1])
    end
    
    def get_text_metric_at_font_size(metric, font, size)
      metric = metric.value
      font = font.value
      size = size.value
      
      to_sass @@textMetrics.get(font, metric, size)
    end
    
    def get_json_value(obj, *members)
      assert_type obj, :String
      
      file = Paths.get("_json/#{obj.value}.json")
      text = File.read(file)
      json = JSON.parse text
      
      val = members.inject(json) do |location, member|
        if is_number? member
          location[member]
        else
          assert_type member, :String      
          location.respond_to?( :keys) ? location[member.value] : nil
        end
      end
      
      to_sass val
    end
    
    def make_grid_svg(tem, baseline, ascent, cap, ex, descent)
      tem = tem.value
      baseline = baseline.value
      ascent = ascent.value
      cap = cap.value
      ex = ex.value
      descent = descent.value
      
      svg = <<-eosvg.unindent
        <svg xmlns="http://www.w3.org/2000/svg" width="#{tem}" height="#{tem}" viewbox="0 0 #{tem} #{tem}">
          <line stroke-width="1" x1="0" y1="#{ascent   + 0.5}" x2="#{tem}" y2="#{ascent   + 0.5}" stroke="#00f" stroke-opacity="0.4"/>
          <line stroke-width="1" x1="0" y1="#{cap      + 0.5}" x2="#{tem}" y2="#{cap      + 0.5}" stroke="#007" stroke-opacity="0.4"/>
          <line stroke-width="1" x1="0" y1="#{ex       + 0.5}" x2="#{tem}" y2="#{ex       + 0.5}" stroke="#004" stroke-opacity="0.4"/>
          <line stroke-width="1" x1="0" y1="#{baseline + 0.5}" x2="#{tem}" y2="#{baseline + 0.5}" stroke="#000" stroke-opacity="1.0"/>
          <line stroke-width="1" x1="0" y1="#{descent  + 0.5}" x2="#{tem}" y2="#{descent  + 0.5}" stroke="#000" stroke-opacity="0.4"/>
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
        Sass::Script::String.new(obj.to_s)
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
        super Paths.get('_json/type-metrics.windows-chrome-17.json')
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
  
  declare :get_text_metric_at_font_size, [:metric, :font, :size]
  declare :get_char_at, [:str, :idx]
  declare :get_json_value, [:obj], :var_args => true
  
  declare :split, [:str, :sep]
  
  declare :tint, [:color, :dilution]
  declare :shade, [:color, :dilution]  
end
