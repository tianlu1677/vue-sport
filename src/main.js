
import Vue from 'vue'
import {sync} from 'vuex-router-sync'
// import Navigation from 'vue-navigation'
// import vuescroll from 'vuescroll';

import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import {wechatShare} from './common/js/wx_config'

import {
  Style,
  ActionSheet,
  IndexList,
  Scroll,
  Slide,
  Button,
  Toast,
  Popup,
  Form,
  createAPI,
  Upload,
  Swipe,
  Picker,
  DatePicker,
  Dialog,
} from 'cube-ui'

Vue.use(IndexList)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(Toast)
Vue.use(Button)
Vue.use(Popup)
Vue.use(Form)
Vue.use(Upload)
Vue.use(Swipe)
Vue.use(ActionSheet)
Vue.use(Picker)
Vue.use(DatePicker)
Vue.use(Dialog)

import {
  ToastPlugin,
  XDialog
} from 'vux'

Vue.use(ToastPlugin)
Vue.component('x-dialog', XDialog)

import ShareDialog from 'components/share-dialog/share-dialog'

Vue.component('share-dialog', ShareDialog, {showShare: false})

import 'common/styles/index.scss'

// Vue.use(vuescroll)

// 课时列表
import LessonListDialog from './components/lesson-list/lesson-list-dialog'
createAPI(Vue, LessonListDialog, [], false)

// 修复IOS滑动效果
import EdgeCheck from 'vue-edge-check'

Vue.use(EdgeCheck)

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/images/loading.gif')
})

// 微信分享
window.wechatShare = wechatShare

// 绑定路由与vuex
const unsync = sync(store, router)
// Vue.use(Navigation, {router, store, moduleName: 'navigation', keyName: 'XUE'})

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// unsync()
