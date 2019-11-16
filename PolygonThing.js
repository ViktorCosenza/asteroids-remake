class PolygonThing extends Thing {
  constructor(x, y, velocity, points) {
    super(x, y, velocity)
    this.edges = points
    this.globalEdges = points.map(e => e.copy())
  }

  tick() {
    this.globalEdges = this.edges.map(e => this.pos.copy().add(e))
    super.tick()
  }

  hasCollided(other) {
    return collidePolyPoly(this.globalEdges, other.globalEdges)
  }
}