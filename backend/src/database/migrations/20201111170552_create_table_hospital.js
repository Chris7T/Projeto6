exports.up = knex => knex.schema.createTable('hospital', table=>{
    table.increments('id')
    table.text('name').unique().notNullable()
    table.text('email').unique().notNullable()
    table.text('password').notNullable()
    table.text('phone').notNullable()
    table.text('address').notNullable()
    table.integer('total').notNullable()
    table.integer('current').notNullable()
});


exports.down = knex => knex.schema.dropTable('hospital')
