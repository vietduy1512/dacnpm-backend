const Sequelize = require('sequelize');

const sequelize = new Sequelize('testdb', 'postgres', 'P@ssw0rd', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

//const sequelize = new Sequelize('postgres://postgres:P@ssw0rd@localhost:5432/testdb')

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