require 'solid'
require 'dimensions'

module Jaap
  module LiquidExt
      
    class Video < Solid::Tag

      tag_name :video
      
      def display(args)
        Jaap::Reload.try_reload

        return "Error, video must have a name attribute" if ! args[:name]        
        
        name = args[:name]

        mp4  = Paths.get 'videos', name + '.mp4'
        ogg  = Paths.get 'videos', name + '.ogg'
        webm = Paths.get 'videos', name + '.webm'
        poster = Paths.get 'videos/posters', name + '.jpg'

        args[:mp4_size] = File.size(mp4).to_human_ish '&nbsp;'
        args[:ogg_size] = File.size(ogg).to_human_ish '&nbsp;'
        args[:webm_size] = File.size(webm).to_human_ish '&nbsp;'

        metadata = Tool.mplayer "-vo null -ao null -frames 0 -identify", mp4, :stdin => ''
        metadata = metadata.each_line.to_a.grep(/ID_.*/).collect { |n| n[3..n.length].split('=') }
        metadata = metadata.inject({}) { |hash, (key, value)| hash[key.to_sym] = value.chomp; hash }

        args[:width] = metadata[:VIDEO_WIDTH]
        args[:height] = metadata[:VIDEO_HEIGHT]
        args[:length] = metadata[:LENGTH]
        args[:title] = args[:title] || name.gsub('-', ' ').titlecase
        
        poster_width, poster_height = Dimensions.dimensions poster
        args[:poster_width] = poster_width
        args[:poster_height] = poster_height

        Jaap::Compile.haml_to_string Paths.get('_includes/component/video.dynamic.haml'), args        
      end
    end
  end
end
