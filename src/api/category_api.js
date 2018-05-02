import request from './request'

// 兴趣广场页
export async function getCategories() {
  const res = await request({
    url: '/api/v1/categories',
    method: 'GET'
  })
  return res.data
}

// 获取分类下的热门课程
export async function getCategoryHotCourses(id) {
  const res = await request({
    url: `/api/v1/categories/${id}/hot_courses`,
    method: 'GET',
  })
  return res.data
}

// 获取分类下的每日推荐
export async function getCategoryDailyCourses(id, page = 1, per_page = 5, params = {}) {
  const res = await request({
    url: `/api/v1/categories/${id}/courses`,
    method: 'GET',
    params: {
      page: page,
      per_page: per_page,
      ...params
    }
  })
  return res
}
