import request from './request'

// 学习记录
export async function createLearning(data = {course_id: ''}) {
  const res = await request({
    url: '/api/v1/learnings',
    method: 'POST',
    data: data
  })
  return res.data
}
