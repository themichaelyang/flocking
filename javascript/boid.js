// consider drawing them as lines and scaling based on velocity
class Vehicle {
  constructor(x, y, direction, mass, maxForce, maxSpeed, context) {
    this.location = new Vector(x, y)
    this.direction = 0
    this.velocity = new Vector(0, 0)
    this.acceleration = new Vector(0, 0)
    this.mass = mass
    this.maxForce = maxForce
    this.maxSpeed = maxSpeed
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
      }
    }

    if (count > 0) {
      total.divideAll(count)
      total.normalize()

      let steer = Vector.subtract(total, this.velocity)
      steer.limit(this.maxForce)

      this.applyForce(steer)
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
    this.applyForce(steeringForce)
  }

  applyForce(force) {
    this.acceleration.add(force.divideAll(this.mass))
  }

  update() {
    this.velocity.add(this.acceleration)
                 // .limit(this.maxSpeed)
    this.location.add(this.velocity)
    this.direction = this.velocity.toAngle()
    this.acceleration.reset()
  }
}