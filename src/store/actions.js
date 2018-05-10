import * as types from './types'

import {getCurrentAccount} from "@/api/mine_api";

import {
  getCourse,
  createAction,
  destroyAction
} from "@/api/course_api";

import {
  getLessons,
  getLesson
} from "@/api/lesson_api"

import {
  getTopic
} from "@/api/topic_api"
import {createLearning} from "@/api/learning_api"

//用户相关
export const login = async function ({commit}) {
  const response = await getCurrentAccount()
  commit(types.LOGIN_SUCCESS, response)
}

export const setCurrentAccount = async function ({commit, state}) {
  const response = await getCurrentAccount()
  commit(types.SET_CURRENT_ACCOUNT, response.account)
}

// 设置课程详细信息
export const setCourseDetail = async function ({commit, state}, course_id) {
  const response = await getCourse(course_id)
  commit(types.SET_COURSE_DETAIL, response.course)
}

// 课程点赞, 收藏，分享，浏览
export const courseCreateAction = async function ({commit, state}, payload = {course_id: '', type: ''}) {
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

export const learnCourse = async function ({commit, state}, payload = {course_id: ''}) {
  const response = await createLearning({course_id: payload.course_id})
  commit(types.STAR_LEARN, response.learning)
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

// 课时
export const setLessonDetail = async function ({commit, state}, lesson_id) {
  const response = await getLesson(lesson_id)
  commit(types.SET_LESSON_DETAIL, response.lesson)
}

export const setLessonList = async function ({commit, state}, course_id) {
  const response = await getLessons(course_id)
  commit(types.SET_LESSON_LIST, response.lessons)
}

// 课程点赞, 收藏，分享，浏览
export const lessonCreateAction = async function ({commit, state}, payload = {lesson_id: lesson_id, type: type}) {
  const type = payload.type
  const response = await createAction(payload.lesson_id, type)
  switch (type) {
    case 'praise':
      commit(types.PRAISE_LESSON, response)
      break
    case 'star':
      commit(types.STAR_LESSON, response)
      break
    case 'share':
      commit(types.SHARE_LESSON, response)
      break
    case 'view':
      commit(types.VIEW_LESSON, response)
      break
    default:
      console.log('do not have this action: ', type)
  }

}

export const lessonDestroyAction = async function ({commit, state}, payload = {lesson_id: lesson_id, type: type}) {
  const type = payload.type
  const response = await destroyAction(payload.lesson_id, type)
  switch (type) {
    case 'praise':
      commit(types.UN_PRAISE_LESSON, response)
      break
    case 'star':
      commit(types.UN_STAR_LESSON, response)
      break
    default:
      console.log('no this action', type)
  }
}

// 心得
export const setTopicDetail = async function ({commit, state}, topic_id) {
  const response = await getTopic(topic_id)
  commit(types.SET_TOPIC_DETAIL, response.topic)
}
