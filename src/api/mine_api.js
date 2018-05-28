import request from './request'

// 获取当前用户信息
export async function getCurrentAccount(token = '') {
  const res = await request({
    url: '/api/v1/mine/accounts/info',
    method: 'GET',
    params: {
      token: token
    }
  })
  return res.data
}

// 更新用户信息
export async function updateAccountInfo(data = {}) {
  const res = await request({
    url: '/api/v1/mine/accounts/' + data['id'],
    method: 'PUT',
    data: data
  })

  return res.data
}

// 输入验证码
export async function verifyInviteCode(data = {code: ''}) {
  const res = await request({
    url: '/api/v1/mine/accounts/verify_invite_code',
    method: 'POST',
    data: data
  })
  return res.data
}
