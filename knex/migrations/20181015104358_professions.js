exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('professions', function (table) {
            table.increments('id').notNullable()
            table.string('profession').notNullable()
            table.tinyint('status').notNullable().default(1)
        })
    ])
}

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('professions')
    ])
}