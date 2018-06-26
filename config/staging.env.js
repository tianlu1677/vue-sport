'use strict'
const merge = require('webpack-merge')
const stagingEnv = require('./staging.env')

module.exports = merge(stagingEnv, {
  NODE_ENV: '"staging"',
  API_HOST: '"https://xinxue.niubibeta.com"'
})
