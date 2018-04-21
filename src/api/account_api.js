import request from './request'

export async function getCurrentAccounts() {
  const res = await request({
    url: '/api/v1/mine/accounts/info',
    method: 'GET',
    params: {current_account_id: 1}
  })
  return res.data
}
