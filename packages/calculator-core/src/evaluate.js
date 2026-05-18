const DEG = 'DEG'
const RAD = 'RAD'

const ERROR_CODES = {
  DIVISION_BY_ZERO: 'DIVISION_BY_ZERO',
  INVALID_EXPRESSION: 'INVALID_EXPRESSION',
  NEGATIVE_SQRT: 'NEGATIVE_SQRT',
  INVALID_LOG: 'INVALID_LOG',
  EMPTY_EXPRESSION: 'EMPTY_EXPRESSION',
  OVERFLOW: 'OVERFLOW',
}

const normalizeExpression = (raw) => {
  if (!raw || typeof raw !== 'string') return ''
  return raw
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/\bmod\b/g, '%')
    .replace(/π/g, 'PI')
    .replace(/√\(/g, 'sqrt(')
    .replace(/√/g, 'sqrt')
    .trim()
}

const friendlyMessage = (code) => {
  const map = {
    [ERROR_CODES.DIVISION_BY_ZERO]: 'Cannot divide by zero',
    [ERROR_CODES.INVALID_EXPRESSION]: 'Invalid expression',
    [ERROR_CODES.NEGATIVE_SQRT]: 'Square root of a negative number',
    [ERROR_CODES.INVALID_LOG]: 'Invalid input for logarithm',
    [ERROR_CODES.EMPTY_EXPRESSION]: 'Nothing to calculate',
    [ERROR_CODES.OVERFLOW]: 'Result is too large',
  }
  return map[code] || 'Calculation failed'
}

const createParser = (src, angleMode) => {
  let pos = 0
  const mode = angleMode === RAD ? RAD : DEG
  const toRad = (x) => (mode === DEG ? (x * Math.PI) / 180 : x)

  const peek = () => src[pos] || ''
  const next = () => {
    const c = src[pos]
    pos += 1
    return c
  }
  const eof = () => pos >= src.length

  const skipSpace = () => {
    while (!eof() && /\s/.test(peek())) next()
  }

  const fail = (code = ERROR_CODES.INVALID_EXPRESSION) => {
    throw new Error(code)
  }

  const parseNumber = () => {
    skipSpace()
    let num = ''
    let dots = 0
    while (!eof() && /[0-9.]/.test(peek())) {
      if (peek() === '.') {
        dots += 1
        if (dots > 1) fail()
      }
      num += next()
    }
    if (!num || num === '.') fail()
    return parseFloat(num)
  }

  const parseIdentifier = () => {
    skipSpace()
    let name = ''
    while (!eof() && /[a-zA-Z_]/.test(peek())) name += next()
    if (!name) fail()
    const upper = name.toUpperCase()
    if (upper === 'PI') return Math.PI
    if (upper === 'E') return Math.E

    skipSpace()
    if (peek() !== '(') fail()
    next()
    const args = []
    skipSpace()
    if (peek() !== ')') {
      args.push(parseExpression())
      while (peek() === ',') {
        next()
        args.push(parseExpression())
      }
    }
    skipSpace()
    if (peek() !== ')') fail()
    next()

    switch (upper) {
      case 'SIN':
        return Math.sin(toRad(args[0]))
      case 'COS':
        return Math.cos(toRad(args[0]))
      case 'TAN': {
        const v = Math.tan(toRad(args[0]))
        if (!Number.isFinite(v)) fail()
        return v
      }
      case 'LOG':
        if (args[0] <= 0) fail(ERROR_CODES.INVALID_LOG)
        return Math.log10(args[0])
      case 'LN':
        if (args[0] <= 0) fail(ERROR_CODES.INVALID_LOG)
        return Math.log(args[0])
      case 'SQRT':
        if (args[0] < 0) fail(ERROR_CODES.NEGATIVE_SQRT)
        return Math.sqrt(args[0])
      default:
        fail()
    }
  }

  const parsePrimary = () => {
    skipSpace()
    if (peek() === '(') {
      next()
      const val = parseExpression()
      skipSpace()
      if (peek() !== ')') fail()
      next()
      return val
    }
    if (/[0-9.]/.test(peek())) return parseNumber()
    if (/[a-zA-Z_]/.test(peek())) return parseIdentifier()
    if (peek() === '+' || peek() === '-') {
      const op = next()
      const val = parsePrimary()
      return op === '-' ? -val : val
    }
    fail()
  }

  const parsePower = () => {
    let left = parsePrimary()
    skipSpace()
    while (peek() === '^') {
      next()
      const right = parsePrimary()
      left = left ** right
    }
    return left
  }

  const parseTerm = () => {
    let left = parsePower()
    skipSpace()
    while (peek() === '*' || peek() === '/' || peek() === '%') {
      const op = next()
      const right = parsePower()
      if (op === '/') {
        if (right === 0) fail(ERROR_CODES.DIVISION_BY_ZERO)
        left /= right
      } else if (op === '%') {
        if (right === 0) fail(ERROR_CODES.DIVISION_BY_ZERO)
        left %= right
      } else {
        left *= right
      }
      skipSpace()
    }
    return left
  }

  const parseExpression = () => {
    let left = parseTerm()
    skipSpace()
    while (peek() === '+' || peek() === '-') {
      const op = next()
      const right = parseTerm()
      left = op === '+' ? left + right : left - right
      skipSpace()
    }
    return left
  }

  return {
    parse: () => {
      const result = parseExpression()
      skipSpace()
      if (!eof()) fail()
      if (!Number.isFinite(result)) fail(ERROR_CODES.OVERFLOW)
      return Math.round(result * 1e12) / 1e12
    },
  }
}

const evaluateExpression = (expression, angleMode = DEG) => {
  const normalized = normalizeExpression(expression)
  if (!normalized) {
    return {
      success: false,
      expression,
      normalizedExpression: normalized,
      result: null,
      errorCode: ERROR_CODES.EMPTY_EXPRESSION,
      message: friendlyMessage(ERROR_CODES.EMPTY_EXPRESSION),
    }
  }

  try {
    const result = createParser(normalized, angleMode).parse()
    return {
      success: true,
      expression,
      normalizedExpression: normalized,
      result,
      errorCode: null,
      message: 'Calculation successful',
    }
  } catch (err) {
    const code = Object.values(ERROR_CODES).includes(err.message)
      ? err.message
      : ERROR_CODES.INVALID_EXPRESSION
    return {
      success: false,
      expression,
      normalizedExpression: normalized,
      result: null,
      errorCode: code,
      message: friendlyMessage(code),
    }
  }
}

module.exports = {
  DEG,
  RAD,
  ERROR_CODES,
  normalizeExpression,
  evaluateExpression,
  friendlyMessage,
}
