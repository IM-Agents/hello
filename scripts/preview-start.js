const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const PORT = process.env.PORT || 8080
const API_PORT = process.env.API_PORT || 4000
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/'

const ROOT = path.resolve(__dirname, '..')
const pidFile = path.join(ROOT, '.preview.pids')
const pids = []

const startProcess = (label, cmd, args, cwd, env = {}) => {
  const proc = spawn(cmd, args, {
    cwd,
    env: { ...process.env, ...env, NODE_ENV: 'production' },
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })
  pids.push(proc.pid)
  console.log(`[preview] ${label} started (pid ${proc.pid})`)
  proc.on('error', (err) => console.error(`[preview] ${label} error:`, err.message))
  return proc
}

startProcess('api', 'node', ['dist/server.js'], path.join(ROOT, 'apps/api'), {
  PORT: API_PORT,
})

fs.writeFileSync(pidFile, `${pids.join('\n')}\n`)

console.log(`\n[preview] Proxy → http://localhost:${PORT}${PUBLIC_PATH}\n`)
require('./proxy')
