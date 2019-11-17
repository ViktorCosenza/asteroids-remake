"use strict"
var ship
var asteroids = []
var minEdges = 8
var maxEdges = 20
var minAsteroidSize = 25
var maxAsteroidSize = 100
var maxJitter = 15
var maxSpeed = 5
var maxHealth = 10

var numAsteroids = 10

function setup() {
  ship = new Ship()
  asteroids = Array(numAsteroids).fill(0).map(e =>
    new Asteroid({
      x: random(windowWidth),
      y: random(windowHeight),
      size: random(minAsteroidSize, maxAsteroidSize),
      edges: random(8, maxEdges) | 0,
      jitter: random(maxJitter),
      velocity: random(maxSpeed),
      health: random(maxHealth) + 1
    })
  )
  createCanvas(window.innerWidth - 25, window.innerHeight - 25)
}

function draw() {
  background(0)
  const shipHasCollided = asteroids.find(a => a.hasCollided(ship))
  if (shipHasCollided) ship.hit(1)

  ship.gun.checkHit(asteroids)
  
  ship.render()
  asteroids.forEach(a => a.render())

  drawStats(ship, asteroids)
}

function drawStats(ship, asteroids) {
  fill(255);
  stroke(0);
  text(`HEALTH: ${ship.health}`, 10, height - 10)
  text(`ASTEROIDS: ${asteroids.length}`, 10, height - 25)
  drawFramerate()
}

function drawFramerate() {
  const fps = getFrameRate()
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, 10);
}

function keyReleased() {
  switch (keyCode) {
    case RIGHT_ARROW:
    case LEFT_ARROW:
      ship.rotation = 0
      break
    case UP_ARROW:
      ship.acceleration = 0
      break
    case 32: /* SPACEBAR */
      ship.isShooting = false
  }
}

function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      ship.rotation = 0.1
      break
    case LEFT_ARROW:
      ship.rotation = -0.1
      break
    case UP_ARROW:
      ship.acceleration = 1
      break
    case 32: /* SPACEBAR */
      ship.isShooting = true
  }
}

