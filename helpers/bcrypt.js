const bcrypt = require('bcryptjs')
const salt = 5

const hash = (password) => {
    return bcrypt.hashSync(password, salt)
}

const compareHash = (password, hashedValue) => {
    return bcrypt.compareSync(password, hashedValue)
}


module.exports = {hash, compareHash}