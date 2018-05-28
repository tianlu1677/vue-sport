import * as types from './types'


export const currentAccount = state => state.currentAccount

export const courseDetail = state => state.courseDetail

export const courseInfo = state => state.courseDetail.course_info

export const lessonDetail = state => state.lessonDetail
export const lessonList = state => state.lessonList
export const learningStatus = state => state.learningStatus

//心得
export const topicDetail = state => state.topicDetail

//路由
export const route = state => state.route

// 显示分享
export const showShare = state => state.showShare
export const isLoading = state => state.isLoading
