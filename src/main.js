// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from './api/http'
import url from './api/url'
import util from './utils/util'
import ObsClient from './utils/hwobs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// if (store.state.isIE) {
//   require('./assets/css/ie.css')
// }

Vue.directive('permission', {
  bind (el, binding) {
    if (store.state.permission.indexOf(binding.value) === -1) {
      el.style.display = 'none'
    }
  }
})

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$url = url
Vue.prototype.$util = util
Vue.prototype.$ObsClient = ObsClient

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
