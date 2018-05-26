import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
  },
  state: {
    currentAccount: undefined,
    categories: [],
    courseDetail: {},
    lessonList: [],
    lessonDetail: {},
    topicDetail: {},
    bottomNav: {home: false, topic: false, mine: false},

    showShare: false,
    isLoading: false,
    jsUrl: '', // 微信URL
  },
  actions,
  mutations,
  getters,
  strict: debug

})
