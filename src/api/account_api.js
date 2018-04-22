import request from './request'

export async function getCurrentAccount() {
  const res = await request({
    url: '/api/v1/mine/accounts/info',
    method: 'GET',
    params: {current_account_id: 1}
  })
  return res.data
}

export async function getAccount(id) {
  const res = await request({
    url: `/api/v1/accounts/${id}`,
    method: 'GET',
  })
  return res.data
}
