const rotateContext = (context) => (degrees) => {
  context.rotate(degrees * Math.PI / 180)
}

const drawTriangleOnContext = (context) => {
  const rotate = rotateContext(context)

  return (x, y, angle) => {
    const height = 10
    const base = 10

    context.save()
    rotate(angle)
    context.beginPath()
    context.moveTo(x + (base / 2), y + (height / 2))
    context.lineTo(x, y - (height / 2))
    context.lineTo(x - (base / 2), y + (height / 2))
    context.fill()
    context.restore()
  }
}
