import request from './request'

//用户的详情页
export async function getAccount(id) {
  const res = await request({
    url: `/api/v1/accounts/${id}`,
    method: 'GET',
  })
  return res.data
}

// 发布的心得
export async function getAccountPublishTopics(id, params = {}) {
  const res = await request({
    url: `/api/v1/accounts/${id}/publish_topics`,
    method: 'GET',
    params: params
  })
  return res
}

// 发布的课程
export async function getAccountPublishCourses(id, params = {}) {
  const res = await request({
    url: `/api/v1/accounts/${id}/publish_courses`,
    method: 'GET',
    params: params
  })
  return res
}

// 学过的课程
export async function getAccountLearnCourses(id, params = {}) {
  const res = await request({
    url: `/api/v1/accounts/${id}/learn_courses`,
    method: 'GET',
    params: params
  })
  return res
}

// 关注
export async function getAccountFollow(id) {
  const res = await request({
    url: `/api/v1/accounts/${id}/follow`,
    method: 'POST'
  })
  return res.data
}


// 取消关注
export async function getAccountUnFollow(id) {
  const res = await request({
    url: `/api/v1/accounts/${id}/unfollow`,
    method: 'POST'
  })
  return res.data
}

