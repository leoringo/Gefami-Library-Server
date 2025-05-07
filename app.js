require('dotenv').config()

const cors = require('cors')
const express = require('express')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const port = process.env.port

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./routers'))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Kembali lagi di famili ${port}`)
})