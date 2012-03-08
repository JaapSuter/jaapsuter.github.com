require_relative '../_ruby/framework.rb'

module Jekyll  
  class Post
    if $jekyll_post_write_aliased.nil?
      alias_method :old_write, :write
      $jekyll_post_write_aliased = true
    end
     
    def write(dest)
      Jaap::Reload.try_reload
      self.output = Jaap::Dress.last_hook_before_write File.join(@base, @name), self.output, self.destination(dest)
      old_write(dest)
      Jaap::Dress.first_hook_after_write self.destination(dest)
    end
  end
  
  class Page
    if $jekyll_page_write_aliased.nil?
      alias_method :old_write, :write
      $jekyll_page_write_aliased = true
    end
     
    def write(dest)
      Jaap::Reload.try_reload
      self.output = Jaap::Dress.last_hook_before_write File.join(@base, @name), self.output, self.destination(dest)
      old_write(dest)
      Jaap::Dress.first_hook_after_write self.destination(dest)      
    end
  end
end
