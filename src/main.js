
import Vue from 'vue'
import {sync} from 'vuex-router-sync'
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

// 课时列表
import LessonListDialog from './components/lesson-list/lesson-list-dialog'

createAPI(Vue, LessonListDialog, [], true)

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
