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
    
    def unwrap(*v)
      v = v.map { |e| 
        if e.is_a? Fixnum
          e
        elsif e.respond_to? 'value'
          e.value
        else
          e
        end
      }
      v.length == 1 ? v.first : v
    end
    
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
    
    def make_svg_circle(radius, color, circle_type)
      img = if circle_type.value == "disc"
        %Q{<circle cx="#{radius.value}" cy="#{radius.value}" r="#{radius.value}" stroke-width="0" fill="#{color}"/>}
      else
        %Q{<circle cx="#{radius.value}" cy="#{radius.value}" r="#{radius.value}" stroke="#{color}" stroke-width="1" fill="white"/>}
      end
      svg_envelope img
    end
      
    def make_svg_baseline_grid(family, ppem, ppgd)
      ppgd = unwrap ppgd
      ppem = unwrap ppem
      family = unwrap family
      
      half_leading = (ppgd - ppem) / 2
    
      metrics = @@textMetrics[family]
      
      baseline = half_leading + metrics['baseline'][ppem]
      ascent = baseline - metrics['ascent'][ppem]
      cap = baseline - metrics['cap'][ppem]
      ex = baseline - metrics['ex'][ppem]
      descent = baseline + metrics['descent'][ppem]
      
      make_grid_svg(family, ppem, ppgd, baseline, ascent, cap, ex, descent)
    end
    
    def round_to_str(n)
      '%.2f' % n
    end
    
    def make_grid_svg(family, ppem, ppgd, baseline, ascent, cap, ex, descent)
      grid_height_px = 256
          
      ppem, ppgd, baseline, ascent, cap, ex, descent = 
        unwrap(ppem, ppgd, baseline, ascent, cap, ex, descent)
      
      path = nil # In production, return an inline data-url
      # path = "img/grid-#{family}-#{ppem}-#{ppgd}.svg" # Useful during development
      
      one_pixel = grid_height_px.to_f / ppgd
      
      ppem, ppgd, baseline, ascent, cap, ex, descent = 
        [ppem, ppgd, baseline, ascent, cap, ex, descent].map { |e| e * grid_height_px.to_f / ppgd }
        
      img = %Q{
        <rect fill="#005869" fill-opacity="0.37" width="1" y="#{round_to_str(ex      )}" height="#{one_pixel.ceil}"/>
        <rect fill="#971f03" fill-opacity="0.63" width="1" y="#{round_to_str(baseline)}" height="#{one_pixel.ceil}"/>
      }
      
      svg_envelope img, "1", "#{grid_height_px}", nil, path
      
      # scale = 4 # Making this much larger breaks background repeating
      #           # in Firefox (11ish) at large zoom values. This value
      #           # is good enough to make zooming not go too blurry to 
      #           # begin with (on Firefox, which scales SVG for background-image
      #           # rather poorly). 
      # half_pix = 0.5 * scale
      # ppem *= scale
      # ppgd *= scale
      # baseline *= scale
      # ascent *= scale
      # cap *= scale
      # ex *= scale
      # descent *= scale
      # 
      # img = %Q{<rect fill="#dde" width="1" y="#{baseline}" height="#{ppgd}" />}
      
      # Not used:
      #
      #   <line stroke-width="1" x1="0" y1="#{ascent   + half_pix}" x2="#{ppgd}" y2="#{ascent   + half_pix}" shape-rendering="crispEdges" stroke="#400" stroke-opacity="0.2"/>
      #   <line stroke-width="1" x1="0" y1="#{cap      + half_pix}" x2="#{ppgd}" y2="#{cap      + half_pix}" shape-rendering="crispEdges" stroke="#040" stroke-opacity="0.2" stroke-dasharray="4 2"/>
      #   <line stroke-width="1" x1="0" y1="#{ex       + half_pix}" x2="#{ppgd}" y2="#{ex       + half_pix}" shape-rendering="crispEdges" stroke="#040" stroke-opacity="0.2" stroke-dasharray="2 4"/>
      #   <line stroke-width="1" x1="0" y1="#{baseline + half_pix}" x2="#{ppgd}" y2="#{baseline + half_pix}" shape-rendering="crispEdges" stroke="#000" stroke-opacity="0.7"/>
      #   <line stroke-width="1" x1="0" y1="#{descent  + half_pix}" x2="#{ppgd}" y2="#{descent  + half_pix}" shape-rendering="crispEdges" stroke="#004" stroke-opacity="0.2"/>
      #   <!-- <rect fill="#a89" width="#{ppgd}" y="#{ascent}"   height="#{ppgd - ascent}" /> -->
      #   <!-- <rect fill="#8a9" width="#{ppgd}" y="#{cap}"      height="#{ppgd - cap}" /> -->
      #   <!-- <rect fill="#b39" width="#{ppgd}" y="#{ex}"       height="#{ppgd - ex}" /> -->
      #   <!-- <rect fill="#091" width="#{ppgd}" y="#{descent}"  height="#{ppgd - descent}" /> -->
      #
      #   <style type="text/css">
      #     <![CDATA[
      #       * {
      #         image-rendering:optimizeSpeed;             /* Legal fallback                 */
      #         image-rendering:-moz-crisp-edges;          /* Firefox                        */
      #         image-rendering:-o-crisp-edges;            /* Opera                          */
      #         image-rendering:-webkit-optimize-contrast; /* Chrome (and eventually Safari) */
      #         image-rendering:optimize-contrast;         /* CSS3 Proposed                  */
      #         -ms-interpolation-mode:nearest-neighbor;   /* IE8+                           */
      #         shape-rendering: crispEdges;
      #       }
      #     ]]>
      #   </style>
      #
      # preserveAspectRatio='none'
      # svg_envelope img, "#{ppgd}px", "#{2 * ppgd}px", [0, 0, ppgd, 2 * ppgd], path
      # svg_envelope img, "1", "#{2 * ppgd}", nil, path
    end
    
    def svg_envelope(content, width = '', height = '', viewbox = '', path = nil)
        
        # Chris Eppstein's version, from https://gist.github.com/1059334. Do we need the xml header?
        # 
        # %Q{<?xml version="1.0" encoding="utf-8"?> <svg version="1.1" xmlns="http://www.w3.org/2000/svg">#{content}</svg>}
        
        width = "width='#{width}'" unless width.to_s.empty?
        height = "height='#{height}'" unless height.to_s.empty?
        viewbox = "viewBox='#{viewbox[0]} #{viewbox[1]} #{viewbox[2]} #{viewbox[3]}'" unless viewbox.nil?
        svg = %Q{
          <svg xmlns="http://www.w3.org/2000/svg" #{width} #{height} #{viewbox}>
            #{content}
          </svg>
          }.gsub("\n", ' ').squeeze(' ').gsub(' <', '<').gsub(' >', '>').gsub(' />', '/>').gsub('> ', '>')
        
        if path
          File.open(Paths.get(path), 'w') { |f| f.write(svg) }
          Sass::Script::String.new("url(../#{path})")
        else
          inline_image_string(svg, 'image/svg+xml')
        end
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

module Sass::SCSS
  class Parser
    if $sass_scss_parser_tok_aliased.nil?
      alias_method :old_tok, :tok
      $sass_scss_parser_tok_aliased = true
    end
    
    def tok(rx, last_group_lookahead = false)      
      if rx.to_s == STATIC_VALUE.to_s
        if len = tok?(rx)
          token = @scanner.peek len
          if /\d+gd/.match token
            return nil
          end
        end
      end
      
      old_tok rx, last_group_lookahead
    end
  end
end

if false and $sass_script_number_units_conversion_patched.nil?
  
  Sass::Script::Number::CONVERTABLE_UNITS['el'] = 5
  Sass::Script::Number::CONVERTABLE_UNITS['cap'] = 6
  Sass::Script::Number::CONVERTABLE_UNITS['ex'] = 7
  Sass::Script::Number::CONVERTABLE_UNITS['ascent'] = 8
  Sass::Script::Number::CONVERTABLE_UNITS['descent'] = 9

  Sass::Script::Number::CONVERSION_TABLE[0].push *[nil, nil, nil, nil, nil]
  Sass::Script::Number::CONVERSION_TABLE[1].push *[nil, nil, nil, nil, nil]
  Sass::Script::Number::CONVERSION_TABLE[2].push *[nil, nil, nil, nil, nil]
  Sass::Script::Number::CONVERSION_TABLE[3].push *[nil, nil, nil, nil, nil]
  Sass::Script::Number::CONVERSION_TABLE[4].push *[nil, nil, nil, nil, nil]
  Sass::Script::Number::CONVERSION_TABLE.push [nil, nil, nil, nil, nil,  61,  62,  63, 64, 65]
  Sass::Script::Number::CONVERSION_TABLE.push [nil, nil, nil, nil, nil, nil,  72,  73, 74, 75]
  Sass::Script::Number::CONVERSION_TABLE.push [nil, nil, nil, nil, nil, nil, nil,  83, 84, 85]
  Sass::Script::Number::CONVERSION_TABLE.push [nil, nil, nil, nil, nil, nil, nil, nil, 94, 95]
  Sass::Script::Number::CONVERSION_TABLE.push [nil, nil, nil, nil, nil, nil, nil, nil, 14, 15]
  
  $sass_script_number_units_conversion_patched = true
  
  puts "Sass::Script::Number::CONVERTABLE_UNITS: #{Sass::Script::Number::CONVERTABLE_UNITS}"
  puts "Sass::Script::Number::CONVERSION_TABLE: #{Sass::Script::Number::CONVERSION_TABLE}"
end

module Sass::Script
  if false
    class Number
      if $sass_script_number_perform_aliased.nil?
        alias_method :old_perform, :_perform
        $sass_script_number_perform_aliased = true
      end
    
      def _perform(environment)
      
        if @numerator_units.include? 'gd'
          ppem = environment.var('body-ppem')
          ppgd = environment.var('body-ppgd')
        
          if ppem and ppgd
            one_gd = Number.new(1, ['gd'])
            one_em = Number.new(1, ['em'])
            return self.div(one_gd).times(ppgd).div(ppem).times(one_em);
          end        
        end
      
        old_perform environment
      end
    end
  end
  
  module Functions
    include Jaap::SassExtensions
        
    declare :raise_error_message, [:message]
    declare :try_reload_extensions, []
    declare :in_development_mode, []
    
    declare :make_svg_circle, [:radius, :color, :circle_type]
    declare :make_svg_baseline_grid, [:family, :ppem, :ppel]
  
    declare :get_metric_for_metric, [:unknown_metric, :family, :known_metric, :known_value]
    declare :get_char_at, [:str, :idx]
    declare :get_json_value_func, [:obj], :var_args => true
  
    declare :split, [:str, :sep]
  
    declare :tint, [:color, :dilution]
    declare :shade, [:color, :dilution]  
  end
end

