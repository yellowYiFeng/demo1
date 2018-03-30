'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://devinner.yunxuetang.com.cn/crmbossapi/v1/"',
  COM_URL: '"http://devinner.yunxuetang.com.cn/componentapi/v1/"',
  BASE_COMPANY_URL: '"http://devinner.yunxuetang.com.cn/qidaapi/v1/"',
  LOG_URL: '"http://devinner.yunxuetang.com.cn/crmbosadmin/v1/"',
  BCEBOS_URL: '"http://devinner.yunxuetang.com.cn/componentapi/v1/"'
})
