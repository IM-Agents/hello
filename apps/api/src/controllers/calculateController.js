'use strict'

const { evaluateExpression } = require('@repo/calculator-core')
const { historyStore } = require('../services/historyStore')

const calculate = (expression, angleMode) => {
  const result = evaluateExpression(expression, angleMode)
  return {
    success: true,
    expression,
    normalizedExpression: expression.replace(/\s+/g, ''),
    result,
    errorCode: null,
    message: 'Calculation successful',
    timestamp: new Date().toISOString()
  }
}

const postCalculate = (req, res) => {
  const { expression, angleMode } = req.validated
  try {
    const payload = calculate(expression, angleMode)
    historyStore.add({
      expression: payload.expression,
      result: payload.result,
      angleMode
    })
    res.json(payload)
  } catch (error) {
    const code = error.code || 'INVALID_EXPR'
    const status = code === 'EMPTY' ? 400 : 422
    res.status(status).json({
      success: false,
      expression,
      normalizedExpression: expression.replace(/\s+/g, ''),
      result: null,
      errorCode: code,
      message: error.message,
      timestamp: new Date().toISOString()
    })
  }
}

module.exports = { postCalculate, calculate }
