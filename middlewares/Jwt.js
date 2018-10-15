const koaJwt = require('koa-jwt')
var token = require('../config/jwt')
module.exports = function * () {
  return koaJwt({
    secret: token.key 
  })
} 