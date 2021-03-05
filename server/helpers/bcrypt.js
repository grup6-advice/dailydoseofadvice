const bcryptjs = require('bcryptjs');

function hashPassword (password) {
  return bcryptjs.hashSync(password, 10);
}

function comparePassword (bodyPassword, dbPassword) {
  return bcryptjs.compareSync(bodyPassword, dbPassword);
}

module.exports = { hashPassword, comparePassword}