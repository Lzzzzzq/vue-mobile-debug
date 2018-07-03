import MobileDebug from './index.vue'
import {isString, isNumber, isArray, isObject, isFunction} from './check'
let MobileDebugPlugin = {}

MobileDebugPlugin.install = function (Vue, show) {
  const MobileDebugConstructor = Vue.extend(MobileDebug)
  const instance = new MobileDebugConstructor()
  let documentBody = document.body || document.documentElement

  instance.$mount(document.createElement('div'))
  documentBody.appendChild(instance.$el)

  if (show) {
    instance.enabled = true
  } else {
    instance.enabled = false
  }

  Vue.prototype.$log = function () {
    if (!arguments || !show) return false
    console.log(...arguments)
    instance.log.push({
      cont: mapArguments(arguments),
      type: 'normal',
      component: this.$options.name || 'Not vue'
    })
  }
  Vue.prototype.$err = function () {
    if (!arguments || !show) return false
    console.warn(...arguments)
    instance.log.push({
      cont: mapArguments(arguments),
      type: 'error',
      component: this.$options.name || 'Not vue'
    })
  }
}

function formatCont (cont) {
  if (isString(cont) || isNumber(cont)) {
    cont = cont.toString()
  } else if (isArray(cont)) {
    cont = JSON.stringify(cont)
  } else if (isObject(cont)) {
    cont = JSON.stringify(cont, null, 2)
  } else if (isFunction(cont)) {
    cont = '[Object Function]'
  } else {
    cont = 'Error: Other type'
  }
  return cont
}

function mapArguments (arr) {
  let resCont = ''
  for (let i = 0 ; i < arr.length ; i ++) {
    resCont += formatCont(arr[i])
  }
  return resCont
}

export default MobileDebugPlugin
