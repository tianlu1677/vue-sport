import request from './request'

// 课程详情页
export async function getCourse(id) {
  const res = await request({
    url: '/api/v1/courses/' + id,
    method: 'GET'
  })
  return res.data
}

// 课程基本信息页
export async function getCourseBase(id) {
  const res = await request({
    url: '/api/v1/courses/' + id + '/base',
    method: 'GET'
  })
  return res.data
}

export async function getLearningStatus(id) {
  const res = await request({
    url: '/api/v1/courses/' + id + '/learning',
    method: 'GET'
  })
  return res.data
}

// 课程下所有心得
export async function getCourseTopics(id, params = {}) {
  const res = await request({
    url: '/api/v1/courses/' + id + '/topics',
    method: 'GET',
    params: params
  })
  return res
}

// 点赞，收藏, 分享, 查看
// type(praise, star, share, view)
export async function createAction(id, type) {
  const res = await request({
    url: `/api/v1/courses/${id}/create_actions`,
    method: 'POST',
    data: {
      type: type
    }

  })
  return res.data
}

// 取消点赞,收藏, type: praise, star, share, view
export async function destroyAction(id, type) {
  const res = await request({
    url: `/api/v1/courses/${id}/destroy_actions`,
    method: 'POST',
    data: {
      type: type
    }
  })
  return res.data
}
