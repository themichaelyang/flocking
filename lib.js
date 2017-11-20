const rotateContext = (context) => (degrees) => {
  context.rotate(degrees * Math.PI / 180)
}

const drawTriangleOnContext = (context, scaling) => {
  const rotate = rotateContext(context)

  return (x, y, angle) => {
    const height = 10
    const base = 10

    context.save()
    rotate(angle)
    context.beginPath()
    context.moveTo(scaling * (x + (base / 2)), scaling * (y + (height / 2)))
    context.lineTo(scaling * x, scaling * (y - (height / 2)))
    context.lineTo(scaling * (x - (base / 2)), scaling * (y + (height / 2)))
    context.fill()
    context.restore()
  }
}
