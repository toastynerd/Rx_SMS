'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const serverError = require('debug')('rxsms:error');
const mongoose = require('mongoose');
const Promise = require('./lib/promise');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/dev');
const drugRoute = require('./routes/drug_route');
const userRoute = require('./routes/user_route');

app.use(morgan('dev'));

app.use('/api', userRoute);
app.use('/api', drugRoute);

app.use((err, req, res, next) => {
  serverError(err);
  res.status(err.statusCode || 500).json(err.message);
  next();
});

app.listen(3000, () => {
  console.log('Server up on 3000');
});
