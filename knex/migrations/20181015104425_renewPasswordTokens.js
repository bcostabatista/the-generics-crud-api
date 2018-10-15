exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('renew_password_tokens', function(table){
            table.increments('id').notNullable()
            table.integer('user_id').unsigned().references('users.id').notNullable()
            table.text('token').notNullable()
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('renew_password_tokens')
    ])
};
  