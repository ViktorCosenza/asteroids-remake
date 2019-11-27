class DoubleGun {
    constructor(dmg = 1, range = 100, velocity = 10, cooldown = 15, ammo = Infinity) {
      this.guns = [
        new StandardGun(dmg, range, velocity, cooldown, ammo, [0, 50, 255], 8),
        new StandardGun(dmg, range, velocity, cooldown, ammo, [0, 50, 255], 8),
      ]
    }
  
    render() {
      this.guns.forEach(g => g.render())
    }

    checkHit(asteroids) {
        this.guns.forEach(g => g.checkHit(asteroids))
    }
  
    shoot(position, heading) {
      const p1 = position
        .copy()
        .add(createVector(0, 5).rotate(heading))
      const p2 = position
        .copy()
        .add(createVector(0, -5).rotate(heading))
      this.guns[0].shoot(p1.copy(), heading)
      this.guns[1].shoot(p2.copy(), heading)
    }
}