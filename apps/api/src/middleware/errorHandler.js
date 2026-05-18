'use strict'

const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500
  const payload = {
    success: false,
    errorCode: err.code || 'SERVER_ERROR',
    message: status === 500 ? 'An unexpected error occurred' : err.message
  }
  if (process.env.NODE_ENV !== 'production' && status === 500) {
    payload.details = err.message
  }
  res.status(status).json(payload)
}

module.exports = { errorHandler }
