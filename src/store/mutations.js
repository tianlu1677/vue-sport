import * as types from './types'

const mutations = {
  [types.SET_COURSE_DETAIL](state, course) {
    state.courseDetail = course
  },
  // 登录成功
  [types.LOGIN_SUCCESS](state, payload) {
    state.currentAccount = payload.account
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
  [types.STAR_LEARN](state, learning) {
    state.courseDetail = {...state.courseDetail, learning: learning}
  },

// lesson
  [types.SET_LESSON_DETAIL](state, lesson) {
    state.lessonDetail = lesson
  },
  [types.SET_LESSON_LIST](state, lessons) {
    state.lessonList = lessons
  },
  [types.PRAISE_LESSON](state, result) {
    console.log('result', result)
    state.lessonDetail = {...state.lessonDetail, praises_count: result.data.praises_count, praise: true}
  },
  [types.STAR_LESSON](state, result) {
    state.lessonDetail = {...state.lessonDetail, stars_count: result.data.stars_count, star: true}
  },
  [types.VIEW_LESSON](state, result) {
    state.lessonDetail = {...state.lessonDetail, views_count: result.data.views_count}
  },
  [types.SHARE_LESSON](state, result) {
    state.lessonDetail = {...state.lessonDetail, shares_count: result.data.shares_count}
  },

  [types.UN_PRAISE_LESSON](state, result) {
    state.lessonDetail = {...state.lessonDetail, praises_count: result.data.praises_count, praise: false}
  },
  [types.UN_STAR_LESSON](state, result) {
    state.lessonDetail = {...state.lessonDetail, stars_count: result.data.stars_count, star: false}
  },

//  底部边栏
  [types.SET_BOTTOM_NAV](state, result = {}) {
    state.bottomNav = {...state.bottomNav, ...result}
  }
}

export default mutations
