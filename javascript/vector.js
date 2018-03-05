class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  static subtract(first, second) {
    return new Vector(first.x - second.x, first.y - second.y)
  }

  get magnitude() {
    return Math.sqrt(this.x**2 + this.y**2)
  }

  normalize() {
    return this.divideAll(this.magnitude)
  }

  multiplyAll(scalar) {
    this.x *= scalar
    this.y *= scalar
    return this
  }

  subtract(other) {
    this.x -= other.x
    this.y -= other.y
    return this
  }

  add(other) {
    this.x += other.x
    this.y += other.y
    return this
  }

  divideAll(scalar) {
    this.x /= scalar
    this.y /= scalar
    return this
  }

  toAngle() {
    return Math.atan2(this.y, this.x)
  }

  reset() {
    this.x = 0
    this.y = 0
  }

  limit(max) {
    if (this.magnitude > max) {
      return this.normalize().multiplyAll(max)
    }
    else {
      return this
    }
  }
}
