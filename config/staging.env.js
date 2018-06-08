'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"staging"',
  API_HOST: '"http://xinxue.niubibeta.com"'
})
