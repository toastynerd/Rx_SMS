'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const serverError = require('debug')('rxsms:error');
const mongoose = require('mongoose');
const Promise = require('./lib/promise');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dev');
const drugRoute = require('./routes/drug_route');
const userRoute = require('./routes/user_route');
const homeRoute = require('./routes/home_route');
const parseRoute = require('./routes/parse_route.js');

app.use(morgan('dev'));

app.use('/', homeRoute);
app.use('/api/user', userRoute);
app.use('/api/drug', drugRoute);
app.use('/inbound', parseRoute);

app.use((err, req, res, next) => {
  serverError(err);
  res.status(err.statusCode || 500).json(err.message);
  next();
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server up on ' + (process.env.PORT || 3000));
});
