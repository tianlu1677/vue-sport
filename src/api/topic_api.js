import request from './request'

export async function getTopicList(course_id) {
  const res = await request({
    url: `/api/v1/courses/${course_id}/topics`,
    method: 'GET'
  })
  return res.data
}

export async function getTopic(id) {
  const res = await request({
    url: `/api/v1/topics/${id}`,
    method: 'GET'
  })

  return res.data
}

