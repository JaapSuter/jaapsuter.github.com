require 'json'

module Jaap
  module Server
  
    class DefaultServlet < WEBrick::HTTPServlet::FileHandler  
  
      def initialize(server, local_path, options = {})
        options[:FileCallback] = lambda{ |req, res|
          if req.path.start_with? '/fonts/'
            delay = 0 / 1000.0
            if delay > 0
              puts "Delaying Font Request #{delay} Seconds: #{req.path}".colorize( :color => :red, :background => :cyan )
              sleep delay
            end
          end
        }
      
        super(server, local_path, options)
      end
      
      def do_GET(request, response)
      
        class << response
          def create_error_page
            self.body = File.read(Paths.get('_site/404.html'))
          end
        end
          
        super request, response
      end
    end
    
    def DefaultServlet.get_instance config, *options
      Jaap::Reload.try_reload
      DefaultServlet.new config, *options
    end
  end
end
