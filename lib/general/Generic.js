import Authentication from '../../middlewares/Authentication'
import { MODELS_MAP} from '../utils/ModelsMap'
import bcryptjs from 'bcryptjs'

export const Generic = (router) => {

    let authRole = function * (next) {
        let actionType = this.request.url.split('/')[2]
        if(typeof MODELS_MAP[this.params.model] === 'undefined') throw new Error('Missing map')
        if(!MODELS_MAP[this.params.model][this.userInfo.role].canDo.includes(actionType)) {
            this.status = 401
            return
        }
        yield next
    }

    router.post('/create/:model', Authentication, authRole, function * (next) {
        try {
            let data = this.request.body
            if(data.password) data.password = bcryptjs.hashSync(data.password)
            this.body = yield MODELS_MAP[this.params.model].entity.query()
                            .insertAndFetch(data)
        } catch(error) {
            this.body = {error: error.message}
        }
    })

    router.get('/read/:model/:id?', Authentication, authRole, function * (next) {
        try {
            let rows = MODELS_MAP[this.params.model].entity.query()
            if(this.params.id) {
                rows.findById(this.params.id)
            }
            this.body = yield rows
        } catch(error) {
            this.body = {error: error.message}
        }
    })

    router.put('/update/:model', Authentication, authRole, function * (next) {
        try {
            let data = this.request.body
            if(data.password) data.password = bcryptjs.hashSync(data.password)
            this.body = yield MODELS_MAP[this.params.model].entity.query()
                            .updateAndFetchById(data.id, data)
        } catch(error) {
            this.body = {error: error.message}
        }
    })

    router.delete('/delete/:model/:id', Authentication, authRole, function * (next) {
        try {
            yield MODELS_MAP[this.params.model].entity.query().deleteById(this.params.id)
            this.body = {msg: 'Deleted'}
        } catch(error) {
            this.body = {error: error.message}
        }
    })

    router.get('/search/:model/:field/:value', Authentication, authRole, function * (next) {
        try {
            let rows = yield MODELS_MAP[this.params.model].entity.query()
                        .whereRaw(`${this.params.field} ILIKE '%${this.params.value}%'`)
            if(rows) {
                this.body = rows
            } else {
                throw new Error('Nothing found')
            }
        } catch(error) {
            this.body = {error: error.message}
        }
    })

}