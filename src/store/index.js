import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// import category from './modules/category'
// import account from './modules/account'

import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    // category: category,
    // account: account
  },

  state: {
    current_account: {},
    categories: [],
    course: {},
    lesson: {},
    topic: {}
  },
  actions,
  mutations,
  getters,

  strict: debug

})
