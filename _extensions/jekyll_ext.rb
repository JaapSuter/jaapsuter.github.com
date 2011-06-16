module Jekyll
    AOP.after(Site, :render) do |site_instance, result, args|
        print "UnicornZ\n"
    end
end
  