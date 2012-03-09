# encoding: UTF-8

gem 'sass', '3.2.0.alpha.63'
gem 'compass', '0.12.rc.1.99c1d37'
gem 'jekyll', '0.11.2.jaap'
gem 'livereload', '1.6.1'
gem 'redcarpet', '2.1.0'

require 'rubygems'
require 'fileutils'
require 'pathname'
require 'open3'
require 'win32api'
require 'colorize'

require_relative 'framework/paths'
require_relative 'framework/cached'
require_relative 'framework/reload'

::Jaap::Paths.glob('_ruby/framework/monkey/*.rb') { |rb| require rb }

$LOAD_PATH.unshift File.dirname __FILE__

module Jaap
  autoload :Font, 'framework/font'
  autoload :Compile, 'framework/compile'
  autoload :Daemon, 'framework/daemon'
  autoload :Tool, 'framework/tool'
  autoload :Server, 'framework/server'  
  autoload :Typogruby, 'framework/forked/typogruby/typogruby'
  autoload :Dress, 'framework/dress'
  
  puts Typogruby.widont 'trwrtwe fdsa fsda asdf fasd'
end



