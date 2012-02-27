require 'webrick'
require_relative 'server/json-servlet'
require_relative 'server/default-servlet'

include WEBrick
      
module Jaap
  module Server
    def self.run()
    
      root = Paths.get('_site')
      Dir.mkdir(root) if not Dir.exists? root

      mime_types = WEBrick::HTTPUtils::DefaultMimeTypes
      mime_types.store 'js', 'application/javascript'
      mime_types.store 'ogv', 'video/ogg'
      mime_types.store 'mp4', 'video/mp4'
      mime_types.store 'webm', 'video/webm'
      mime_types.store 'svg', 'image/svg+xml'
      
      s = HTTPServer.new(
        :Port            => 4000,
        :MimeTypes       => mime_types,
        :DoNotReverseLookup => true
      )

      s.mount(nil, DefaultServlet, root, options = { :FancyIndexing => true })
      s.mount('/ajax/json/', JsonServlet)
      
      Signal.trap("INT") { s.shutdown }
      s.start
    end
  end
end
