const { app } = require('./app')

const port = Number(process.env.PORT || process.env.API_PORT || 4000)

const server = app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})

const shutdown = () => {
  server.close(() => process.exit(0))
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
