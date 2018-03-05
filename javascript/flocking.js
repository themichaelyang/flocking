function init(state) {
  state.mouseLocation = {x: window.innerWidth / 2, y: window.innerHeight / 2}
  state.boids = []
  for (let i = 0; i < 500; i++) {
    state.boids.push(new Vehicle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 0, 1, 0.05 + (Math.random() * 0.05), Math.random() * 3 + 2))
    // state.boids.push(new Vehicle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 0, 1, 0.1, 3))
  }

  window.addEventListener('mousedown', (event) => {
    state.mouseDown = true
  })

  window.addEventListener('mouseup', (event) => {
    state.mouseDown = false
  })
}

function draw(state) {
  for (let boid of state.boids) {
    state.drawTriangle(boid.location.x, boid.location.y, boid.direction * 180 / Math.PI, boidToColor(boid))
  }
}

function boidToColor(boid) {
  return 'rgba(0, 0, 0,' + (boid.velocity.magnitude / boid.maxSpeed).toString() + ')'
}

function update(state) {
  flock(state.boids, 20)

  for (let boid of state.boids) {
    if (state.mouseDown) {
      boid.seek(state.mouseLocation)
    }
    boid.update()
    wrap(boid)
  }

  return state
}

function wrap(boid) {
  if (boid.location.x < 0) {
    boid.location.x = window.innerWidth
  }
  if (boid.location.y < 0) {
    boid.location.y = window.innerHeight
  }
  if (boid.location.x > window.innerWidth) {
    boid.location.x = 0
  }
  if (boid.location.y > window.innerHeight) {
    boid.location.y = 0
  }
}

function flock(boids, distance) {
  for (let boid of boids) {
    boid.separate(boids, distance)
    boid.align(boids, distance)
    boid.cohere(boids, distance)
  }
}
