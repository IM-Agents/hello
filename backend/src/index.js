import http from 'http'
import { createApp } from './app.js'
import { config } from './config.js'

const app = createApp()
const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Calculator API listening on http://localhost:${config.port}`)
})

const shutdown = () => {
  server.close(() => process.exit(0))
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
