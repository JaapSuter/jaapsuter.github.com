require 'solid'
require 'dimensions'

module Jaap
  module LiquidExt      
    class Img < Solid::Tag
      
      tag_name :img
      
      def display(args)
        Jaap::Reload.try_reload
        
        return "Error, image missing src attribute" if ! args[:src]
        
        src = Paths.get('_img', args[:src])
          
        return "Error, image #{src} does not exist." if ! File.exist? src
        
        dst = Paths.suffix Paths.get('img', args[:src]), '-' + git_sha_abbrev_encode(git_blob_sha src)
            
        unless File.exists?(dst) and File.stat(dst).mtime >= File.stat(src).mtime
          dst_dir = Pathname.new(dst).parent
          Dir.mkdir(dst_dir) if not Dir.exists? dst_dir
          FileUtils.cp src, dst
        end
        
        unless args.has_key? :width and args.has_key? :height
          width, height = Dimensions.dimensions dst
          args[:width] = width unless args.has_key? :width
          args[:height] = height unless args.has_key? :height
        end
        
        args[:src] = dst[(Paths.get.length)..-1]
                                
        "<img #{args.collect { |k,v| (!!v == v) ? "#{k}" : "#{k}=\"#{v}\"" }.join ' '}>"
      end

      def git_blob_sha(file)
        data = File.open(file, 'rb') { |io| io.read }
        header = "blob #{data.size}\0"
        store = header + data
        Digest::SHA1.hexdigest store
      end

      def git_sha_abbrev_encode(str)
        sha_abbr_len = 6
        str[0, sha_abbr_len].to_i(16).to_s(36)
      end
    end
  end
end
