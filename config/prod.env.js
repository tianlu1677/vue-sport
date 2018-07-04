'use strict'
const API_HOST = "https://meirixinxue.com/"
const appid = 'wxbc7ac724a2717bc0'
const redirect_uri = API_HOST + 'wechat/sessions/new'
const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo#wechat_redirect`

module.exports = {
  NODE_ENV: '"production"',
  API_HOST: '"https://meirixinxue.com/"',
  ASSET_HOST: '"https://meirixinxue.com/"',
  REDIRECT_URL: `'${url}'`
}
