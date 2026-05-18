const path = require('path')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const PORT = process.env.PORT || 8080
const API_PORT = process.env.API_PORT || 4000
const webDist = path.resolve(__dirname, '../apps/web/dist')

const app = express()

app.use(
  '/api',
  createProxyMiddleware({
    target: `http://localhost:${API_PORT}`,
    changeOrigin: true,
  }),
)

app.use(express.static(webDist))

app.get('*', (_req, res) => {
  res.sendFile(path.join(webDist, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`[proxy] http://localhost:${PORT}/`)
})
