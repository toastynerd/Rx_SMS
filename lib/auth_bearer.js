'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/userschema');
const HandleError = require('../controller/errhandler');

module.exports = exports = function(req, res, next){
  new Promise((resolve, reject) =>{
    let authHeader = req.headers.authorization;
    if(!authHeader) return HandleError(400, next, 'No Auth token provided');
    if (typeof authHeader !== 'string') return 'No auth token provided';
    authHeader = authHeader.split(' ');
    if(authHeader[0] !== 'Bearer') return 'No auth token provided';
    let decoded = jwt.verify(authHeader[1], process.env.APP_SECRET);
    if (!decoded) return 'Invalid Token';
    User.findOne({'basic.username': decoded.idd})
      .then((user)=>{
        if (user === null) return 'Could not find user';
        req.user = user;
        console.log(user);
        next();
        resolve(user);
      }, reject);
  }).catch(HandleError(401, next));
};
