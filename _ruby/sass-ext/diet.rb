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

    def responsive(*args)      

      property = unwrap unquote args[0]
      value = value = args.length > 1 ? (unwrap args[1]) : nil

      self.responsive_conditions[property] << value

      to_sass case self.responsive_property
        when '_all' then true
        when '_default' then property == '_default'
        when property then value == self.responsive_value
        else false
      end
    end

    def get_responsive_properties      
      to_sass self.responsive_conditions.keys
    end

    def get_responsive_values(property)
      property = unwrap property
      
      values = self.responsive_conditions[property]

      min_max_width_em = 0
      def_mid_width_em = 36
      max_min_width_em = 108
      step_width_em = 6

      if property == 'max-width'
        values += (min_max_width_em..def_mid_width_em).step(step_width_em).map { |value| "#{value}em" }
      end

      if property == 'min-width'
        values += (def_mid_width_em..max_min_width_em).step(step_width_em).map { |value| "#{value}em" }
      end

      values = values.uniq.sort_by { |v| v.to_s.naturalized }      
      values.reverse! if property == 'max-width'

      to_sass values
    end

    class Diet
      SyntaxError = ::Sass::SyntaxError unless SyntaxError
      include Sass
        
      def self.run(tree)
        Jaap::Reload.try_reload
        _run tree
      end

      private

      def self._run(tree)

        remove_comments! tree

        media_nodes, other_nodes = tree.children.partition { |c| c.is_a? Tree::MediaNode }
        top_level_rule_nodes, other_nodes = other_nodes.partition { |c| c.is_a? Tree::RuleNode }
        
        categorized = media_nodes.group_by do |m|
          media_query_expr_as_str m
        end

        all_node = (categorized['_all'] || [nil]).first
        none_node = (categorized['_default'] || [nil]).first

        if !all_node || !none_node
          return tree
        end
        
        none_node.children += top_level_rule_nodes
        
        canonify none_node

        min_width_nodes = categorized['min-width'] || []
        max_width_nodes = categorized['max-width'] || []
        
        supported = %w{_all _default min-width max-width}
        not_supported = categorized.keys.any? { |key| ! supported.include? key }
        if not_supported
          puts "Error: diet plan encountered unsupported media query among #{categorized.keys}."
        end

        if true
          state = deep_copy(none_node)
          max_width_nodes.each do |max_width_node| 
            canonify max_width_node
            visit_rules state, max_width_node
          end

          state = deep_copy(none_node)
          min_width_nodes.each do |min_width_node|
            canonify min_width_node
            visit_rules state, min_width_node
          end
        end

        tree.children = other_nodes + none_node.children + max_width_nodes + min_width_nodes
        tree
      end

      protected

      def self.canonify(node)
        ensure_flat_list_of_rules_with_flat_list_of_properties node
        expand_commas node
        reorder_and_merge_rules node
      end

      def self.expand_commas(node)
        
        # Todo, Jaap Suter, April 2012
        # Slightly modified from sass/lib/sass/css.rb line 118ish (which
        # operates on parsed_rules, whereas here I operate on resolved_rules.

        node.children.map! do |child|          

          unless child.is_a?(Tree::RuleNode) && child.resolved_rules.members.size > 1
            expand_commas(child) if child.is_a?(Tree::DirectiveNode)
            next child
          end
          
          child.resolved_rules.members.reject { |seq| seq.has_placeholder? }.map do |seq|
            new_child = Tree::RuleNode.new([])
            new_child.resolved_rules = new_child.parsed_rules = Selector::CommaSequence.new([seq])
            new_child.children = child.children
            new_child.options = child.options
            new_child
          end
        end

        node.children.flatten!
      end

      def self.reorder_and_merge_rules(node)
        rule_nodes, rest = node.children.partition { |c| c.is_a? Tree::RuleNode }
        rule_nodes.sort! do |a, b|
          if a.resolved_rules.specificity == b.resolved_rules.specificity
            a.resolved_rules.to_s <=> b.resolved_rules.to_s
          else
            a.resolved_rules.specificity <=> b.resolved_rules.specificity
          end
        end
        
        rule_nodes = merge_adjacent rule_nodes
        node.children = rest + rule_nodes
      end

      def self.merge_adjacent(rule_nodes)
        prev = nil
        rule_nodes = rule_nodes.map do |curr|
          if prev && (prev.resolved_rules.to_s == curr.resolved_rules.to_s)
            prev.children += curr.children
            next nil
          end

          prev = curr
          curr
        end
        
        rule_nodes = rule_nodes.compact
        rule_nodes
      end

      
      def self.reorder_rules(node)
        rule_nodes, rest = node.children.partition { |c| c.is_a? Tree::RuleNode }
        rule_nodes.sort! do |a, b|
          if a.resolved_rules.specificity == b.resolved_rules.specificity
            a.resolved_rules.to_s <=> b.resolved_rules.to_s
          else
            a.resolved_rules.specificity <=> b.resolved_rules.specificity
          end
        end
        node.children = rest + rule_nodes
      end

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
        Tree::Visitors::DeepCopy.visit(node)
      end

      def self.remove_comments!(node)        
        node.children.reject! do |child| 
          remove_comments! child
          child.is_a? Tree::CommentNode
        end
      end

      def self.is_none_of?(val, classes)
        for c in classes
          return false if val.is_a?(c)
        end
        return true
      end

      def self.ensure_children_only(node, classes)        
        ok = true

        node.children.each do |n|
          if is_none_of? n, classes
            ok = false

            puts "ERROR: expected #{classes} only, but got #{n.class}"

            if n.is_a? Tree::PropNode
              puts "    #{n.resolved_name}: #{n.resolved_value}"
            end
          end
        end
        
        unless ok
          raise SyntaxError.new("ERROR, diet expected #{classes} nodes only, but got other things. Weeeee!")
        end
      end

      def self.ensure_flat_list_of_rules_with_flat_list_of_properties(node)
        ensure_children_only node, [Tree::RuleNode, Sass::Tree::CssImportNode]
        node.children.each do |child|
          if child.is_a? Tree::RuleNode
            ensure_children_only child, [Tree::PropNode]
          end
        end
      end

      def self.visit_rules(state, node)
        node.children.reject! do |n|
          
          s = state.children.find { |s| n.resolved_rules == s.resolved_rules }
          
          if s
            visit_properties s, n
          end

          n.children.empty?
        end
      end

      def self.visit_properties(state, node)

        node.children.map! do |n|
          
          n_unit = n.resolved_value.gsub /[^a-z]/, ''
          n_unit_must_match = ['em', 'rem', 'px'].any? { |unit| n_unit.include? unit }
          
          r = :previously_non_existing_prop
          
          state.children.each do |s|
            if n.resolved_name == s.resolved_name
              if (!n_unit_must_match) || (n_unit == s.resolved_value.gsub(/[^a-z]/, ''))
                if n.resolved_value == s.resolved_value                  
                  r = :existing_prop_same_value
                  break
                else
                  r = :existing_prop_new_value
                  s.resolved_value = n.resolved_value
                  break
                end
              end
            end
          end

          # puts "#{r}: #{n.resolved_name}: #{n.resolved_value} #{n_unit_must_match}"

          if r == :previously_non_existing_prop
            state.children.push(deep_copy n)
          end

          if r == :existing_prop_same_value
            nil
          else
            n
          end
        end
      
        node.children.compact!
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
