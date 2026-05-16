import express from 'express'
import { evaluateExpression, EvaluationError } from '../services/evaluator.js'
import { historyStore } from '../services/historyStore.js'

const router = express.Router()

router.post('/calculate', (req, res) => {
  const { expression, angleMode } = req.body ?? {}

  if (typeof expression !== 'string') {
    return res.status(400).json({
      success: false,
      errorCode: 'INVALID_EXPRESSION',
      message: '`expression` must be a string',
      timestamp: new Date().toISOString()
    })
  }

  const mode = angleMode === 'RAD' ? 'RAD' : 'DEG'

  try {
    const { expression: normalizedExpression, result } = evaluateExpression(expression, mode)

    historyStore.add({
      expression: normalizedExpression,
      result: String(result),
      angleMode: mode
    })

    return res.json({
      success: true,
      expression,
      normalizedExpression,
      result,
      errorCode: null,
      message: 'Calculation successful',
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    if (err instanceof EvaluationError) {
      return res.status(422).json({
        success: false,
        expression,
        normalizedExpression: expression,
        result: null,
        errorCode: err.code,
        message: err.message,
        timestamp: new Date().toISOString()
      })
    }

    return res.status(500).json({
      success: false,
      errorCode: 'INTERNAL_ERROR',
      message: 'Unexpected error',
      timestamp: new Date().toISOString()
    })
  }
})

export { router as calculateRouter }
