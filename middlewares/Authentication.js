/*
This middleware must be used for every request 
that requires the user to be authenticated.

It's going to fill the userInfo object that
has been created in app.js line 22
*/

import { Users } from '../lib/models/Users'

function *getUserInfo(user) {
    let data = yield Users.query().findOne('email', user.email)
    return data
}

module.exports = function* (next) {
	try {
        if(this.request.header.authorization) {
            let token = this.request.header.authorization
            let breakup = token.split('.')
            let userDetails = Buffer.from(breakup[1], 'base64').toString()
            let user = JSON.parse(userDetails)
            let userInfo = yield getUserInfo(user)
            
            if(userInfo) {
                this.userInfo = userInfo
                yield next
            } else {
                this.status = 401
            }

        } else {
            this.status = 401
        }
	} catch (error) {
		this.body = { error: error.message }
	}
}