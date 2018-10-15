import { Users } from '../models/Users'
import { RenewPasswordTokens } from '../models/RenewPasswordTokens'
import bcrypt from 'bcryptjs'
import Authenticate from '../../middlewares/Authenticate'
import moment from 'moment'
import { RenderEmail } from '../utils/Mailer'
import { raw } from 'objection'
import Authentication from '../../middlewares/Authentication'

export const Auth = (router) => {

    router.post('/user', function * () {
        try {
            let params = this.request.body
            if(!params.email) throw new Error('Email is required')
            if(!params.password) throw new Error('Password is required')
            let user = yield Users.query()
                        .findOne('email', params.email)
                        .where('confirmed', true)
                        .andWhere('status', 1)
            if(user) {
                if(bcrypt.compareSync(this.request.body.password, user.password)) {
                    delete user.password
                    let token = Authenticate(user.email)
                    user['token'] = token
                    this.body = user
                } else {
                    throw new Error('Auth failed: Incorrect password')
                }
            } else {
                throw new Error('Auth failed: User not found')
            }
        } catch(error) {
            this.body = {error: error.message}
        }
    })

    router.post('/forgot-password', function * () {
        try {
            let user = yield Users.query().findOne(raw('LOWER(email)'), this.request.body.email.toLowerCase())
            if(user) {
                let token = new Buffer(`${moment().format('YYYYMMDDHHmmss')}.${user.email}`)
                let base64Token = token.toString('base64')
                yield RenewPasswordTokens.query().insert({user_id: user.id, token: base64Token})
                yield RenderEmail(user.email, 'Password recovery', 'forgotPassword', { renewUrl: `http://localhost:8181/renew-password/${base64Token}` })
                this.body = {msg: 'Mail sent'}
            } else {
                throw new Error('Mail not sent')
            }
        } catch(error) {
            this.body = {error: error.message}
        }
    })

    router.post('/renew-password', function * () {
        try {
            let params = this.request.body
            let token = yield RenewPasswordTokens.query().findOne('token', params.token)
            if(token) {
                let newPassword = bcrypt.hashSync(params.new_password)
                yield Users.query().update({password: newPassword}).where('id', token.user_id)
                yield RenewPasswordTokens.query().deleteById(token.id)
                this.body = {msg: 'Password updated'}
            } else {
                throw new Error('Invalid token')
            }
        } catch(error) {
            this.body = {error: error.message}
        }
    })

    router.get('/logged', Authentication, function * () {
        try {
            let user = yield Users.query().findById(this.userInfo.id)
            if(user) {
                delete user.password
                this.body = user
            } else {
                throw new Error('User not found')
            }
        } catch(error) {
            this.body = {error: error.message}
        }
    })
}