'use strict';

const mongoose = require('mongoose');
// const jwt_auth = require('../lib/jwt_auth');
const serverError = require('debug')('rxsms:test_error');
mongoose.connect('mongodb://localhost/routes_tests');
let app = require('express')();
const drugRoute = require('../routes/drug_route');
const userRoute = require('../routes/user_route');

app.use('/api/user', userRoute);
app.use('/api/drug', drugRoute);

app.use((err, req, res, next) => {
  serverError(err);
  res.status(err.statusCode || 500).json(err.message);
  next();
});

module.exports = exports = app;
