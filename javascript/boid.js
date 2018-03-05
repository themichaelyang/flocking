// consider drawing them as lines and scaling based on velocity
class Vehicle {
  constructor(x, y, direction, mass, maxForce, maxSpeed, color) {
    this.location = new Vector(x, y)
    this.direction = 0
    this.velocity = new Vector(0, 0)
    this.acceleration = new Vector(0, 0)
    this.mass = mass
    this.maxForce = maxForce
    this.maxSpeed = maxSpeed
    this.color = color
  }

  separate(boids, distance) {
    let separation = new Vector(0, 0)
    let total = new Vector(0, 0)
    let count = 0

    for (let other of boids) {
      if (this !== other && this.distanceTo(other.location) <= distance) {
        let diff = Vector.subtract(this.location, other.location).normalize()
        // diff.divideAll(this.distanceTo(other.location))

        total.add(diff)
        count++

        // improve efficiency in crowd
        if (count > 30) {
          break
        }
      }
    }

    if (count > 0) {
      total.divideAll(count)
      total.normalize()

      let steer = Vector.subtract(total, this.velocity)
      steer.limit(this.maxForce)

      this.applyForce(steer.multiplyAll(0.25))
      // return steer
    }
    // else {
      // return new Vector(0, 0)
    // }
  }

  align(boids, distance) {
    let alignment = new Vector(0, 0)
    let total = new Vector(0, 0)
    let count = 0

    for (let other of boids) {
      if (this !== other && this.distanceTo(other.location) <= distance) {
        total.add(other.velocity)
        count++
      }
    }

    if (count > 0) {
      total.divideAll(count)
      let steer = Vector.subtract(total, this.velocity)
      steer.limit(this.maxForce)

      this.applyForce(steer.multiplyAll(0.4))
    }

  }

  cohere(boids, distance) {
    let cohesion = new Vector(0, 0)
    let total = new Vector(0, 0)
    let count = 0

    for (let other of boids) {
      if (this !== other && this.distanceTo(other.location) <= distance) {
        total.add(other.location)
        count++
      }
    }

    if (count > 0) {
      total.divideAll(count)
      let steer = Vector.subtract(total, this.velocity)
      steer.limit(this.maxForce)
      this.applyForce(steer.multiplyAll(0.25))
    }
  }

  distanceTo(location) {
    let xSq = (this.location.x - location.x) ** 2
    let ySq = (this.location.y - location.y) ** 2
    return Math.sqrt(xSq + ySq)
  }

  seek(target) {
    let desiredVelocity = Vector.subtract(target, this.location).limit(this.maxSpeed)
    let steeringForce = desiredVelocity.subtract(this.velocity).limit(this.maxForce)
    this.applyForce(steeringForce.multiplyAll(0.3))
  }

  applyForce(force) {
    this.acceleration.add(force.divideAll(this.mass))
  }

  update() {
    this.velocity.add(this.acceleration)
                  // .normalize()
                  // .multiplyAll(this.maxSpeed)
                 .limit(this.maxSpeed)
    this.location.add(this.velocity)
    this.direction = this.velocity.toAngle()
    this.acceleration.reset()
  }
}
