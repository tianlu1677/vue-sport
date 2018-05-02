import request from './request'

// 推荐的分类
export async function getRecommendCategories() {
  const res = await request({
    url: '/api/v1/home/recommend_categories',
    method: 'GET'
  })
  return res.data
}

// 推荐的课程
export async function getRecommendCourses() {
  const res = await request({
    url: '/api/v1/home/recommend_courses',
    method: 'GET'
  })
  return res.data
}

// 推荐的心得
export async function getRecommendTopics(params = {}) {
  const res = await request({
    url: '/api/v1/home/recommend_topics',
    method: 'GET',
    params: params
  })
  return res
}
