class EngineThruster {
    constructor (pos, shipSize, maxParticles=200, velocity=1) {
      this.pos = pos
      this.shipSize = shipSize
      this.maxParticles = maxParticles
      this.velocity = velocity
      this.particles = []
    }
  
    tick (velocity) {
      if (this.particles.length < this.maxParticles)
        this.particles = [
          ...this.particles, 
          new Particle(
            this.pos.x, 
            this.pos.y, 
            velocity)]
    }
  
    render (isAccelerating, pos, heading) {
      const headingVector = p5.Vector.fromAngle(heading)
      const velocity = headingVector
        .copy()
        .mult(-1 * this.velocity)
        .add(p5.Vector.random2D().setMag(0.25))
  
      this.pos = pos
        .sub(headingVector.mult(this.shipSize))
      if (isAccelerating) this.tick(velocity)
      this.particles = this.particles.filter(p => {
        p.render()
        return p.alpha > 0
      })
    }
  }