import MobileDebug from './index.vue'
import {isString, isNumber, isArray, isObject, isFunction} from './check'
let MobileDebugPlugin = {}

MobileDebugPlugin.install = function (Vue, hide) {
  const MobileDebugConstructor = Vue.extend(MobileDebug)
  const instance = new MobileDebugConstructor()
  let documentBody = document.body || document.documentElement

  instance.$mount(document.createElement('div'))
  documentBody.appendChild(instance.$el)

  if (hide) {
    instance.enabled = false
  } else {
    instance.enabled = true
  }

  Vue.prototype.$log = function (cont) {
    if (!cont || hide) return false
    console.log(cont)
    cont = formatCont(cont)
    instance.log.push({
      cont: cont,
      type: 'normal',
      component: this.$options.name || 'Not vue'
    })
  }
  Vue.prototype.$err = function (cont) {
    if (!cont || hide) return false
    console.warn(cont)
    cont = formatCont(cont)
    instance.log.push({
      cont: cont,
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

export default MobileDebugPlugin
