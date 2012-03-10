class Numeric
  def to_human_ish
    n = self
    count = 0
    while  n >= 1024 and count < 4
      n /= 1024.0
      count += 1
    end
    format("%.2f",n) + %w(B KB MB GB TB)[count]
  end
end
