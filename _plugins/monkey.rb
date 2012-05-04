require_relative '../_ruby/framework.rb'

module Jaap
  module JekyllExt
    module Excerpter      
      def truncate_to_n_words(s, n, append_if_truncated = '')
        words = s.split
        return s if words.length <= n
        return words[0..n].join(" ") + append_if_truncated
      end    

      def excerpt(content)
        stripped_content = content.gsub(/<script.*?<\/script>/, '').gsub(/<.*?>/, '')
        m = stripped_content.match /\[%\s*excerpt-begin\s*%\](.*)\[%\s*excerpt-end\s*(\S*)\s*%\]/m
        e = m[1].strip if (m && m.length > 1)
        e = e + m[2] if (m && m.length > 2)
        e = truncate_to_n_words(stripped_content, 24, '...') if (e.nil? || e == '')
        e
      end
    end
  end
end

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

    include ::Jaap::JekyllExt::Excerpter

    if $jekyll_post_to_liquid_aliased.nil?
      alias_method :old_to_liquid, :to_liquid
      $jekyll_post_to_liquid_aliased =  true
    end

    def to_liquid
      old_to_liquid.deep_merge({        
        'excerpt' => self.excerpt(content)
      })
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

    include ::Jaap::JekyllExt::Excerpter

    if $jekyll_page_to_liquid_aliased.nil?
      alias_method :old_to_liquid, :to_liquid
      $jekyll_page_to_liquid_aliased = true
    end

    def to_liquid
      old_to_liquid.deep_merge({
        'excerpt' => self.excerpt(content)
      })
    end
  end
end
