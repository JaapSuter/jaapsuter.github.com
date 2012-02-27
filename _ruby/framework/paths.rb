module Jaap
  module Paths
    require 'pathname'
    
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
  end
end
