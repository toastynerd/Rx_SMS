'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const serverError = require('debug')('rxsms:error');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/dev');
const drugRoute = require('./routes/route');

app.use(morgan('dev'));
app.use('/api', drugRoute);

app.use((err, req, res, next) => {
  serverError(err);
  res.status(err.statusCode || 500).json(err.message);
  next();
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server up on '+ (process.env.PORT || 3000));
});
