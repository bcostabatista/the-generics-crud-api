let { development, production } = require('../config/database_params')

let productionEnv = !!process.env.PORT;

let dbConfig = {
  ...development,
  ssl: true,
  max: 10,
  idleTimeoutMillis: 30000
}

if(productionEnv){
  dbConfig = {
    ...production,
    max: 10,
    idleTimeoutMillis: 30000
  }
}

module.exports = dbConfig



