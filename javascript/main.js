'use strict'

function start() {
  const state = {}
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  const scaling = window.devicePixelRatio

  canvas.width = window.innerWidth * scaling
  canvas.height = window.innerHeight * scaling
  context.scale(scaling, scaling)

  canvas.style.width = window.innerWidth + 'px'
  canvas.style.height = window.innerHeight + 'px'

  canvas.addEventListener('mousemove', (event) => {
    state.mouseLocation = {x: event.clientX, y: event.clientY}
  })

  state.drawTriangle = drawTriangleOnContext(context)
  state.clear = clearContext(context)
  init(state)

  const loop = (state) => {
    state.clear()

    draw(state)
    state = update(state)
    window.requestAnimationFrame(() => loop(state))
  }

  loop(state)
}

window.onload = start
