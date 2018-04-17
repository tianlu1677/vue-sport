import request from './request'

export async function getAccounts  (data = {}) {
  const res = await request({
    url: '/api/v1/accounts',
    method: 'GET',
    data: data
  })

  return res.data
}  
// export default api;
