export const errorHandler = (err, _req, res, _next) => {
  console.error('Unhandled error', err)

  res.status(500).json({
    success: false,
    errorCode: 'INTERNAL_ERROR',
    message: 'Internal server error',
    timestamp: new Date().toISOString()
  })
}
