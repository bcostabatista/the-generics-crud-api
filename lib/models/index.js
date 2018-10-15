module.exports = {}

import { Model } from 'objection';
const Knex = require('knex');
let knexConfig;
if (process.env.PORT) {
    knexConfig = require('../../knex/knexfile').production;
} else {
    knexConfig = require('../../knex/knexfile').development;
}
const knex = Knex(knexConfig);
Model.knex(knex);