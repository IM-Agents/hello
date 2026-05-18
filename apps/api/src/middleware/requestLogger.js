'use strict'

const requestLogger = (req, _res, next) => {
  console.log('request', { method: req.method, path: req.path })
  next()
}

module.exports = { requestLogger }
