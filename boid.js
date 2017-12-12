class Vehicle {
  constructor(x, y, direction, mass, maxForce, maxSpeed) {
    this.location = new Vector(x, y)
    this.direction = 0
    this.velocity = new Vector(0, 0)
    this.acceleration = new Vector(0, 0)
    this.mass = mass
    this.maxForce = maxForce
    this.maxSpeed = maxSpeed
    this.random = new Vector(0, 0)
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
                 .limit(this.maxSpeed)
                 .add(this.random)
    this.location.add(this.velocity)
    this.direction = this.velocity.toAngle()
    this.acceleration.reset()
  }
}
