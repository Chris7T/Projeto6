const dotenv = require('dotenv').config();//Importando Variaveis de Ambiente

module.exports = {

  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations'
  },
  seeds: {
    directory: './src/database/seeds'
  },
};
