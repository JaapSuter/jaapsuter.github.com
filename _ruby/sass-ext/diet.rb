require 'sass'
require 'facets/module/attr_class_accessor'

module Jaap
  module SassExt

    def responsive_capture(*args)
      self.responsive_property = property = unwrap args[0]
      self.responsive_value = value = args.length > 1 ? (unwrap args[1]) : nil

      if self.responsive_property == '_all'
        self.responsive_conditions.clear
      end

      self.responsive_conditions[property] << value
      
      to_sass true
    end

    def responsive(property, value)
      property = unwrap unquote property
      value = unwrap value

      self.responsive_conditions[property] << value

      allow = case self.responsive_property
      when '_all' then true
      when '_none' then false
      when property then value == self.responsive_value
      else false end

      to_sass allow      
    end

    def get_responsive_properties      
      to_sass self.responsive_conditions.keys
    end

    def get_responsive_values(property)
      property = unwrap property
      
      values = self.responsive_conditions[property]
      values = values.uniq.sort_by { |v| v.to_s.naturalized }
      values = values.reverse if property.start_with? 'max'
      
      to_sass values
    end

    class Diet
      SyntaxError = Sass::SyntaxError unless SyntaxError
        
      def self.run(tree)
        Jaap::Reload.try_reload

        # begin  
        #   Math.sqrt (-1)
        # rescue => e
        #   puts e.inspect
        #   puts e.backtrace
        # end
          
        _run tree      
      end

      private

      def self._run(tree)

        media_nodes, rest = tree.children.partition { |c| c.is_a? Sass::Tree::MediaNode }

        categorized = media_nodes.group_by do |m|
          media_query_expr_as_str m
        end

        all_node = (categorized['_all'] || [nil]).first
        none_node = (categorized['_none'] || [nil]).first

        if !all_node || !none_node
          return tree
        end

        min_width_nodes = categorized['min-width'] || []
        max_width_nodes = categorized['max-width'] || []
        
        supported = %w{_all _none min-width max-width}
        not_supported = categorized.keys.any? { |key| ! supported.include? key }
        if not_supported
          puts "Error: diet plan encountered unsupported media query among #{categorized.keys}."
        end

        if true
          state = deep_copy(none_node)
          max_width_nodes.each { |max_width_node| visit_rules state, max_width_node }

          state = deep_copy(none_node)
          min_width_nodes.each { |min_width_node| visit_rules state, min_width_node }
        end

        tree.children = rest + none_node.children + max_width_nodes + min_width_nodes

        tree
      end

      protected

      def self.media_query_expr_as_str(node)

        qs = node.query.queries

        if qs.length > 1
          raise Sass::SyntaxError.new("Responsifier can't have more than one condition in a query so far...")
        end            

        q = qs.first

        if q.expressions.empty?
          q.type.join ' '
        elsif q.expressions.first.is_a? Sass::Media::Expression
          q.expressions.reduce('') { |a, e| a + e.resolved_name }
        else
          raise Sass::SyntaxError.new "Responsifier encountered media query of unexpected (or unsupported) format."
        end   
      end

      def self.deep_copy(node)
        Sass::Tree::Visitors::DeepCopy.visit(node)
      end

      def self.visit_rules(state, node)
        # puts "---- state ----"
        # puts media_query_expr_as_str state
        # puts "---- node ----"
        # puts media_query_expr_as_str node
        
        if (node.children + state.children).any? { |n| ! n.is_a? Sass::Tree::RuleNode }
          raise SyntaxError.new("Diet expected rule nodes only, but got other things. Weeeee!")
        end

        node.children.reject! do |n|          
          state.children.reverse_each do |s|
            if s.resolved_rules == n.resolved_rules
              visit_properties s, n
            end
          end

          n.children.empty?
        end
      end

      def self.visit_properties(state, node)
        if (node.children + state.children).any? { |n| ! n.is_a? Sass::Tree::PropNode }
          raise SyntaxError.new("Diet expected property nodes only, but got other things. Weeeee!")
        end

        node_children_new = []

        node.children.each do |n|          
          
          found = false

          state.children.reverse_each do |s|
            if s.resolved_name == n.resolved_name              
              if s.resolved_value == n.resolved_value
                state.children.push deep_copy s
                found = true
                break
              else
                node_children_new.push deep_copy n
                found = true
                break
              end
            end
          end

          if !found
            state.children.push deep_copy n
            node_children_new.push deep_copy n
          end
        end


        # puts '    ----------------------------'
        # puts "    state #{state.children}"
        # puts "    state`#{state_children_new}"        
        # puts "    node  #{node.children}"
        # puts "    node` #{node_children_new}"
        
        node.children = node_children_new
      end

    end
  end
end


module Sass::Script::Functions

  class EvaluationContext
    attr_class_accessor :responsive_conditions
    attr_class_accessor :responsive_property
    attr_class_accessor :responsive_value

    self.responsive_conditions = Hash.new { |hash, key| hash[key] = Array.new }
    self.responsive_property = nil
    self.responsive_value = nil
  end

  include Jaap::SassExt
end
