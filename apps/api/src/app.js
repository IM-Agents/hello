const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { router } = require('./routes')
const { errorMiddleware } = require('./middleware/error.middleware')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/api', router)

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Not found' })
})

app.use(errorMiddleware)

module.exports = { app }
