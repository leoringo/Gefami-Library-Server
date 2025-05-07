const { Book } = require('../models')

class BookController {
    static async getAllBook(req, res, next) {
        try {
            const allBooks = await Book.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                order: [['id', 'ASC']]
            })

            res.status(200).json(allBooks)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = BookController