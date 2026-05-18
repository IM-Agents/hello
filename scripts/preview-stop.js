const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const ROOT = path.resolve(__dirname, '..')
const pidFile = path.join(ROOT, '.preview.pids')

const killPid = (pid) => {
  try {
    process.kill(pid, 'SIGTERM')
    console.log(`[preview:stop] killed pid ${pid}`)
  } catch {
    /* already stopped */
  }
}

if (fs.existsSync(pidFile)) {
  const pids = fs.readFileSync(pidFile, 'utf8').trim().split('\n').filter(Boolean)
  pids.forEach((p) => killPid(Number(p)))
  fs.unlinkSync(pidFile)
}

const ports = [process.env.PORT || 8080, process.env.API_PORT || 4000]
ports.forEach((port) => {
  try {
    execSync(`fuser -k ${port}/tcp 2>/dev/null || true`, { stdio: 'ignore' })
  } catch {
    /* ignore */
  }
})

console.log('[preview:stop] done')
