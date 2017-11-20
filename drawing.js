const print = (obj) => console.log(obj)

const rotateContext = (context) => (degrees) => {
  context.rotate(degrees * Math.PI / 180)
}

const translateContext = (context) => (x, y) => {
  context.translate(x, y)
}

const drawTriangleOnContext = (context) => {
  const rotate = rotateContext(context)
  const translate = translateContext(context)

  return (x, y, angle) => {
    const height = 10
    const base = 10

    context.save()

    translate(x, y)
    rotate(angle)

    context.beginPath()
    context.moveTo(base / 2, height / 2)
    context.lineTo(0, -height / 2)
    context.lineTo(-base / 2, height / 2)
    context.fill()

    context.restore()
  }
}

const clearContext = (context) => () => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}
