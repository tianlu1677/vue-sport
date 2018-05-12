import request from './request'

// 搜索课程
export async function searchCourses(name = '', type = 'course', params = {}) {
  const res = await request({
    url: '/api/v1/search/courses',
    method: 'POST',
    params: {
      name: name,
      type: type,
      ...params
    }
  })
  return res
}
