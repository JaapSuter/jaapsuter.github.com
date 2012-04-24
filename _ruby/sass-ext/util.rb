require 'sass'
require 'fileutils'
require 'json'
require_relative '../framework/config'

module Jaap
  module SassExt
   
    def try_reload_extensions()
      Jaap::Reload.try_reload
      to_sass true
    end
    
    def raise_error_message(message)
      raise Sass::SyntaxError, message.value
    end
    
    def in_development_mode()
      to_sass Jaap::Config.in_development_mode
    end
        
    def get_char_at(str, idx)
      assert_type str, :String
      assert_type idx, :Number
      Sass::Script::String.new str.value[idx.value, 1]
    end
        
    def split(str, sep = '.')
      assert_type str, :String
      assert_type sep, :String
      arr = str.value.split(sep.value)
      arr.map! { |ar| Sass::Script::String.new(ar) }
      Sass::Script::List.new(arr, :space)
    end

    private

    def unwrap_px(v)
      raise_error_message "px_unwrap on #{v}" if v.unit_str != 'px'
      unwrap(v.div to_sass '1px').to_i
    end

    def unwrap(*v)
      v = v.map { |e| 
        if e.is_a? Fixnum
          e
        elsif e.is_a?(Sass::Script::Number)
          if e.unitless?
            e.value
          else
            e.inspect
          end
        elsif e.respond_to? 'value'
          e.value
        else
          e
        end
      }
      v.length == 1 ? v.first : v
    end

    def is_number?(object)
      true if Float(object) rescue false
    end
    
    def is_bool?(object)
      !!object == object
    end

    def to_sass(obj)
      if obj.kind_of?(Array)
        arr = obj.map! { |ar| to_sass(ar) }
        Sass::Script::List.new(arr, :space)
      elsif is_number?(obj)
        Sass::Script::Number.new(obj)
      elsif is_bool?(obj)
        Sass::Script::Bool.new(obj)
      elsif obj.nil?
        Sass::Script::String.new("!ERROR, obj == nil")
      else
        Sass::Script::Parser.parse obj, 0, 0
      end
    end
    
    def self.add_extension(owner, method)
      self.module_eval <<-end_eval
        def #{method}(*args)
          to_sass (#{owner}.#{method} *(args.map {|arg| arg.value}))
        end
      end_eval
    end
  end
end

module Sass::Script::Functions
  include Jaap::SassExt
end
