'use strict'

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const routes = require('./src/routes')
const { errorHandler } = require('./src/middleware/errorHandler')
const { requestLogger } = require('./src/middleware/requestLogger')

const app = express()
const PORT = process.env.PORT || 3001

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN || true }))
app.use(express.json())
app.use(requestLogger)
app.use('/api/v1', routes)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'calculator-api' })
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(`Calculator API listening on port ${PORT}`)
})

const shutdown = () => {
  server.close(() => process.exit(0))
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

module.exports = app
