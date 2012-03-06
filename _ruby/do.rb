# encoding: UTF-8
system 'cls'

require_relative 'framework'

module Jaap
  module Do
    def self.jekyll()
      Dir.chdir(Paths.get())
      require 'jekyll'
      Jaap::Daemon.change('Jekyll', :white, :green)
      Kernel::load File.join(Gem.loaded_specs['jekyll'].full_gem_path, 'bin/jekyll')
    end
    
    def self.compass()
      Dir.chdir(Paths.get())
      require 'compass'
      require 'compass/exec'
      Jaap::Daemon.change('Compass', :red, :yellow)
      args = [
        'watch',
        '--config', Paths.get('_ruby/compass-config.rb'),
        '--environment', 'development',
      ]
      Compass::Exec::SubCommandUI.new(args).run!.call
    end
    
    def self.server()
      Reload.try_reload
      Daemon.change('WEBrick', :yellow, :white)
      Server::run()
    end
  
    def self.livereload()
      Dir.chdir(Paths.get())
      require 'livereload'
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
        c.grace_period = 0.05
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
      Paths.glob('**/*') do |filename|
        puts "#{filename}: #{File.size(filename).to_human_ish}" if File.exists? filename
      end
    end
    
    def self.calculate_gzipped_size(file)
      require 'zlib'      
      Zlib::Deflate.deflate(File.read(file)).length
    end
    
    def self.gzip_something()
      Paths.glob '_temp/*' do |file|
        puts "#{File.size file}-#{self.calculate_gzipped_size file} ?= #{File.basename file}"
      end
    end
    
    def self.git_something()
      Dir.chdir(Paths.get()) do 
        sha_head = Tool.git "rev-list HEAD -n1 --abbrev-commit", :stdin => ''
        sha_head.strip!
        sha_abbrev_len_additional = 2
        sha_abbrev_len = sha_head.length + sha_abbrev_len_additional
        sha_abbrev_len = 4
        puts sha_abbrev_len
        puts sha_head.length
        
        sha_some_file = Tool.git "hash-object", Paths.get('_ruby/framework/server/json-servlet.rb'), :stdin => ''
        sha_some_file.strip!
        puts sha_head
        puts sha_some_file
        puts sha_some_file[0, sha_abbrev_len]
        
        # git _config.yml
        # puts repo.git.rev_parse({:short => true}, "5a01a469846c693fab350b4f1cc7084c3657c744").chomp      
        # repo.git.rev_list({:max_count => 1, :abbrev_commit => true }, "HEAD")
        # git.rev_list({:max_count => 10, :header => true}, "master")
      end
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
