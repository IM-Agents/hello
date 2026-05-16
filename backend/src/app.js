import express from 'express'
import cors from 'cors'
import { config } from './config.js'
import { calculateRouter } from './routes/calculate.js'
import { historyRouter } from './routes/history.js'
import { errorHandler } from './middleware/errorHandler.js'

export const createApp = () => {
  const app = express()

  app.disable('x-powered-by')
  app.use(cors({ origin: config.corsOrigin }))
  app.use(express.json({ limit: '32kb' }))

  app.get('/health', (_req, res) => {
    res.json({ ok: true })
  })

  app.use('/api/v1', calculateRouter)
  app.use('/api/v1', historyRouter)

  app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Not found' })
  })

  app.use(errorHandler)

  return app
}
