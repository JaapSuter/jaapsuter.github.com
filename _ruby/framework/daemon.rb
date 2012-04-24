require 'thread'

module Jaap
  class Daemon
    
    @@stdout_sem = Mutex.new  
    @@stdout_params = Hash.new {|h, k| h[k] = { :title => '', :color => :white, :background => :black } }
    
    def self.set_synchronized(params) @@stdout_sem.synchronize { @@stdout_params[Thread.current.object_id] = params } end
    def self.get_synchronized() @@stdout_sem.synchronize { @@stdout_params[Thread.current.object_id] } end
   
    def self.initialize()
      $stdout.sync = true
      $stderr.sync = true
      
      hook_threading = true
      hook_std_out_and_err = true
      
      if hook_threading
        Thread.instance_eval { 
          alias :new_original :new
          alias :start_original :start
        
          def self.get_synchronized() @@stdout_sem.synchronize { @@stdout_params[Thread.current.object_id] } end      
          def self.set_synchronized(params) @@stdout_sem.synchronize { @@stdout_params[Thread.current.object_id] = params } end
      
          def self.new(*args)
            params = get_synchronized()
          
            new_original(*args) {
              set_synchronized(params)
              yield *args
            }
          end
      
          def self.start(*args)
            params = get_synchronized()
          
            start_original(*args) {
              set_synchronized(params)
              yield *args
            }
          end
        }
      end
      
      if hook_std_out_and_err
        block = proc {
          alias :write_original :write
        
          def self.get_synchronized() @@stdout_sem.synchronize { @@stdout_params[Thread.current.object_id] } end
      
          def write(s)
            params = get_synchronized()          
            prefix = params[:title]
            prefix = "#{prefix.colorize(params)}: " if prefix != ''
            
            @@stdout_sem.synchronize {
              s.each_line do |line|
                next if line.strip.empty?
                write_original prefix + line.chomp + "\n"
              end
            }
          end
        }
      
        $stdout.instance_eval &block
        $stderr.instance_eval &block
      end
      
      change('', :white, :black)
    end
    
    def self.once_and_wait(title, color, background)
      t = start(title, color, background, retry_on_failure = false) { yield }
      t.join()
    end
    
    def self.scoped_change(title, color, background)
      params = get_synchronized()
      change(title, color, background)
      begin
        yield
      ensure
        change(params[:title], params[:color], params[:background])
      end
    end
    
    def self.change(title, color, background)
      @SetConsoleTitle ||= Win32API.new( "kernel32", "SetConsoleTitle", ['p'], 'l' )
      @SetConsoleTitle.call(title)
      params = { :title => title, :color => color, :background => background }
      set_synchronized params
    end
    
    def self.start(title, color, background, retry_on_failure = true)
      Thread.new { 
        change(title, color, background)
        while true
          failure = false
          begin
            yield
          rescue => err
            puts 'Rescued...'
            puts "\t" + err.to_s
            puts "\t" + err.inspect.to_s
            puts "\t" + err.backtrace.join("\n\t")
            failure = true
          end
      
          break if !retry_on_failure
          break if !failure
        end
      }
    end
    
    initialize()
  end
end
