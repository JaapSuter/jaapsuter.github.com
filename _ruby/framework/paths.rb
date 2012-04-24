require 'pathname'
require 'windows/file'
require 'windows/handle'
# require 'windows/ntfs/winternl'
require 'windows/msvcrt/io'      
    
module Jaap
  module Paths
    
    
    @@ROOT = Pathname.new(File.join(File.dirname(__FILE__), '../..')).cleanpath

    def self.get(*args)
      ret = Pathname.new args.empty? ? '.' : File.join(args)
      puts "Warning: path request #{ret} begins with slash '/', absolute intended?" if ret.to_s.start_with? '/'
      ret = @@ROOT + ret if not ret.absolute?()
      ret = ret.cleanpath.to_s   
    end

    def self.get_or_make(*args)
      dir = get(*args)
      Dir.mkdir(dir) if not Dir.exists? dir
      dir
    end
    
    def self.clean_or_make(dir)
      dir = get_or_make(dir)
      Paths.glob(dir, '**/*.*').each { |file|
        FileUtils.remove file
        puts "removing: " + file
      }
      dir
    end
    
    def self.suffix(file, suffix, ext = nil)
      file = Paths.get file
      File.join File.dirname(file), File.basename(file, '.*') + suffix + (ext ? ext : File.extname(file))
    end

    def self.glob(*args)
      files = Dir.glob(get(*args))
      return block_given? ? files.each { |file| yield file } : files
    end

    def self.to_xming(dir)
       '/' + File.expand_path(dir).sub(':', '').sub('\\', '/')
    end

    def self.realdirpath(path)
      RealDirPath.get path
    end

    private

    class RealDirPath

      include Windows::Handle
      include Windows::File
      # include Windows::NTFS::Winternl
      include Windows::MSVCRT::IO

      def self.get(p)
        RealDirPath.new(p).realdirpath.gsub /^\\\\\?\\/, ''
      end

      attr_reader :realdirpath

      def initialize(p)
        if (! File.exist?(p) && ! Dir.exist?(p))
          @realdirpath = p          
        else      
          h = nil
          begin
            max_path_plus_one = 260 + 1
            buffer = 0.chr * max_path_plus_one
            flags = 0
            ok = nil
        
            fh = File.open p, 'r'
            oh = get_osfhandle fh.fileno
            len = GetFinalPathNameByHandle(oh, buffer, buffer.size - 1, flags)
            @realdirpath = buffer[0, len]          
          ensure
            fh.close if fh
          end
        end
      end
    end
  end
end
