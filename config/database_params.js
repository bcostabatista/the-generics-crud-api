const DEVELOPMENT = {
    host: 'localhost',
    port: 5432,
    database: 'crud_api',
    user: 'postgres',
    password: 'root'
}

const PRODUCTION = {
    host: 'localhost',
    port: 5432,
    database: 'crud_api',
    user: 'postgres',
    password: 'root'
}

module.exports = {
    development: DEVELOPMENT,
    production: PRODUCTION
}