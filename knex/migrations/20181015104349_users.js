exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function (table) {
            table.increments('id').notNullable()
            table.string('email').notNullable().unique()
            table.string('password').notNullable()
            //role field could be a reference to another entity, let's say, roles for example
            table.enu('role', ['administrator','ordinary']).notNullable().default(2)
            table.boolean('confirmed').notNullable().default(false)
            table.tinyint('status').notNullable().default(0)
            table.datetime('created_at').notNullable().default(knex.raw("NOW()"))
        })
    ])
}

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users')
    ])
}   