const moment = require("moment/moment")

const defaultDate = new Date()

const dateFormatter = (date = defaultDate) => (
    // !! formatting into 17-08-1945 20:00
    moment(date).format('DD-MM-YYYY HH:mm')
)


module.exports = { dateFormatter }