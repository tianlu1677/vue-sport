import request from './request'

// 上传文件
export async function createAsset(data = {}) {
  const res = await request({
    url: '/api/v1/assets',
    method: 'POST',
    data: data
  })
  return res.data
}
