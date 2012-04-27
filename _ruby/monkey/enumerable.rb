module Enumerable
  def stable_sort(&block)
    block &&= Proc.new do |(x, i), (y, j)|
      yield(x, y).nonzero? || i <=> j
    end
    each_with_index.sort(&block).map(&:first)
  end
end
