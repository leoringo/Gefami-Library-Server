// const { Op } = require('sequelize')
const { Loan, Book, User } = require('../models')

class LoanController {

    static async borrowBook(req, res, next) {
        try {
            const { userId } = req.user
            const { bookId } = req.body || {}

            console.log(bookId, `<< bookid`)

            if (!bookId) throw { name: "BAD_REQUEST" }

            const existingLoan = await Loan.findOne({ where: { userId, returnedAt: null } })

            if (existingLoan) throw { name: "ALREADY_BORROWING" }

            const book = await Book.findByPk(bookId)

            if (!book || book.stock < 1) throw { name: "BOOK_NOT_AVAILABLE" }

            const now = new Date()
            // !! now dalam milisec + hasil kali 3 hari 24 jam 60 jam 60 menit 1000 milisecs
            const dueDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)

            await Loan.create({ userId, bookId, borrowedAt: new Date(), dueDate })

            await book.decrement('stock')

            res.status(201).json({ message: 'Book successfully borrowed!' })

        } catch (error) {
            next(error)
        }
    }

    static async returnBook(req, res, next) {
        try {
            const { email } = req.body || {}

            if (!email) throw { name: 'INVALID_INPUT' }

            const user = await User.findOne({ where: { email } })

            if (!user) throw { name: 'INVALID_EMAIL' }

            const loan = await Loan.findOne({
                where: {
                    userId: user.id,
                    returnedAt: null
                }
            })

            if (!loan) throw { name: "LOAN_NOT_FOUND" }

            loan.returnedAt = new Date()

            await loan.save()

            const book = await Book.findByPk(loan.bookId)

            if (!book) throw { name: "BAD_REQUEST" }

            await book.increment('stock')

            res.status(200).json({ message: `Book borrowed by ${email} successfully returned!` })

        } catch (error) {
            next(error)
        }
    }

    static async getLateReturn(req, res, next) {
        try {
            const today = new Date();

            const lateLoans = await Loan.findAll({
                where: {
                    // dueDate: { [Op.lte]: today },
                    returnedAt: null
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: User,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } // optional: exclude password too
                    },
                    {
                        model: Book,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }
                ]
            });

            res.status(200).json(lateLoans);
        } catch (error) {
            next(error)
        }
    }

}

module.exports = LoanController