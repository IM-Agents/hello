const express = require('express')
const { calculateRouter } = require('./calculate.routes')
const { historyRouter } = require('./history.routes')

const router = express.Router()

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

router.use('/v1/calculate', calculateRouter)
router.use('/v1/history', historyRouter)

module.exports = { router }
