import request from './request'

export async function getCategories(data = {}) {
  const res = await request({
    url: '/api/v1/categories',
    method: 'GET',
    data: data
  })
  return res.data
}

export async function getCategoryHotCourses(data = {id: 0}) {
  const res = await request({
    url: `/api/v1/categories/${data.id}/courses.json`,
    method: 'GET',
    data: data
  })
  return res.data
}

export async function getCategoryDailyCourses(data = {id: 0, page: 1, per_page: 10}) {
  const res = await request({
    url: `/api/v1/categories/${data.id}/courses.json`,
    method: 'GET',
    data: data
  })
  return res
}
