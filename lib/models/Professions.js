import { Model } from 'objection'
import { validateFields } from '../utils/ValidateFields'

const REQUIRED_FIELDS = ['profession']

export class Professions extends Model {

    static tableName = 'professions'

    async $beforeInsert() {
        let message = validateFields(this, REQUIRED_FIELDS)
        if(message) throw new Error(message)
        let alreadyExists = await Professions.query().findOne('profession', this.profession)
        if(alreadyExists) throw new Error('Already exists')
    }
}