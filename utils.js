const genJitteredEllipse = (n, size, jitter) => 
Array(n).fill(0).map((e, idx) => {
  const theta = map(idx, 0, n, 0, TWO_PI)
  const x = size * cos(theta) + random(-jitter, jitter)
  const y = size * sin(theta) + random(-jitter, jitter)
  return createVector(x, y)
})