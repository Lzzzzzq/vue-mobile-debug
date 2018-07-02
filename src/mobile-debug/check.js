let getType = Object.prototype.toString

export function isString (obj) {
  return !!getType.call(obj).match('String')
}

export function isNumber (obj) {
  return !!getType.call(obj).match('Number')
}

export function isArray (obj) {
  return !!getType.call(obj).match('Array')
}

export function isObject (obj) {
  return !!getType.call(obj).match('Object')
}

export function isFunction (obj) {
  return !!getType.call(obj).match('Function')
}
