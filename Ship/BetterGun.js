class BetterGun {
    constructor(dmg = 1, range = 100, velocity = 10, cooldown = 30, ammo = Infinity) {
      this.guns = [
        new StandardGun(dmg, range, velocity, cooldown, ammo),
        new StandardGun(dmg, range, velocity, cooldown, ammo),
      ]
    }
  
    render() {
      this.guns.forEach(g => g.render())
    }

    checkHit(asteroids) {
        this.guns.forEach(g => g.checkHit(asteroids))
    }
  
    shoot(position, heading) {
        this.guns[0].shoot(position.copy().add(p5.Vector(10, 0)), heading)
        this.guns[1].shoot(position.copy().add(p5.Vector(20, 0)), heading)
    }
 
}