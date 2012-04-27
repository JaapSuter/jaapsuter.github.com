require 'sass'
require 'facets/module/attr_class_accessor'
require_relative '../monkey/enumerable'

module Jaap
  module SassExt

    def responsive_capture(*args)
      self.responsive_prop = prop = unwrap args[0]
      self.responsive_value = value = args.length > 1 ? (unwrap args[1]) : nil

      if self.responsive_prop == '_all'
        self.responsive_conditions.clear
      end

      self.responsive_conditions[prop] << value
      
      to_sass true
    end

    def responsive(*args)      

      prop = unwrap unquote args[0]
      value = value = args.length > 1 ? (unwrap args[1]) : nil

      self.responsive_conditions[prop] << value

      to_sass case self.responsive_prop
        when '_all' then true
        when '_default' then prop == '_default'
        when prop then value == self.responsive_value
        else false
      end
    end

    def get_responsive_properties      
      to_sass self.responsive_conditions.keys
    end

    def get_responsive_values(prop)
      prop = unwrap prop
      
      values = self.responsive_conditions[prop]

      min_max_width_em = 10
      def_mid_width_em = 36
      max_min_width_em = 63
      step_width_em = 12

      if prop == 'max-width'
        values += (min_max_width_em..def_mid_width_em).step(step_width_em).map { |value| "#{value}em" }
      end

      if prop == 'min-width'
        values += (def_mid_width_em..max_min_width_em).step(step_width_em).map { |value| "#{value}em" }
      end

      values = values.uniq.sort_by { |v| v.to_s.naturalized }      
      values.reverse! if prop == 'max-width'

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

        rest, rule_nodes  = node.children.partition { |c| ! c.is_a? Tree::RuleNode }

        expand_comma_sequences! rule_nodes
        rule_nodes = sort_rules rule_nodes
        merge_adjacent_rules! rule_nodes
        rule_nodes.each { |rule_node| rule_node.children = sort_properties rule_node.children }

        node.children = rest + rule_nodes
      end

      def self.expand_comma_sequences!(rule_nodes)
        
        # Todo, Jaap Suter, April 2012
        # Slightly modified from sass/lib/sass/css.rb line 118ish (which
        # operates on parsed_rules, whereas here I operate on resolved_rules.

        rule_nodes.map! do |rule_node|

          raise Sass::SyntaxError.new("expected a rule node, got something else") unless rule_node.is_a?(Tree::RuleNode)

          unless rule_node.resolved_rules.members.size > 1
            next rule_node
          end
          
          rule_node.resolved_rules.members.reject { |seq| seq.has_placeholder? }.map do |seq|
            new_rule = Tree::RuleNode.new([])
            new_rule.resolved_rules = new_rule.parsed_rules = Selector::CommaSequence.new([seq])
            new_rule.children = rule_node.children
            new_rule.options = rule_node.options
            new_rule
          end
        end

        rule_nodes.flatten!
      end

      def self.sort_rules(rule_nodes)
        rule_nodes.stable_sort do |a, b|
          if a.resolved_rules.specificity == b.resolved_rules.specificity
            a.resolved_rules.to_s <=> b.resolved_rules.to_s
          else
            a.resolved_rules.specificity <=> b.resolved_rules.specificity
          end
        end
      end

      def self.sort_properties(property_nodes)
        property_nodes.stable_sort do |a, b|
          a.resolved_name <=> b.resolved_name
        end
      end

      def self.merge_adjacent_rules!(rule_nodes)
        
        prev = nil
        rule_nodes.map! do |curr|
          if prev && (prev.resolved_rules.to_s == curr.resolved_rules.to_s)
            prev.children += curr.children
            next nil
          end

          prev = curr
          curr
        end
        
        rule_nodes.compact!
      end

      def self.insert_specificity_property!(rule_node)

        specificity = rule_node.resolved_rules.specificity

        prop_node = Tree::PropNode.new([""], Sass::Script::String.new(''), :new)
        prop_node.resolved_name = "-dev-specificity"
        prop_node.resolved_value = specificity.to_s
        prop_node.options = rule_node.options

        rule_node << prop_node
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
    attr_class_accessor :responsive_prop
    attr_class_accessor :responsive_value

    self.responsive_conditions = Hash.new { |hash, key| hash[key] = Array.new }
    self.responsive_prop = nil
    self.responsive_value = nil
  end

  include Jaap::SassExt
end
