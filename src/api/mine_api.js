import request from './request'

// 获取当前用户信息
export async function getCurrentAccount() {
  const res = await request({
    url: '/api/v1/mine/accounts/info',
    method: 'GET'
  })
  return res.data
}

// 发布的心得
export async function getCurrentAccountPublishTopics(id, params = {}) {
  const res = await request({
    url: `/api/v1/mine/${id}/publish_topics`,
    method: 'GET',
    params: params
  })
  return res
}

// 发布的课程, 学过的课程， 收藏的课程
// type: publish, learn, star
export async function getCurrentAccountCourses(id, type = 'publish', params = {}) {
  const res = await request({
    url: '/api/v1/mine/courses',
    method: 'GET',
    params: {
      type: type,
      ...params
    }
  })
  return res
}

// 输入验证码
export async function verifyInviteCode(data = {code: ''}) {
  const res = await request({
    url: '/api/v1/mine/verify_invite_code',
    method: 'POST',
    data: data
  })
  return res.data
}
