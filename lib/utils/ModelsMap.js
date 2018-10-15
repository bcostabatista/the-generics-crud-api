import { Professions } from '../models/Professions'

/*
Every model you want available for your cruds
Should be mapped in this file.

administrator and ordinary are example roles, with that in
mind, you are able to define the actions each role is allowed 
to perform in the database entity of your choice.

You can add as many entities as you want.
*/

export const MODELS_MAP = {
    'professions': {
        entity: Professions,
        administrator: {canDo: ['create','read','update','delete','search']}, 
        ordinary: {canDo: ['read','search']}
    }
}