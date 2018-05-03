import * as types from './types'

import {getCurrentAccounts} from "@/api/account_api";

import {
  getCourse,
  createAction,
  destroyAction
} from "@/api/course_api";

//用户相关
export const setCurrentAccount = async function ({commit, state}) {
  const response = await getCurrentAccount()
  commit(types.SET_CURRENT_ACCOUNT, response.account)
}

// 设置课程详细信息
export const setCourseDetail = async function ({commit, state}, course_id) {
  const response = await  getCourse(course_id)
  commit(types.SET_COURSE_DETAIL, response.course)
}

// 课程点赞, 收藏，分享，浏览
export const courseCreateAction = async function ({commit, state}, payload = {course_id: course_id, type: type}) {
  const type = payload.type
  const response = await createAction(payload.course_id, type)
  switch (type) {
    case 'praise':
      commit(types.PRAISE_COURSE, response)
      break
    case 'star':
      commit(types.STAR_COURSE, response)
      break
    case 'share':
      commit(types.SHARE_COURSE, response)
      break
    case 'view':
      commit(types.VIEW_COURSE, response)
      break
    default:
      console.log('do not have this action: ', type)
  }

}

export const courseDestroyAction = async function ({commit, state}, payload = {course_id: course_id, type: type}) {
  const type = payload.type
  const response = await destroyAction(payload.course_id, type)
  switch (type) {
    case 'praise':
      commit(types.UN_PRAISE_COURSE, response)
      break
    case 'star':
      commit(types.UN_STAR_COURSE, response)
      break
    default:
      console.log('no this action', type)
  }
}
