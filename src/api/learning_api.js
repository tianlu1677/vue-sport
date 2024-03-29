import request from './request'

// 学习记录
export async function createLearning(data = {lesson_id: ''}) {
  const res = await request({
    url: '/api/v1/learnings',
    method: 'POST',
    data: data
  })
  return res.data
}

// 获取学习记录
export async function getCourseLearning(id) {
  const res = await request({
    url: `/api/v1/courses/${id}/learning`,
    method: 'GET'
  })
  return res.data
}
