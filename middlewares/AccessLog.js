import { AccessLog } from '../lib/models/AccessLog'
import moment from 'moment'

/*
You might want to use this middleware to 
keep track of user's activities
*/

module.exports = function* (next) {
    try {
        let log = {
            user_id: this.userInfo.id,
            ip: this.request.ip,
            url: this.request.url.slice(0, 200),
            date: moment().format('YYYY-MM-DD HH:mm'),
            status: 1,
            body: JSON.stringify(this.request.body) || ""
        }
        yield AccessLog.query().insert(log)
        yield next
    } catch (error) {
        this.body = { error: error.message }
    }
}
