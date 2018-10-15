import { Model } from 'objection'
import { validateFields } from '../utils/ValidateFields'

const REQUIRED_FIELDS = ['email','password']

export class Users extends Model {

    static tableName = 'users'
    
    static relationMappings = {
        accessLog: {
            relation: Model.HasManyRelation,
            modelClass: require('./AccessLog').AccessLog,
            join: {
                from: 'users.id',
                to: 'access_log.user_id'
            }
        }
    }

    async $beforeInsert() {
        let message = validateFields(this, REQUIRED_FIELDS)
        if(message) throw new Error(message)
        let alreadyExists = await Users.query().findOne('email', this.email)
        if(alreadyExists) throw new Error('Email already exists')
    }

}