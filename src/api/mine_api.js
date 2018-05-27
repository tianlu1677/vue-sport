import request from './request'

// 获取当前用户信息
export async function getCurrentAccount(token = '') {
  const res = await request({
    url: '/api/v1/mine/accounts/info',
    method: 'GET',
    params: {
      token: token
    }
  })
  return res.data
}

// 更新用户信息
export async function updateAccountInfo(data = {}) {
  const res = await request({
    url: '/api/v1/mine/accounts/' + data['id'],
    method: 'PUT',
    data: data
  })

  return res.data
}

// 发布的心得
export async function getCurrentAccountPublishTopics(params = {}) {
  const res = await request({
    url: `/api/v1/mine/topics`,
    method: 'GET',
    params: params
  })
  return res
}

// 收藏、喜欢的心得
export async function getCurrentAccountTopics(type = 'publish', params) {
  const res = await request({
    url: `/api/v1/mine/topics`,
    method: 'GET',
    params: {
      type: type,
      ...params
    }
  })
  return res
}

// 发布的课程, 学过的课程， 收藏的课程
// type: publish, learn, star
export async function getCurrentAccountCourses(type = 'publish', params = {}) {
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

// 发布的课程, 学过的课程， 收藏的课程
// type: star, praise
export async function getCurrentAccountLessons(type, params = {}) {
  const res = await request({
    url: '/api/v1/mine/lessons',
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
