exports.up = knex => knex.schema.createTable('user', table=>{
    table.increments('id')
    table.text('cpf').unique().notNullable()
    table.text('email').unique().notNullable()
    table.text('name').notNullable()
    table.text('password').notNullable()
    table.text('address').notNullable()
    table.text('phone')
});

exports.down = knex => knex.schema.dropTable('user')
