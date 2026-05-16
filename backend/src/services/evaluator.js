import { Parser } from 'expr-eval'

const SAFE_TOKEN =
  /^[0-9+\-*/^().,%\sA-Za-z_|]+$/

export class EvaluationError extends Error {
  /** @param {string} code @param {string} message */
  constructor(code, message) {
    super(message)
    this.code = code
  }
}

/** @param {string} raw */
const preprocessExpression = (raw) => {
  let s = raw.trim()
  if (s.length === 0) throw new EvaluationError('EMPTY_INPUT', 'Expression is empty')

  s = s
    .replaceAll('×', '*')
    .replaceAll('÷', '/')
    .replaceAll('π', 'PI')
    .replaceAll('pi', 'PI')

  s = s.replace(/\s+/g, ' ')

  // simple percentage: 50% -> (50/100)
  s = s.replace(/(\d+(?:\.\d+)?)\s*%/g, '($1/100)')

  return s
}

/** @param {number} x */
const assertFiniteOrThrow = (x) => {
  if (Number.isNaN(x)) {
    throw new EvaluationError('INVALID_EXPRESSION', 'Result is not a valid number')
  }
  if (x === Infinity || x === -Infinity) {
    throw new EvaluationError('DIVISION_BY_ZERO', 'Cannot divide by zero')
  }
}

/** @param {string} expr @param {'DEG' | 'RAD'} angleMode */
export const evaluateExpression = (expr, angleMode) => {
  const expression = preprocessExpression(expr)

  if (!SAFE_TOKEN.test(expression)) {
    throw new EvaluationError('INVALID_EXPRESSION', 'Expression contains unsupported characters')
  }

  const parser = new Parser({
    operators: {
      add: true,
      concatenate: false,
      conditional: false,
      divide: true,
      factorial: false,
      multiply: true,
      power: true,
      remainder: false,
      subtract: true,
      assignment: false,
      array: false,
      fndef: false,
      logical: false,
      in: false,
      comparison: false
    }
  })

  const toRad = (deg) => (deg * Math.PI) / 180

  const sinFn = (x) => {
    assertFiniteOrThrow(x)
    const a = angleMode === 'DEG' ? toRad(x) : x
    return Math.sin(a)
  }

  const cosFn = (x) => {
    assertFiniteOrThrow(x)
    const a = angleMode === 'DEG' ? toRad(x) : x
    return Math.cos(a)
  }

  const tanFn = (x) => {
    assertFiniteOrThrow(x)
    const a = angleMode === 'DEG' ? toRad(x) : x
    return Math.tan(a)
  }

  const sqrtFn = (x) => {
    assertFiniteOrThrow(x)
    if (x < 0) throw new EvaluationError('NEGATIVE_SQRT', 'Cannot take square root of negative number')
    return Math.sqrt(x)
  }

  const log10Fn = (x) => {
    assertFiniteOrThrow(x)
    if (x <= 0) throw new EvaluationError('INVALID_LOG_INPUT', 'Log domain error')
    return Math.log10(x)
  }

  const lnFn = (x) => {
    assertFiniteOrThrow(x)
    if (x <= 0) throw new EvaluationError('INVALID_LOG_INPUT', 'Natural log domain error')
    return Math.log(x)
  }

  parser.unaryOps.sin = sinFn
  parser.unaryOps.cos = cosFn
  parser.unaryOps.tan = tanFn
  parser.unaryOps.sqrt = sqrtFn
  parser.unaryOps.log = log10Fn
  parser.unaryOps.ln = lnFn
  parser.unaryOps.lg = log10Fn
  parser.unaryOps.log10 = log10Fn

  try {
    const result = parser.evaluate(expression)
    assertFiniteOrThrow(result)

    if (typeof result !== 'number') {
      throw new EvaluationError('INVALID_EXPRESSION', 'Result is not a number')
    }

    return { expression, result }
  } catch (err) {
    if (err instanceof EvaluationError) throw err

    const msg = err instanceof Error ? err.message : String(err)

    if (/divide by zero/i.test(msg)) {
      throw new EvaluationError('DIVISION_BY_ZERO', 'Cannot divide by zero')
    }

    throw new EvaluationError('INVALID_EXPRESSION', 'Unable to evaluate expression')
  }
}
