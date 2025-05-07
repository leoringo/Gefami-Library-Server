const { jwtVerify } = require('../helpers/jsonwebtoken')
const { User } = require('../models')

const authenticator = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) throw { name: "UNAUTHENTICATED" }

        const { id } = jwtVerify(token)

        const user = await User.findByPk(id)

        if (!user) throw { name: "UNATHENTICATED" }

        const { email, role } = user

        req.user = { userId: id, email, role }

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authenticator