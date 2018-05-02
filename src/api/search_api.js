import request from './request'

// 搜索课程
export async function searchCourses(params = {name: '', type: undefined}) {
  const res = await request({
    url: '/api/v1/search/courses',
    method: 'POST',
    params: params
  })
  return res.data
}
