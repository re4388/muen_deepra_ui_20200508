



function createLableArray (num) {
  let array = ['All Class']
  for (let i = 1; i < num + 1; i++) {
    array.push( `class ${i}` )
  }
  return array
}

let result = createLableArray(10)
result


