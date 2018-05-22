import request from './request'

//获取分享的设置
export async function getWechatApiConfig(params = {url: '', chose_api: '', debug: false}) {
  const res = await request({
    url: `/api/v1/wechat/info`,
    method: 'GET',
    params: {
      url: params['url'],
      chose_api: params['chose_api'],
      debug: params['debug']
    }
  })
  return res.data
}
