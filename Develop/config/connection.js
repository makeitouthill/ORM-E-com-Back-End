require('dotenv').config();
const mysql = require('mysql2');

const Sequelize = require('sequelize');
const {DB_NAME, DB_USER, DB_PASSWORD} = process.env;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ecommerce_db',
});
connection.end();

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize('ecommerce_db', 'root', 'password', {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection successful.');
    })
    .catch(err => {
      console.error('Unable to connect to database:', err);
    });
    sequelize.sync({ force: true });
module.exports = sequelize;
