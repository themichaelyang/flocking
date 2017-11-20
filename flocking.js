function init(state) {
  state.angle = 0
}

function draw(state) {
  state.drawTriangle(window.innerWidth / 2, window.innerHeight / 2, state.angle)
}

function update(state) {
  state.angle++
  state.angle = state.angle % 360

  return state
}
