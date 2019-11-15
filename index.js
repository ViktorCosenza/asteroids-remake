"use strict"
var ship
var asteroids = []
var minEdges = 8
var maxEdges = 20
var minAsteroidSize = 25 
var maxAsteroidSize = 100
var maxJitter = 15
var maxSpeed = 5

function setup() {
  ship = new Ship()
  asteroids = Array(50).fill(0).map(e => 
    new Asteroid(
      random(windowWidth), 
      random(windowHeight), 
      random(minAsteroidSize, maxAsteroidSize),
      random(8, maxEdges) | 0,
      random(maxJitter),
      random(maxSpeed)
    )
  )
  createCanvas(window.innerWidth - 25, window.innerHeight - 25)
}

function draw() {
  background(0)
  ship.render()
  asteroids.forEach(a => a.render())
}

function keyReleased () {
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

function keyPressed () {
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

