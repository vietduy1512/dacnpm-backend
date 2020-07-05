const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DATABASE || 'masterdb',
//   process.env.USERNAME || 'postgres',
//   process.env.PASSWORD || 'P@ssw0rd',
//   {
//     host: process.env.HOST || 'localhost',
//     port: process.env.PORT || '5432',
//     dialect: 'postgres',
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   }
// );

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:P@ssw0rd@localhost:5432/masterdb')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })
  .done();

module.exports = sequelize;