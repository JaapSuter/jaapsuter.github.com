
class Hash
  # Replacing the to_yaml function so it'll serialize hashes sorted (by their keys)
  # Original function is in /usr/lib/ruby/1.8/yaml/rubytypes.rb
  def to_yaml(opts = {})
    YAML::quick_emit( object_id, opts ) do |out|
      out.map( taguri, to_yaml_style ) do |map|
        sort.each do |k, v|  # <-- here's my addition (the 'sort')
          map.add( k, v )
        end
      end
    end
  end
  
  # Check each step of the way and avoid tripping up on calls to nil. For shallow structures 
  # the utility is somewhat limited, but for deeply nested structures I find it's invaluable.
  # Thanks to 'tadman' on http://stackoverflow.com/a/1820492
  def dig(*path)
    path.inject(self) do |location, key|
      if location.kind_of? Array and key.kind_of? Integer and (0..location.length) === key        
        location[key]
      else
        location.respond_to?(:keys) ? location[key] : nil
      end
    end
  end
end
