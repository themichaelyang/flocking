function init(state) {
  state.mouseLocation = {x: window.innerWidth / 2, y: window.innerHeight / 2}
  state.boids = []
  for (let i = 0; i < 10; i++) {
    state.boids.push(new Vehicle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 0, 1, 0.1 + (Math.random() * 0.1), Math.random() * 3 + 3))
  }
}

function draw(state) {
  for (let boid of state.boids) {
    state.drawTriangle(boid.location.x, boid.location.y, boid.direction * 180 / Math.PI)
  }
}

function update(state) {
  for (let boid of state.boids) {
    boid.seek(state.mouseLocation)
    boid.update()
  }

  return state
}
