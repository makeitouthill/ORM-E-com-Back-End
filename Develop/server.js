const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Tag = require('./models/Tag');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './db/schema.sql'), 'utf8', (err, data) => {
  if (err) throw err;

  sequelize.query(data, (error, results) => {
    if (error) throw error;
    console.log('Schema has been successfully executed.');
  });
});

sequelize.sync({ force: false }).then(() => {
  console.log(`Tables have been created!`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
