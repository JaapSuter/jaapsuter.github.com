require 'sass'
require 'fileutils'
require 'json'
require_relative '../framework/config'

if false

  module Sass
    module SCSS
      class Parser
        if $sass_scss_parser_tok_aliased.nil?
          alias_method :old_tok, :tok
          $sass_scss_parser_tok_aliased = true
        end
    
        def tok(rx, last_group_lookahead = false)      
          if rx.to_s == STATIC_VALUE.to_s
            if len = tok?(rx)
              token = @scanner.peek len
              if /\d+gd/.match token
                return nil
              end
            end
          end
      
          old_tok rx, last_group_lookahead
        end
      end
    end


    if $sass_script_number_units_conversion_patched.nil?
  
      Script::Number::CONVERTABLE_UNITS['el'] = 5
      Script::Number::CONVERTABLE_UNITS['cap'] = 6
      Script::Number::CONVERTABLE_UNITS['ex'] = 7
      Script::Number::CONVERTABLE_UNITS['ascent'] = 8
      Script::Number::CONVERTABLE_UNITS['descent'] = 9

      Script::Number::CONVERSION_TABLE[0].push *[nil, nil, nil, nil, nil]
      Script::Number::CONVERSION_TABLE[1].push *[nil, nil, nil, nil, nil]
      Script::Number::CONVERSION_TABLE[2].push *[nil, nil, nil, nil, nil]
      Script::Number::CONVERSION_TABLE[3].push *[nil, nil, nil, nil, nil]
      Script::Number::CONVERSION_TABLE[4].push *[nil, nil, nil, nil, nil]
      Script::Number::CONVERSION_TABLE.push [nil, nil, nil, nil, nil,  61,  62,  63, 64, 65]
      Script::Number::CONVERSION_TABLE.push [nil, nil, nil, nil, nil, nil,  72,  73, 74, 75]
      Script::Number::CONVERSION_TABLE.push [nil, nil, nil, nil, nil, nil, nil,  83, 84, 85]
      Script::Number::CONVERSION_TABLE.push [nil, nil, nil, nil, nil, nil, nil, nil, 94, 95]
      Script::Number::CONVERSION_TABLE.push [nil, nil, nil, nil, nil, nil, nil, nil, 14, 15]
  
      $sass_script_number_units_conversion_patched = true
  
      puts "Script::Number::CONVERTABLE_UNITS: #{Script::Number::CONVERTABLE_UNITS}"
      puts "Script::Number::CONVERSION_TABLE: #{Script::Number::CONVERSION_TABLE}"
    end

    module Script
      class Number
        if $sass_script_number_perform_aliased.nil?
          alias_method :old_perform, :_perform
          $sass_script_number_perform_aliased = true
        end
    
        def _perform(environment)
      
          if @numerator_units.include? 'gd'
            ppem = environment.var('body-ppem')
            ppgd = environment.var('body-ppgd')
        
            if ppem and ppgd
              one_gd = Number.new(1, ['gd'])
              one_em = Number.new(1, ['em'])
              return self.div(one_gd).times(ppgd).div(ppem).times(one_em);
            end        
          end
      
          old_perform environment
        end
      end
    end
  end
end
