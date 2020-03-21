const Sequelize = require('sequelize');

// const settings = {
//   host: 'localhost',
//   username: 'root',
//   password: '123456',
//   db: 'testdb',
//   dialect: 'sqlite',
//   storage: './database.sqlite'
// }

// // SQLITE
// const sequelize = new Sequelize({
//   dialect: settings.dialect,
//   storage: settings.storage
// });

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:P@ssw0rd@localhost:5432/testdb')

module.exports = sequelize;