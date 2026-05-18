const { evaluateExpression } = require('@repo/calculator-core')
const historyService = require('./history.service')

const calculate = ({ expression, angleMode, persistHistory = true }) => {
  const outcome = evaluateExpression(expression, angleMode)
  const timestamp = new Date().toISOString()

  if (outcome.success && persistHistory) {
    historyService.addEntry({
      expression: outcome.expression,
      result: outcome.result,
      angleMode,
    })
  }

  return {
    ...outcome,
    timestamp,
  }
}

module.exports = { calculate }
