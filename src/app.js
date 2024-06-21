const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const accountRoutes = require('./routes/accountRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const dataHandlerRoutes = require('./routes/dataHandlerRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/accounts', accountRoutes);
app.use('/destinations', destinationRoutes);
app.use('/server', dataHandlerRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });

module.exports = app;
