require 'json'

module Jaap
  module Server
  
    class JsonServlet < WEBrick::HTTPServlet::AbstractServlet
  
      def do_GET(request, response)
    
        command = File.basename(request.path)
            
        case command
        when 'font-list'
          payload = Jaap::Font.get_font_list        
        when 'page-list'
          payload = Paths.glob('_site/**/*.html').map { |file|  file.sub(Paths.get('_site'), '')  }
          payload = payload.find_all { |file| file != "/google415246fe73d6cc14.html" }
        else
          raise HTTPStatus::BadRequest
        end
      
        response.body = JSON.generate "payload" => payload
      
        puts "GET:      ".colorize( :color => :white, :background => :green ) + command.colorize( :color => :white, :background => :blue )
        puts "RESPONSE: ".colorize( :color => :white, :background => :green ) + response.body.colorize( :color => :white, :background => :blue )
        
        raise HTTPStatus::OK
      end
     
      def do_PUT(request, response)

        command = File.basename(request.path)
        data = JSON.parse request.body
        puts "#{data}".colorize( :color=> :green, :background => :white )
        browser = data["browser"]
        payload = data["payload"]
      
        firstNumChars = 400
      
        puts "PUT:     ".colorize( :color => :white, :background => :red ) + command.colorize( :color => :white, :background => :blue )
        puts "FROM:    ".colorize( :color => :white, :background => :red ) + browser.colorize( :color => :white, :background => :yellow )
        puts "REQUEST: ".colorize( :color => :white, :background => :red ) + request.body[0..firstNumChars].colorize( :color => :white, :background => :blue )
      
        file = File.join Paths.get_or_make('_json'), "#{command}.#{browser}.json"
        json = JSON.pretty_generate(payload, :array_nl => '[% presentational newline undo %]').gsub(/\[% presentational newline undo %\]\s*/, ' ')
        File.open(file, 'w') { |f| f.write(json) }
        
        FileUtils.cp file, File.join(Paths.get_or_make('_json'), "#{command}.json")

        raise HTTPStatus::OK
      end
    end

    def JsonServlet.get_instance config, *options
      Jaap::Reload.try_reload
      JsonServlet.new config, *options
    end
  end
end
