import request from './request'

// 获取当前用户信息
export async function getCurrentAccount() {
  const res = await request({
    url: '/api/v1/mine/accounts/info',
    method: 'GET',
    params: {current_account_id: 1}
  })
  return res.data
}
