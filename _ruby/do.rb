# encoding: UTF-8
# system 'cls'

require_relative 'framework'

module Jaap
  module Do
  
    def self.dirs_loaded_from
      $LOADED_FEATURES.map { |p| Pathname.new(Paths.realdirpath p).parent }.uniq.sort
    end

    def self.jekyll()
      Dir.chdir(Paths.get())
      require 'jekyll'
      puts dirs_loaded_from
      Jaap::Daemon.change('Jekyll', :white, :green)
      Kernel::load File.join(Gem.loaded_specs['jekyll'].full_gem_path, 'bin/jekyll')
    end
    
    def self.compass(*args)
      args = ['compile'] if args.empty?

      Dir.chdir(Paths.get())
      require 'compass'
      require 'compass/exec'
      puts dirs_loaded_from
      Jaap::Daemon.change('Compass', :red, :yellow)
      args << '--config' << Paths.get('_ruby/compass-config.rb')
      args << '--environment' << 'development'
      Compass::Exec::SubCommandUI.new(args).run!
    end
    
    def self.server()
      Reload.try_reload
      Daemon.change('WEBrick', :yellow, :white)
      Server::run()
    end
  
    def self.livereload()
      Dir.chdir(Paths.get())
      require 'livereload'
      puts dirs_loaded_from
      Jaap::Daemon.change('LiveReload', :blue, :white)
      conf = LiveReload::Config.new do |c|
        c.debug = false
        c.host  = '0.0.0.0'
        c.port  = 31018
        c.exts  = %w/html css js png gif jpg/
        c.exclusions = %w!*/.git/* */fonts/* */_*/* */.svn/* */.hg/*!
        c.apply_js_live  = false
        c.apply_css_live = true
        c.apply_images_live = true
        c.grace_period = 0.12
      end
      LiveReload::run [Jaap::Paths.get('_site')], conf
    end
    
    def self.clean()
      Paths.clean_or_make '_site'
      Paths.clean_or_make '.sass-cache'
      Paths.clean_or_make '.jaap-build'
      Paths.clean_or_make 'fonts'
    end
        
    def self.tools()
      Tool.list
    end
    
    def self.font(filter = false, psify = true, smcpify = true, numify = true)
      Font.build filter, psify, smcpify, numify
    end
    
    def self.sandbox()
    end

    command, *args = ARGV
    if ARGV.length < 1 or not public_methods.include? command.to_sym
      puts "Usage: do command args..., where command is one of:"
      puts "\n  " + (self.methods - self.class.methods).join("\n  ")
    else
      self.send command.to_sym, *args
    end
  end
end

