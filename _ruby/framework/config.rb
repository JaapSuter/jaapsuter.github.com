require 'yaml'
      
module Jaap
  module Config
      @@in_development_mode = false
  
      def self.in_development_mode
        @@in_development_mode
      end
  
      def self.enable_development_mode
        @@in_development_mode = true
      end
  end
end
