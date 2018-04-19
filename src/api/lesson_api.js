import request from './request'

export async function getLessons(course_id) {
  const res = await request({
    url: `/api/v1/courses/${course_id}/lessons`,
    method: 'GET'
  })
  return res.data
}

