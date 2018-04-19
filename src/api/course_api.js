import request from './request'

export async function getCourse(id) {
  const res = await request({
    url: '/api/v1/courses/' + id,
    method: 'GET'
  })
  return res.data
}

// 开始学习
export async function createLearning(course_id, data = {}) {
  const res = await request({
    url: `/api/v1/learnings`,
    method: 'POST',
    data: {
      course_id: course_id
    }
  })
  return res.data
}

// 点赞，收藏, 分享, 查看
// action_type(praise, star, share, view)
export async function createAction(id, action_type = 'praise', data = {}) {
  const res = await request({
    url: `/api/v1/courses/${id}/create_actions`,
    method: 'POST',
    data: data
  })
  return res.data
}

// 取消点赞,收藏
export async function destroyAction(id, action_type = 'praise', data = {}) {
  const res = await request({
    url: `/api/v1/course/${id}/destroy_actions`,
    method: 'POST',
    data: data
  })
  return res.data
}
