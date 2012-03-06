module Jaap
  module Tool
  
    def self.list()
      lazy_initialize
      
      puts "Ruby script has the following tools available:\n"
      puts "\n  " + @@tools.join("\n  ")
    end
    
    def self.execute(name, path, *args)
      lazy_initialize
      
      stdin = nil;
      ok_exit_codes = [0]
      args = args.reject { |arg|
        if arg.is_a? Hash
          stdin = arg[:stdin]
          ok_exit_codes = arg[:ok_exit_codes] || [0]
          true
        else
          false
        end
      }
      
      ::Jaap::Reload.try_reload
    
      command = path + ' ' + args.join(' ')
      puts command.colorize(:yellow)
      
      exitstatus = -1
      
      begin
        Daemon.scoped_change(name, :light_white, :blue) {
          if stdin
            stdout, stderr, status = Open3.capture3(command, :stdin_data => stdin)
            exitstatus = status.exitstatus
            if not ok_exit_codes.include? status.exitstatus
              puts "Error in #{name}, exit status: #{status}".colorize(:red)
              puts stdout.colorize(:yellow)
              puts stderr.colorize(:red)
              File.open(Paths.get(".jaap-build/stdin-causing-error.#{name}"), 'w') { |f| f.write(stdin) }
            else
              return stdout
            end            
          else
            IO.popen(command + ' 2>&1') do |pipe|
              pipe.sync = true
              while str = pipe.gets
                print "    " + str
              end              
            end
            exitstatus = $?.exitstatus            
          end
        }
      rescue => err
        puts 'Rescued...'
        puts "\t" + err.to_s
        puts "\t" + err.inspect.to_s
        puts "\t" + err.backtrace.join("\n\t")
      end
      
      puts "    Done, exit: #{exitstatus}".colorize(0 == exitstatus ? :green : :red)
      exitstatus == 0
    end
    
    @@tools = []
    @@ext_tool_prefix = { :exe => '', :cmd => '', :bat => '', :py => 'python' }
    
    def self.lazy_initialize()
      return if not @@tools.empty?
      
      require 'open3'      
      Paths.glob('_tools', '**/*.{exe,cmd,bat,py}').each { |path|
        name = File.basename(path, File.extname(path)).downcase.gsub(/\W+/, ' ').strip.gsub(' ', '_')        
        
        if @@ext_tool_prefix.key? name
          @@ext_tool_prefix[@@ext_tool_prefix.key(name)] = path
        end
          
        @@tools << name
        
        class_eval <<-end_eval
          def self.#{name}(*args)
            execute("#{name}", prefix_tool_path('#{path}'), *args)
          end
        end_eval
      }
    end
    
    def self.prefix_tool_path(path)
      ext = File.extname(path)[1..-1].to_sym
      prefix = @@ext_tool_prefix[ext]
      prefix.nil? ? path : "#{prefix} #{path}"
    end
    
    def self.method_missing(method, *args, &block)
      lazy_initialize
      
      if methods.include? method.to_sym
        send(method, *args, &block)
      else
        puts "There is no tool called '#{method}', sorry..."
        puts "\n"
        list
      end
    end    
  end
end
