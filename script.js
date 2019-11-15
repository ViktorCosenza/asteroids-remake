"use strict"
var ship
var asteroids = []
var minEdges = 8
var maxEdges = 20
var minAsteroidSize = 25 
var maxAsteroidSize = 100
var maxJitter = 15
var maxSpeed = 15

function setup() {
  ship = new Ship()
  asteroids = Array(5).fill(0).map(e => 
    new Asteroid(
      random(windowWidth), 
      random(windowHeight), 
      random(minAsteroidSize, maxAsteroidSize),
      random(8, maxEdges) | 0,
      random(maxJitter),
      random(maxSpeed)
    )
  )
  createCanvas(windowWidth, windowHeight)
  console.log(asteroids)
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
  }
}

