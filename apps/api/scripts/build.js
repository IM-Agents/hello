const fs = require('fs')
const path = require('path')

const srcDir = path.join(__dirname, '../src')
const distDir = path.join(__dirname, '../dist')

const copyDir = (from, to) => {
  fs.mkdirSync(to, { recursive: true })
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const srcPath = path.join(from, entry.name)
    const destPath = path.join(to, entry.name)
    if (entry.isDirectory()) copyDir(srcPath, destPath)
    else fs.copyFileSync(srcPath, destPath)
  }
}

fs.rmSync(distDir, { recursive: true, force: true })
copyDir(srcDir, distDir)
console.log('API build: copied src → dist')
