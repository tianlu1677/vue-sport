
import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import Navigation from 'vue-navigation'

import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router'
import fastclick from 'fastclick'
import store from './store'

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
  Swipe
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


import 'common/styles/index.scss'

// 时间格式化
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'zh-CN', // Default locale
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
  }
})

// 课时列表
import LessonListDialog from './components/lesson-list/lesson-list-dialog'

createAPI(Vue, LessonListDialog, [], false)

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/images/loading.gif')
})

// 绑定路由与vuex
const unsync = sync(store, router)
Vue.use(Navigation, {router, store, moduleName: 'navigation', keyName: 'VNK'})

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// unsync()
