function cloneObj(from) {
  return Object.keys(from)
    .reduce((obj, key) => (obj[key] = clone(from[key]), obj), {});
}

function cloneArr(from) {
  return from.map((n) => clone(n));
}

// modified implementation from: https://segmentfault.com/q/1010000009292870
function clone(from) {
  if (from instanceof Array) {
    return cloneArr(from);
  } else if (from instanceof Object) {
    if (from.hasOwnProperty('stringValue')) { return clone(from.stringValue) }
    if (from.hasOwnProperty('listValue')) { return clone(from.listValue.values) }
    return cloneObj(from);
  } else {
    return (from);
  }
}

module.exports = {
  clone: clone
}
