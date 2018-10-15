let { development, production } = require('../config/database_params')

module.exports = {
  development: {
    client: "postgres",
    connection: {
      ...development
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: "postgres",
    connection: {
      ...production
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
