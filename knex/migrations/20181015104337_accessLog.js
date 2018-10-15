exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('access_log', function (table) {
            table.increments('id').notNullable()
            table.integer('user_id').nullable()
            table.string('ip', 45)
            table.string('url', 200)
            table.datetime('date').notNullable()
            table.tinyint('status').notNullable()
            table.text('body')
        })
    ])
}

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('access_log')
    ])
}
  