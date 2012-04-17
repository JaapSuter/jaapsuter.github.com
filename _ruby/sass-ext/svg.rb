require 'sass'
require 'fileutils'
require 'json'
require_relative '../framework/config'

module Jaap
  module SassExt

    def make_svg_circle(radius, color, circle_type)
      img = if circle_type.value == "disc"
        %Q{<circle cx="#{radius.value}" cy="#{radius.value}" r="#{radius.value}" stroke-width="0" fill="#{color}"/>}
      else
        %Q{<circle cx="#{radius.value}" cy="#{radius.value}" r="#{radius.value}" stroke="#{color}" stroke-width="1" fill="white"/>}
      end
      svg_envelope img
    end
      
    def make_svg_baseline_grid(family, ppem, ppgd)
      
      Jaap::Reload.try_reload
      
      ppgd = (unwrap ppgd).to_i
      ppem = (unwrap ppem).to_i

      family = unwrap family
      
      half_leading = (ppgd - ppem) / 2.0
      
      metrics = @@textMetrics[family]
      
      baseline = half_leading + metrics['baseline'][ppem]
      ascent = baseline - metrics['ascent'][ppem]
      cap = baseline - metrics['cap'][ppem]
      ex = baseline - metrics['ex'][ppem]
      descent = baseline + metrics['descent'][ppem]
      
      make_grid_svg(family, ppem, ppgd, baseline, ascent, cap, ex, descent)
    end
    
    def make_grid_svg(family, ppem, ppgd, baseline, ascent, cap, ex, descent)
      ppem, ppgd, baseline, ascent, cap, ex, descent = 
        unwrap(ppem, ppgd, baseline, ascent, cap, ex, descent)

      path = nil # In production, return an inline data-url
      path = "img/grid-#{family}-#{ppem}-#{ppgd}.svg" # Useful during development        

      if false
        img = %Q{
          <rect fill-opacity="0.1" width="1" y="#{two_decimals(ex)}" height="#{two_decimals(baseline - ex)}"/>
        }
      
        svg_envelope img, "1", ppgd, nil, path

      else
        grid_height_px = 256
          
        one_pixel = grid_height_px.to_f / ppgd
      
        ppem, ppgd, baseline, ascent, cap, ex, descent = 
          [ppem, ppgd, baseline, ascent, cap, ex, descent].map { |e| e * grid_height_px.to_f / ppgd }
        
        img = %Q{
          <rect fill="#005869" fill-opacity="0.37" width="1" y="#{two_decimals(ex      )}" height="#{one_pixel.ceil}"/>
          <rect fill="#971f03" fill-opacity="0.63" width="1" y="#{two_decimals(baseline)}" height="#{one_pixel.ceil}"/>        
        }
      
        svg_envelope img, "1", "#{grid_height_px}", nil, path
      end
      
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
    
    private
    
    def two_decimals(n)
      '%.2f' % n
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
  end
end

module Sass::Script::Functions
  include Jaap::SassExt
        
  declare :make_svg_circle, [:radius, :color, :circle_type]
  declare :make_svg_baseline_grid, [:family, :ppem, :ppel]  
end

