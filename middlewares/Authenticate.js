//Signs JWT token
const jwt = require('koa-jwt')
const token = require('../config/jwt')
module.exports = function (email) {
  let response = jwt.sign({email: email}, token.key)
  return response
}