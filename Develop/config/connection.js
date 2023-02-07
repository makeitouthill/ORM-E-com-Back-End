require('dotenv').config();

const Sequelize = require('sequelize');
const {DB_NAME, DB_USER, DB_PASSWORD} = process.env;
console.log(DB_USER)

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
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
