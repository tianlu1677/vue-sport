import * as types from './types'

const mutations = {
  [types.SET_COURSE_DETAIL](state, course) {
    state.courseDetail = course
  },

  [types.SET_CURRENT_ACCOUNT](state, account) {
    state.currentAccount = account
  },

  [types.PRAISE_COURSE](state, result) {
    console.log('result', result)
    state.courseDetail = {...state.courseDetail, praises_count: result.data.praises_count, praise: true}
  },
  [types.STAR_COURSE](state, result) {
    state.courseDetail = {...state.courseDetail, stars_count: result.data.stars_count, star: true}
  },
  [types.VIEW_COURSE](state, result) {
    state.courseDetail = {...state.courseDetail, views_count: result.data.views_count}
  },
  [types.SHARE_COURSE](state, result) {
    state.courseDetail = {...state.courseDetail, shares_count: result.data.shares_count}
  },

  [types.UN_PRAISE_COURSE](state, result) {
    state.courseDetail = {...state.courseDetail, praises_count: result.data.praises_count, praise: false}
  },
  [types.UN_STAR_COURSE](state, result) {
    state.courseDetail = {...state.courseDetail, stars_count: result.data.stars_count, star: false}
  },


}

export default mutations
