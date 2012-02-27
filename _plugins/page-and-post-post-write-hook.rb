require_relative '../_ruby/framework.rb'

module Jekyll  
  class Post
    alias_method :old_write, :write
     
    def write(dest)
      self.output = Jaap::Dress.last_hook_before_write self.output, self.destination(dest)
      old_write(dest)
      Jaap::Dress.first_hook_after_write self.destination(dest)
    end
  end
  
  class Page
    alias_method :old_write, :write
     
    def write(dest)
      self.output = Jaap::Dress.last_hook_before_write self.output, self.destination(dest)
      old_write(dest)
      Jaap::Dress.first_hook_after_write self.destination(dest)      
    end
  end
end
