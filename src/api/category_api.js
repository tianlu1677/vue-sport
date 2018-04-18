import request from './request'

export async function getCategories(data = {}) {
  const res = await request({
    url: '/api/v1/categories',
    method: 'GET',
    data: data
  })
  return res.data
}

export async function getCategoryCourses(data = {category_id: 0}) {
  const res = await request({
    url: `/api/v1/categories/${data.category_id}/courses`,
    method: 'GET',
    data: data
  })
  return res.data
}
