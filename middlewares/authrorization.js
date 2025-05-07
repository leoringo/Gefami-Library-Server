const { jwtVerify } = require('../helpers/jsonwebtoken')

const authorization = (req, res, next) => {
    try {

        const { role } = req.user

        if (role !== 'admin') throw { name: "FORBIDDEN" }

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authorization