require 'json'
require 'yaml'
YAML::ENGINE.yamler = 'syck'

module Jaap
  class Cached
    def initialize(path)
      @path = path
      @mtime = Time.at(0)
      @changed = false
      @dict = Hash.new { |h, k| @changed = true; h[k] = k }
      
      case File.extname(path)
      when '.yml'
        @parse = YAML.method(:load)
        @dump = YAML.method(:dump)
      when '.json'
        @parse = JSON.method(:parse)
        @dump = lambda { |s| JSON.pretty_generate(s, :array_nl => '[% presentational newline undo %]').gsub(/\[% presentational newline undo %\]\s*/, ' ') }
      else
        @parse = lambda { |s| {} }
        @dump = lambda { |s| s }
      end
      
      maybe_load()
      maybe_save()
    end
      
    protected
      
    def maybe_save()
      Jaap::Reload.try_reload
      
      return if File.exists?(@path) && !@changed
        
      File.open(@path, 'w') { |f| f.write @dump.call @dict }
      @mtime = File.stat(@path).mtime
      @changed = false
    end
      
    def maybe_load()
      if File.exists? @path
        Jaap::Reload.try_reload
        
        mtime = File.stat(@path).mtime
        if mtime >= @mtime
          @mtime = mtime
          loaded_dict = @parse.call(File.read(@path))
          @dict.merge! (loaded_dict or @dict)
        end
      end
    end
  end
end
