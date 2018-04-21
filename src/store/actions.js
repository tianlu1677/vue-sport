import * as types from './types'

import {getCurrentAccounts} from "@/api/account_api";

import {getCourse} from "@/api/course_api";

//用户相关
export const setCurrentAccount = async function ({commit, state}) {
  const response = await getCurrentAccounts()
  commit(types.SET_CURRENT_ACCOUNT, response.account)
}

// 课程相关
export const setCourseDetail = async function ({commit, state}, course_id) {
  const response = await  getCourse(course_id)
  commit(types.SET_COURSE_DETAIL, response.course)
}
