'use strict'

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true })
  if (error) {
    return res.status(400).json({
      success: false,
      errorCode: 'VALIDATION_ERROR',
      message: 'Validation failed',
      details: error.details.map((d) => d.message)
    })
  }
  req.validated = value
  return next()
}

module.exports = { validate }
