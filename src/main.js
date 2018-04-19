
import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router'
import fastclick from 'fastclick'
import store from './store'

import {
  Style,
  IndexList,
  Scroll,
  Slide,
  Button,
  Toast,
  createAPI
} from 'cube-ui'

Vue.use(IndexList)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(Toast)
Vue.use(Button)
// Vue.use(createAPI)

import 'common/styles/index.scss'

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/images/loading.gif')
})

// 绑定路由与vuex
const unsync = sync(store, router)

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

unsync()
