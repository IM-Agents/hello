import express from 'express'
import { historyStore } from '../services/historyStore.js'

const router = express.Router()

router.get('/history', (_req, res) => {
  res.json({ success: true, items: historyStore.list() })
})

router.post('/history', (req, res) => {
  const { expression, result, angleMode } = req.body ?? {}

  if (typeof expression !== 'string' || typeof result !== 'string') {
    return res.status(400).json({
      success: false,
      message: '`expression` and `result` must be strings'
    })
  }

  const mode = angleMode === 'RAD' ? 'RAD' : 'DEG'

  historyStore.add({ expression, result, angleMode: mode })

  return res.status(201).json({ success: true })
})

router.delete('/history', (_req, res) => {
  historyStore.clear()
  res.json({ success: true, message: 'History cleared' })
})

export { router as historyRouter }
