import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// import category from './modules/category'
// import avatar from './modules/avatar'

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
    topicDetail: {}
  },
  actions,
  mutations,
  getters,

  strict: debug

})
