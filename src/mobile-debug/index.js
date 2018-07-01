import MobileDebug from './index.vue'
let MobileDebugPlugin = {}

MobileDebugPlugin.install = function (Vue, options) {
  const MobileDebugConstructor = Vue.extend(MobileDebug)
  const instance = new MobileDebugConstructor()
  let documentBody = document.body || document.documentElement

  instance.$mount(document.createElement('div'))
  documentBody.appendChild(instance.$el)

  Vue.prototype.$log = function (cont) {
    instance.log.push({
      cont: cont,
      component: this.$options.name
    })
  }
}

export default MobileDebugPlugin
