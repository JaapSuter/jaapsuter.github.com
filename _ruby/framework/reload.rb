module Jaap
  class Reload    
    
    @@timestamps = Hash.new {|h, file| h[file] = Time.at(0) }
  
    def self.parse_caller(at)
      if /^(.+?):(\d+)(?::in `(.*)')?/ =~ at
        file = Regexp.last_match[1]
		    line = Regexp.last_match[2].to_i
		    method = Regexp.last_match[3]
		    [file, line, method]
	    else
        ['unknown file', 'unknown line', 'unknown method']
      end
    end
    
    def self.read_char
      Win32API.new("crtdll", "_getch", [], "L").Call.chr
    end
    
    def self.try_reload
      file = parse_caller(caller(1).first).first
      timestamp = File.stat(file).mtime
      
      if @@timestamps[file] < timestamp
        @@timestamps[file] = timestamp
        catch :done do
          loop {
            begin
              puts 'Reloading because modified: ' + file
              load file
              throw :done
            rescue Exception => err
              puts 'Exception in Jaap::Reload::try_reload: '
              puts "\t" + err.to_s
              puts "\t" + err.inspect.to_s
              puts "\t" + err.backtrace.join("\n\t")
              loop do
                puts '[r] to retry, [i] to ignore, [q] to quit.'
                case read_char()
                when 'r'
                  break
                when 'i'
                  throw :done
                when 'q'
                  exit(1)              
                end
              end
            end
          }
        end
      end
    end
  end
end