'use strict'

function start() {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  const scaling = window.devicePixelRatio
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const drawTriangle = drawTriangleOnContext(context, scaling)

  loop(drawTriangle)
}

function loop(drawTriangle) {
  drawTriangle(10, 10, 0)
  window.requestAnimationFrame(() => loop(drawTriangle))
}

window.onload = start
