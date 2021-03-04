const jwt = require('jsonwebtoken');
const {User} = require('../models');

function authenticate (req ,res, next) {
  let access_token = req.headers.access_token;
  let bodyJwt = null;

  try {
    bodyJwt = jwt.verify(access_token, process.env.secretkey);  
    next()
  } catch (err) {
    res.status(401).json({message : 'Unauthorize JWT error'})
  }
}

module.exports = authenticate;