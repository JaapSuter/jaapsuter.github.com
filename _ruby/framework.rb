# encoding: UTF-8

gem 'sass', '3.2.0.alpha.0'
gem 'compass', '0.13.alpha.0.48d532b'
gem 'jekyll', '0.11.2.jaap'
gem 'livereload', '1.6.1'
gem 'redcarpet', '2.1.0'
gem 'windows-pr', '1.2.1'

require 'rubygems'
require 'fileutils'
require 'pathname'
require 'open3'
require 'win32api'
require 'colorize'

require_relative 'framework/paths'
require_relative 'framework/cached'
require_relative 'framework/reload'
require_relative 'framework/config'

::Jaap::Paths.glob('_ruby/framework/monkey/*.rb') { |rb| require rb }

$LOAD_PATH.unshift File.dirname __FILE__

module Jaap
  autoload :Font, 'framework/font'
  autoload :Compile, 'framework/compile'
  autoload :Daemon, 'framework/daemon'
  autoload :Tool, 'framework/tool'
  autoload :Server, 'framework/server'
  autoload :Dress, 'framework/dress'
  autoload :Typogruby, 'framework/forked/typogruby/typogruby'
end



