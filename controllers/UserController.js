const { compareHash } = require('../helpers/bcrypt')
const { jwtSign } = require('../helpers/jsonwebtoken')
const { User } = require('../models')

class UserController {
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body || {}

            if (!name) throw { name: "NULL_NAME" }

            if (!password) throw { name: "NULL_PASSWORD" }

            if (!email) throw { name: "NULL_EMAIL" }

            const isUserUnique = await User.findOne({ where: { email } })

            if (isUserUnique) throw { name: "REGISTERED_EMAIL" }

            await User.create({ name, email, password })

            res.status(201).json({ message: "User successfully created!" })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body || {}

            if (!email) throw { name: "NULL_EMAIL" }

            if (!password) throw { name: "NULL_PASSWORD" }

            const user = await User.findOne({ where: { email } })

            if (!user) throw { name: "INVALID_EMAIL" }

            const isValidPassword = compareHash(password, user.password)

            if (!isValidPassword) throw { name: "INVALID_PASSWORD" }

            const token = jwtSign({ id: user.id })

            res.status(200).json({ token, email, role: user.role })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController