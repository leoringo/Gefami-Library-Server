const jwt = require('jsonwebtoken')
const biskuit = process.env.biskuit

const jwtSign = (payload) => {
    return jwt.sign(payload, biskuit)
}

const jwtVerify = (token) => {
    return jwt.verify(token, biskuit)
}

module.exports = { jwtSign, jwtVerify }