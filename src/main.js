import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import {wechatShare} from './common/js/wx_config'
import CubeComponents from './cube-components'
import VuxComponents from './vux-components'

import 'common/styles/index.scss'


// 修复IOS滑动效果
import EdgeCheck from 'vue-edge-check'

Vue.use(EdgeCheck, {edge_duration: 1000})

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/images/loading.gif')
})

// 微信分享
window.wechatShare = wechatShare

// 绑定路由与vuex
const unsync = sync(store, router)

// 无限滚动
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// unsync()
