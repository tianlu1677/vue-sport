
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router'
import fastclick from 'fastclick'
import store from './store'

import 'common/styles/index.scss'

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/images/loading.gif')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)   
})
