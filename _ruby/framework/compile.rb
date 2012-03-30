require 'closure-compiler'
require 'haml'
require 'windows/window'
require 'windows/console'
          
module Jaap
  module Compile
  
    @@previous_file_size = Hash.new {|h, src| h[src] = 0 }
    
    def self.error(file, msg)
      # Compass already shows the error in the console, at some
      # point I may enjoy a notify (window flash, growl, etc.)
    end
    
    def self.haml(src)
      dst = src.sub('.html.haml', '.html')
    
      with_rescue do
        options = { 
          :format => :html5,
          :ugly => false,
          :filename => src,
          :autoclose => %w[meta img link br hr input area param col base source],
        }
        
        puts "HAML".colorize( :color => :white, :background => :red ) + ": #{src}"
        engine = Haml::Engine.new File.read(src), options        
        File.open(dst, 'w') {|f| f.write(engine.render) }
        
        Paths.glob('**/*.{html,markdown}') { |src|
          next if src.start_with? Paths.get('_site')
          next if not File.exists? src
          with_err_ignored { FileUtils.touch src }
        }        
      end
    end
    
    def self.arg(name, value = nil, condition = true)
      return '' if !condition
      return "--#{name} #{value}" if value
      return "--#{name}"
    end
    
    def self.iced_compiler(src, iced_dir)
      with_rescue do
        
        rel = src.sub iced_dir, ''
        dir = File.dirname rel
        file = File.basename rel        
        parser = File.join iced_dir, 'lib/coffee-script/parser.js'
        parser_last_known_good = parser + '.last_known_good'
        
        ok = true
        
        if rel == '/src/grammar.coffee'
          ok &&= ::Jaap::Tool.node 'bin\coffee --output lib\coffee-script src\grammar.coffee'
          ok &&= ::Jaap::Tool.node 'bin\cake build:parser'          
          
          FileUtils.cp parser, parser_last_known_good if ok
        end
        
        if dir == '/src'
          ok &&= ::Jaap::Tool.node 'bin\cake build'
        end
        
        if ok
          some_other_coffee_file = Paths.get '_coffee/jaap/sandbox.coffee'
          FileUtils.touch some_other_coffee_file if File.exists?(some_other_coffee_file)
        else
          ::Jaap::Tool.git 'checkout lib'
          FileUtils.cp parser_last_known_good, parser if File.exists? parser_last_known_good
        end
      end
    end
    
    def self.iced(src)
      with_rescue do
      
        src = Paths.get src
        hook = Paths.get('_coffee/compiler/hook.coffee')
        
        if false
          ::Jaap::Tool.coffeelint "-f", Paths.get('_json/coffee-lint.json'), src
        end
                
        if src == hook
          some_other_coffee_file = Paths.get '_coffee/jaap/sandbox.coffee'
          FileUtils.touch some_other_coffee_file if File.exists? some_other_coffee_file
        else        
          src_dir = Pathname.new(src).parent
		      dst_dir = src_dir.sub Paths.get('_coffee'), Paths.get('js')
        
          Dir.mkdir(dst_dir) if not Dir.exists? dst_dir
          
          ::Jaap::Tool.iced arg('modularize', Paths.get('_coffee')),
                            arg('runtime', 'inline', 'modules.coffee' == File.basename(src)),
                            arg('runforce', nil, 'modules.coffee' == File.basename(src)),
                            arg('runtime', 'none', 'modules.coffee' != File.basename(src)),
                            arg('output', dst_dir),
                            arg('require', hook),
                            arg('compile', src)
        
          if true
            concatted = Paths.get('js/jaap.all.js')
            File.open(concatted, 'w') do |dst|
              concattees = (Paths.glob('js/**/*.js') - Paths.glob('js/*.all*.js')).sort_by(&:length).reverse
              concattees = Paths.glob('js/modules.js') + (concattees - Paths.glob('js/modules.js'))
              
              puts 'Concattenating: '
              puts '  ' + concattees.join("\n  ")
              concattees.each do |src|
                dst.write File.read src
              end
            end
          
            self.js_minify_with_advanced_optimizations concatted
          end
          
          some_other_js_file = ::Jaap::Paths.get 'js/tail.js'
          FileUtils.touch some_other_js_file if File.exists? some_other_js_file
        end
      end
    end
    
    def self.js_minify_with_advanced_optimizations(src)
      with_rescue do
        dst = File.join Pathname.new(src).parent, File.basename(src, '.js') + '.min.js'
        min = @@google_closure_compiler.compile File.read src
        File.open(dst, 'w') { |f| f.write min }
        
        dst = File.join Pathname.new(src).parent, File.basename(src, '.js') + '.min.dev.js'
        min = @@google_closure_compiler_debug.compile File.read src
        File.open(dst, 'w') { |f| f.write min }
      end
    end
    
    def self.css_minify(src)
      return if not File.exists? src
      
      with_rescue do
        min_src = File.join Pathname.new(src).parent, File.basename(src, '.css') + '.min.css'
        
        ::Jaap::Tool.yui_compressor '--type css -v -o', min_src, src        
      
        size = File.size(src)
        prev_size = @@previous_file_size[src]
        delta_size = size - prev_size
  
        min_size = File.size(min_src)
        min_prev_size = @@previous_file_size[min_src]
        min_delta_size = min_size - min_prev_size
  
        puts "#{src}: #{prev_size.to_human_ish} #{delta_size < 0 ? '-' : '+'} #{delta_size.abs.to_human_ish} = #{size.to_human_ish}"
        puts "#{min_src}: #{min_prev_size.to_human_ish} #{min_delta_size < 0 ? '-' : '+'} #{min_delta_size.abs.to_human_ish} = #{min_size.to_human_ish}"
  
        @@previous_file_size[src] = size
        @@previous_file_size[min_src] = min_size
      end     
    end
    
    def self.ttf_or_otf(src)
      woff = Pathname.new(src).sub_ext('.woff').to_s
      FileUtils.remove woff if File.exists?(woff)
      ::Jaap::Tool.sfnt2woff(src)
      
      eot = Pathname.new(src).sub_ext('.eot').to_s
      FileUtils.remove eot if File.exists?(eot)
      ::Jaap::Tool.eotfast_1(src, eot)      
    end
    
    def self.with_rescue()
      begin
        # Todo, Jaap Suter, March 2012, this reload hack is rather silly...
        previous_file_size = @@previous_file_size
        Jaap::Reload.try_reload
        @@previous_file_size = previous_file_size
                
        yield
      rescue => err
        puts 'Rescued...'
        puts "\t" + err.to_s
        puts "\t" + err.inspect.to_s
        puts "\t" + err.backtrace.join("\n\t")
      end
    end
    
    def self.with_err_ignored()
      begin
        yield
      rescue        
      end
    end
    
    def self.watch(glob, working_dir, watcher)
      glob = File.join working_dir, glob.sub(working_dir, '')
      
      watcher.watch glob do |project_dir, relative_path|
        file = Pathname.new(File.join(project_dir, relative_path)).cleanpath.to_s
        if File.exists?(file)
          Dir.chdir(working_dir) do
            yield file
          end
        end
      end
    end
    
    def self.build_now_then_watch(glob, maybe_working_dir, watcher = nil)
    
      if not watcher
        watcher = maybe_working_dir
        maybe_working_dir = ::Jaap::Paths.get
      else      
        maybe_working_dir = ::Jaap::Paths.get maybe_working_dir
      end
      
      glob = File.join maybe_working_dir, glob
      
      Dir.chdir(maybe_working_dir) do
        Dir.glob(glob) do |file|          
          yield Paths.get file
        end
      end
      
      watch(glob, maybe_working_dir, watcher) do |file|
        yield Paths.get file
      end
    end
    
    @@google_closure_compiler = Closure::Compiler.new(
      :warning_level => 'DEFAULT',
      :language_in => 'ECMASCRIPT5_STRICT',
      :externs => Paths.get('_coffee/closure/externs.js'),
      :compilation_level => 'ADVANCED_OPTIMIZATIONS')
      
    @@google_closure_compiler_debug = Closure::Compiler.new(
      :warning_level => 'DEFAULT',
      :language_in => 'ECMASCRIPT5_STRICT',
      :debug => true,
      :formatting => 'PRETTY_PRINT',
      :externs => Paths.get('_coffee/closure/externs.js'),
      :compilation_level => 'ADVANCED_OPTIMIZATIONS')
  end
end

