require 'sass'
require 'sass/tree/visitors/cssize'
require 'facets/module/alias_method_chain'

Jaap::Reload.try_reload

module Jaap
  module SassExt
    def self.post_process(tree)
      Jaap::SassExt::Diet.run tree
    end
  end
end
