require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');
const authModule = require('./modules/auth');
require('dotenv').config();

const app = express();

/** Connecting to mongo db */
mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 });

mongoose.connection.on('error', (error) => {
  console.error('Error in connecting to mongodb.', error);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('Connection to mongodb is established.');
});

/** Public assets */
app.use('/static', express.static(`${__dirname}/public`));

/** Set ejs view engine */
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/** Pages */
app.use(routes);
/** Add routes */
app.use('/auth', authModule.router);

module.exports = app;
