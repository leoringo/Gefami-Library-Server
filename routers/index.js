const router = require('express').Router()
const authenticator = require('../middlewares/authenticator')

const userRouter = require('./userRouter')
const bookRouter = require('./bookRouter')
const loanRouter = require('./loanRouter')

router.use('/user', userRouter)

router.use(authenticator)
router.use('/book', bookRouter)
router.use('/loan', loanRouter)

module.exports = router