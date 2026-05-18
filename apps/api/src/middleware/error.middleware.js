const errorMiddleware = (err, _req, res, _next) => {
  const status = err.status || 500
  res.status(status).json({
    success: false,
    errorCode: err.code || 'INTERNAL_ERROR',
    message: status === 500 ? 'Something went wrong' : err.message,
  })
}

module.exports = { errorMiddleware }
