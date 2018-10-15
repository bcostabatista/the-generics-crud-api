import koa from 'koa'
import Router from 'koa-router'
import body from 'koa-body'
import http from 'http'

//Setting up web server
const koaServer = new koa()
const server = http.createServer(koaServer.callback())

require('./lib/models')
server.listen(process.env.PORT || 8181)
console.log('Server running in http://localhost:' + (process.env.PORT || 8181))

koaServer.use(body())
koaServer.use(function* (next) {
	this.set('Access-Control-Allow-Origin', this.request.header.origin || '*')
	this.set('Access-Control-Allow-Headers', this.request.header['access-control-request-headers'] || '*')
	this.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')
	this.set('Access-Control-Allow-Credentials', 'true')
	this.set('Allow', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')
	this.set('Server', 'ApiServer')
	this.userInfo = {}
	if (this.method === 'OPTIONS') {
		this.body = ''
		return
	}
	yield next
})

//Routes

const authRouter = new Router({ prefix: '/auth' })
import { Auth } from './lib/general/Auth'
Auth(authRouter)
koaServer.use(authRouter.routes())

const genericRouter = new Router({ prefix: '/generic' })
import { Generic } from './lib/general/Generic'
Generic(genericRouter)
koaServer.use(genericRouter.routes())