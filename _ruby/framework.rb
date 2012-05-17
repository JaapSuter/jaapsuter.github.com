# encoding: UTF-8

# I'm tired of the cargo cult goat sacrifices I keep making to 
# appease the Gem, Bundler, and IDE/Debugger trifecta...
#
# Since my problems are caused because I'm forking gems anyway, heck
# I might as well go all the way, and on top of doing:

this_file_dir = File.dirname __FILE__
local_gem_dir = File.expand_path File.join this_file_dir, '../..'

gem 'sass', :path => File.join(local_gem_dir, 'sass')
gem 'compass', :path => File.join(local_gem_dir, 'compass')
gem 'jekyll', :path => File.join(local_gem_dir, 'jekyll')

# ...or any other of the thirty seven attempts I've made
# across Gemfiles, gemspecs, and other files -- I'll simply 
# craft my own load-path that is sure to only work on my computer.
#
# Sigh....


more_load_paths = %w[
    ../../jekyll/lib
    ../../compass/lib
    ../../sass/lib
    .    
  ].each { |p| $LOAD_PATH.unshift File.expand_path File.join this_file_dir, p }

require 'rubygems'
require 'fileutils'
require 'pathname'
require 'open3'
require 'win32api'
require 'colorize'

gem 'livereload', '1.6.1'
gem 'redcarpet', '2.1.0'
gem 'text-hyphen', '1.2'
gem 'linecache19', '>= 0.5.13'
gem 'ruby-debug-base19x', '0.11.30.pre10'
gem 'ruby-debug-ide', '0.4.17.beta9'
gem 'ruby_core_source', '0.1.5'
gem 'tigerlily-solid', :require => 'solid'

gem 'windows-pr'
gem 'win32-changenotify'
gem 'win32-api'
gem 'win32-event'
gem 'win32-ipc'
gem 'win32-process'

gem 'colorize'
gem 'json'
gem 'closure-compiler'
gem 'haml'
gem 'nokogiri'
gem 'rubypants'

require_relative 'framework/paths'
require_relative 'framework/cached'
require_relative 'framework/reload'
require_relative 'framework/config'

::Jaap::Paths.glob('_ruby/monkey/*.rb') { |rb| require rb }

module Jaap
  autoload :Font, 'framework/font'
  autoload :Compile, 'framework/compile'
  autoload :Daemon, 'framework/daemon'
  autoload :Tool, 'framework/tool'
  autoload :Server, 'framework/server'
  autoload :Dress, 'framework/dress'  
end
