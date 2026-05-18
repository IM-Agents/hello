const express = require('express')
const historyService = require('../services/history.service')
const { asyncHandler } = require('../middleware/asyncHandler')

const router = express.Router()

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    res.json({
      success: true,
      items: historyService.getHistory(),
      maxItems: historyService.MAX_HISTORY,
    })
  }),
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { expression, result, angleMode = 'DEG' } = req.body || {}
    if (!expression || result === undefined) {
      return res.status(400).json({
        success: false,
        message: 'expression and result are required',
      })
    }
    const entry = historyService.addEntry({ expression, result, angleMode })
    return res.status(201).json({ success: true, item: entry })
  }),
)

router.delete(
  '/',
  asyncHandler(async (_req, res) => {
    historyService.clearHistory()
    res.json({ success: true, message: 'History cleared' })
  }),
)

module.exports = { historyRouter: router }
