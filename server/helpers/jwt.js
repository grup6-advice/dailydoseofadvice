const jwt = require('jsonwebtoken');

function generateToken(payload) {
    return jwt.sign(payload, process.env.secretkey)
}

function verifyToken(token) {
    return jwt.verify(token, process.env.secretkey)
}

module.exports = {
    generateToken,
    verifyToken
}