function init(state) {
  state.mouseLocation = {x: window.innerWidth / 2, y: window.innerHeight / 2}
  state.boids = []
  for (let i = 0; i < 100; i++) {
    state.boids.push(new Vehicle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 0, 1, 0.05 + (Math.random() * 0.05), Math.random() * 3 + 3))
  }
}

function draw(state) {
  for (let boid of state.boids) {
    state.drawTriangle(boid.location.x, boid.location.y, boid.direction * 180 / Math.PI)
  }
}

function update(state) {
  flock(state.boids, 50)

  for (let boid of state.boids) {
    boid.seek(state.mouseLocation)
    boid.update()
  }

  return state
}

function flock(boids, distance) {
  for (let boid of boids) {
    boid.separate(boids, distance)
  }
}
