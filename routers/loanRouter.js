const router = require('express').Router()
const authorization = require('../middlewares/authrorization')
const LoanController = require('../controllers/LoanController')

router.post('/borrow', LoanController.borrowBook)

router.use(authorization)
router.post('/list', LoanController.getLateReturn)
router.post('/return', LoanController.returnBook)

module.exports = router