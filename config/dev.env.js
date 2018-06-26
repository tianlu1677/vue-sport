'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const API_HOST = "https://xinxue.niubibeta.com/"
const appid = 'wxbc7ac724a2717bc0'
const redirect_uri = API_HOST + 'wechat/sessions/new'
const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo#wechat_redirect`

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"http://localhost:5000"',
  REDIRECT_URL: `'${url}'`,
})
