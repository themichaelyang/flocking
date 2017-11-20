'use strict'

function start() {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  const scaling = window.devicePixelRatio

  canvas.width = window.innerWidth * scaling
  canvas.height = window.innerHeight * scaling
  context.scale(scaling, scaling)

  canvas.style.width = window.innerWidth + 'px'
  canvas.style.height = window.innerHeight + 'px'

  const drawTriangle = drawTriangleOnContext(context)

  loop(drawTriangle)
}

function loop(drawTriangle) {
  drawTriangle(10, 10, 0)
  window.requestAnimationFrame(() => loop(drawTriangle))
}

window.onload = start
