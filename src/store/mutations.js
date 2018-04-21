import * as types from './types'

const mutations = {
  [types.SET_COURSE_DETAIL](state, course) {
    state.courseDetail = course
  },

  [types.SET_CURRENT_ACCOUNT](state, account) {
    state.currentAccount = account
  }


}

export default mutations
