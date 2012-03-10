# require_relative doesnt' work because this configuration file is 
# pulled in using ruby eval (during which the file location of 
# the current stackframe and its parent aren't pointing to
# this actual file)... so we do it old-school
::Kernel::require File.expand_path File.join File.dirname(__FILE__), 'framework.rb'
::Kernel::require File.expand_path File.join File.dirname(__FILE__), 'sass-extensions.rb'

http_path = "/"
fonts_dir = "fonts"
javascripts_dir = "js"
sass_dir = "_sass"
images_dir = "img"
css_dir = "_site/css"
output_style = :compressed
line_comments = false
::Sass::Script::Number.precision = 3

# for repeating-linear-gradient
# https://github.com/chriseppstein/compass/issues/401
Compass::BrowserSupport.add_support('repeating-linear-gradient', 'webkit', 'moz', 'o', 'ms')

if environment == :development
  output_style = :nested
  line_comments = true
  Jaap::Config.enable_development_mode
end

on_stylesheet_saved do |filename|
  Jaap::Compile.css_minify filename
end

if not $PROGRAM_NAME.start_with? 'C:/Ruby193/bin/compass' # Todo, Jaap Suter, February 2012: ugly ugly ugly, last minute hack
  
  if true
    Jaap::Compile.build_now_then_watch "fonts/*.{ttf,otf}", self do |ttf_or_otf|
        Jaap::Compile.ttf_or_otf ttf_or_otf
        scss = ::Jaap::Paths.get '_sass/head.scss'
        FileUtils.touch scss if File.exists?(scss)
    end
  
    Jaap::Compile.build_now_then_watch "**/*.html.haml", self do |haml|
        Jaap::Compile.haml haml
    end
  end
  
  Jaap::Paths.get('../../coffee-script/').tap do |iced_dir|
    Jaap::Compile.watch '**/*.{iced,coffee}', iced_dir, self do |coffee|
        Jaap::Compile.iced_compiler coffee, iced_dir
    end
  end
  
  Jaap::Compile.build_now_then_watch "**/*.{iced,coffee}", self do |coffee|
      Jaap::Compile.iced coffee      
  end
end
