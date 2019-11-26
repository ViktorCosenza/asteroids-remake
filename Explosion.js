class Explosion {
  constructor ({x, y, numParticles=200, size=20, duration=100}) {
    this.finished = false
    this.numParticles = numParticles
    this.size = size
    this.duration = duration
    this.particles = Array(numParticles).fill(0)
      .map(e => 
        new Particle(
          x, y, 
          p5.Vector.random2D().setMag(random_float(0.5, 1.5)),
          random_int(1, 10),
          duration,
          [random_float(230, 255), random_float(0, 100), random_float(0, 25)]
        )
      )
  }

  tick () {
    this.ticks--
    if (this.ticks < 0)
    this.finished = true
  }

  render () {
    this.particles.forEach(p => p.render())
  }
}