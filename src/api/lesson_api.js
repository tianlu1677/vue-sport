import request from './request'

// 课时列表
export async function getLessons(course_id) {
  const res = await request({
    url: `/api/v1/courses/${course_id}/lessons`,
    method: 'GET'
  })
  return res.data
}

// 课时详情
export async function getLesson(course_id) {
  const res = await request({
    url: `/api/v1/lessons/${course_id}`,
    method: 'GET'
  })
  return res.data
}
