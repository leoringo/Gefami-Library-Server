const errorHandler = (err, req, res, next) => {
    console.log(err)
    let status = 500
    let message = 'Internal Server Error'

    switch (err.name) {
        case "UNAUTHENTICATED":
        case "JsonWebTokenError":
            status = 401
            message = 'You Are Not Authenticated!'
            break;

        case "FORBIDDEN":
            status = 403
            message = 'You Are Not Authorized'
            break;

        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400
            message = err.errors[0].message
            break;

        case "NULL_NAME":
            status = 400
            message = 'Name Required'
            break;

        case "NULL_EMAIL":
            status = 400
            message = 'Email Required'
            break

        case "NULL_PASSWORD":
            status = 400
            message = 'Password Required'
            break;

        case "INVALID_EMAIL":
            status = 401
            message = 'Invalid Email'
            break;

        case "INVALID_PASSWORD":
            status = 401
            message = 'Invalid Password'
            break;

        case "REGISTERED_EMAIL":
            status = 404
            message = 'Email already registered!'
            break;

        case "UNAUTHORIZED":
            status = 401
            message = 'UNAUTHORIZED'
            break;

        case "INVALID_INPUT":
            status = 404
            message = 'Please fill the empty form'
            break;

        case "BAD_REQUEST":
            status = 404
            message = 'Something went wrong'
            break;

        case "ALREADY_BORROWING":
            status = 404
            message = 'Please return your book before borrowing!'
            break;

        case "BOOK_NOT_AVAILABLE":
            status = 404
            message = 'Seems like the book is not available'

        case "LOAN_NOT_FOUND":
            status = 404
            message = 'Loan not found'

    }

    res.status(status).json({ message })
}

module.exports = errorHandler