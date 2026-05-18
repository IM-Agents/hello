const express = require('express')
const { calculateSchema, validate } = require('../validators/calculate.validator')
const { calculate } = require('../services/calculate.service')
const { asyncHandler } = require('../middleware/asyncHandler')

const router = express.Router()

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { error, value } = validate(calculateSchema, req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        errorCode: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: error.details.map((d) => d.message),
      })
    }

    const result = calculate({
      expression: value.expression,
      angleMode: value.angleMode,
    })

    const status = result.success ? 200 : 422
    return res.status(status).json(result)
  }),
)

module.exports = { calculateRouter: router }
