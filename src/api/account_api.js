import request from './request'

//用户的详情页
export async function getAccount(id) {
  const res = await request({
    url: `/api/v1/accounts/${id}`,
    method: 'GET',
  })
  return res.data
}

// 发布的心得 收藏，喜欢的心得
// type= publish, praise, star
export async function getAccountTopics(id, type, params = {}) {
  const res = await request({
    url: `/api/v1/accounts/${id}/topics`,
    method: 'GET',
    params: {
      type: type,
      ...params
    }
  })
  return res
}

// 发布的课程, 学过的课程， 收藏的课程
// type: publish, learn, star, praise
export async function getAccountCourses(id, type = 'publish', params = {}) {
  const res = await request({
    url: `/api/v1/accounts/${id}/courses`,
    method: 'GET',
    params: {
      type: type,
      ...params
    }
  })
  return res
}

// 课时, 喜欢收藏的课时
// type: star, praise
export async function getAccountLessons(id, type, params = {}) {
  const res = await request({
    url: `/api/v1/accounts/${id}/lessons`,
    method: 'GET',
    params: {
      type: type,
      ...params
    }
  })
  return res
}

// 获取课时相关的统计数据
// types = "praise_lessons,star_lessons"
export async function getAccountCounts(id, opts = {types: ""}) {
  const res = await request({
    url: `/api/v1/accounts/${id}/counts`,
    method: 'GET',
    params: {
      types: opts.types
    }
  })
  return res.data
}

// 关注
export async function followAccount(id) {
  const res = await request({
    url: `/api/v1/accounts/${id}/follow`,
    method: 'POST'
  })
  return res.data
}


// 取消关注
export async function unfollowAccount(id) {
  const res = await request({
    url: `/api/v1/accounts/${id}/unfollow`,
    method: 'POST'
  })
  return res.data
}

// 我的评论
export async function getReplyComments(params = {}) {
  const res = await request({
    url: `/api/v1/mine/comments`,
    method: 'GET',
    params: params
  });

  return res
}

// 我的赞
export async function getInsiteNotifies(params = {}) {
  const res = await request({
    url: `/api/v1/mine/insite_notifies`,
    method: 'GET',
    params: params
  });

  return res
}
