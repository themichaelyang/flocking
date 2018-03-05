const map = (list, func) => {
  for (let i = 0; i < list.length; i++) {
    list[i] = func(list[i], i)
  }
  return list
}

const mapNew = (list, func) => {
  newList = []

  for (let i = 0; i < list.length; i++) {
    newList[i] = func(list[i], i)
  }

  return newList
}

const reduce = (list, func, initial) => {
  let acc = initial
  for (let i = 0; i < list.length; i++) {
    acc = func(acc, list[i], i)
  }
  return acc
}

const assert = (bool, msg) => {
  let errorMessage = msg || 'Assertion failed!'
  if (!bool) {
    throw new Error(errorMessage)
  }
}
