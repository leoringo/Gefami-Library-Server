const router = require('express').Router()
const authorization = require('../middlewares/authrorization')
const LoanController = require('../controllers/LoanController')

router.post('/borrow', LoanController.borrowBook)

router.use(authorization)
router.get('/get', LoanController.getLateReturn)
router.post('/return', LoanController.returnBook)

module.exports = router