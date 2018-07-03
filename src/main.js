import Vue from 'vue'
import App from './App.vue'
import VueMobileDebug from './lib'

Vue.use(VueMobileDebug, true)

new Vue({
  el: '#app',
  render: h => h(App)
})
