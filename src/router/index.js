import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import store from '../store'
import {getToken, deleteToken} from "@/common/js/cookies";
import routes from './routes'

const router = new Router({
  mode: 'history',
  base: '/web',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log('savedPosition', savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }

})

// 用户的登录验证
//  需要登录的部分.
// 1. 如果token存在，则请求用户信息 1,获取成功，则更新store中的currentAccount,
// 不存在或者请求不成功，则去调用微信的获取用户信息的接口，发生跳转
// 2. 如果token 不存在，则去调用微信的接口去获取用户的信息

router.beforeEach(async (to, from, next) => {
  let token = getToken()
  // Loading style
  if (to.matched.some(record => record.meta.loading)) {
    store.commit('UPDATE_LOADING', {isLoading: true})
  }
  // change Title
  changeDocumentTitle(to)

  // fix wechat share
  if (!store.state.jsUrl && (to.fullPath.indexOf('login') < 0 || to.fullPath.indexOf('sign_up') < 0)) {
    store.commit('SET_WX_JS_URL', document.URL)
  }

  // go to sign_in
  if (to.matched.some(record => record.meta.auth)) {
    if (token && token.length > 10) {
      await store.dispatch('setCurrentAccount', token)
      next()
    } else {
      deleteToken()
      recordLastPage(to.fullPath)
      next({path: '/sign_up'})
    }
  } else {
    next()
  }
})

router.afterEach((to) => {
  if (store.state.isLoading) {
    store.commit('UPDATE_LOADING', {isLoading: false})
  }

  window.ba.trackPageview(to.fullPath)
})

// 设置title
function changeDocumentTitle(to) {
  if (to.meta.title) {
    document.title = to.meta.title
  }
}

function recordLastPage(from_path) {
  let record_path = ['home', 'new_topic', 'mine']
  record_path.forEach((path) => {
    if (from_path.indexOf(path) >= 0) {
      localStorage.setItem('lastPath', from_path)
    }
  })
}
export default router;
