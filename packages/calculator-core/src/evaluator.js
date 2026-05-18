'use strict'

const FUNCTIONS = new Set(['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'])
const CONSTANTS = { pi: Math.PI, e: Math.E }

function tokenize(input) {
  const src = String(input).replace(/\s+/g, '')
  const tokens = []
  let i = 0

  while (i < src.length) {
    const ch = src[i]

    if (/[0-9.]/.test(ch)) {
      let num = ch
      i += 1
      while (i < src.length && /[0-9.]/.test(src[i])) {
        num += src[i]
        i += 1
      }
      if ((num.match(/\./g) || []).length > 1) {
        throw makeError('INVALID_EXPR', 'Invalid number format')
      }
      tokens.push({ type: 'number', value: parseFloat(num) })
      continue
    }

    if (/[a-z]/i.test(ch)) {
      let name = ch
      i += 1
      while (i < src.length && /[a-z]/i.test(src[i])) {
        name += src[i]
        i += 1
      }
      const lower = name.toLowerCase()
      if (CONSTANTS[lower] !== undefined) {
        tokens.push({ type: 'number', value: CONSTANTS[lower] })
      } else if (FUNCTIONS.has(lower)) {
        tokens.push({ type: 'function', value: lower })
      } else {
        throw makeError('INVALID_EXPR', `Unknown identifier: ${name}`)
      }
      continue
    }

    if ('+-*/^%(),'.includes(ch)) {
      if (ch === '%') {
        tokens.push({ type: 'operator', value: '%' })
      } else {
        tokens.push({ type: ch === '(' || ch === ')' ? 'paren' : 'operator', value: ch })
      }
      i += 1
      continue
    }

    throw makeError('INVALID_EXPR', `Unexpected character: ${ch}`)
  }

  return tokens
}

function makeError(code, message) {
  const err = new Error(message)
  err.code = code
  return err
}

function toRadian(angle, angleMode) {
  return angleMode === 'DEG' ? (angle * Math.PI) / 180 : angle
}

function applyFunction(name, value, angleMode) {
  if (name === 'sqrt') {
    if (value < 0) throw makeError('SQRT_NEGATIVE', 'Cannot take square root of negative number')
    return Math.sqrt(value)
  }
  if (name === 'log') {
    if (value <= 0) throw makeError('INVALID_EXPR', 'Invalid input for log')
    return Math.log10(value)
  }
  if (name === 'ln') {
    if (value <= 0) throw makeError('INVALID_EXPR', 'Invalid input for ln')
    return Math.log(value)
  }
  const rad = toRadian(value, angleMode)
  if (name === 'sin') return Math.sin(rad)
  if (name === 'cos') return Math.cos(rad)
  if (name === 'tan') return Math.tan(rad)
  throw makeError('INVALID_EXPR', `Unknown function: ${name}`)
}

const PRECEDENCE = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2,
  '^': 3
}

function isOperator(token) {
  return token?.type === 'operator'
}

function evaluateExpression(expression, angleMode = 'DEG') {
  if (!expression || !String(expression).trim()) {
    throw makeError('EMPTY', 'Nothing to evaluate')
  }

  const tokens = tokenize(expression)
  const output = []
  const ops = []

  const pushOp = (op) => {
    while (
      ops.length > 0 &&
      isOperator(ops[ops.length - 1]) &&
      PRECEDENCE[ops[ops.length - 1].value] >= PRECEDENCE[op]
    ) {
      output.push(ops.pop())
    }
    ops.push({ type: 'operator', value: op })
  }

  let prevType = null
  for (let t = 0; t < tokens.length; t += 1) {
    const token = tokens[t]

    if (token.type === 'number') {
      output.push(token)
      prevType = 'number'
      continue
    }

    if (token.type === 'function') {
      ops.push(token)
      prevType = 'function'
      continue
    }

    if (token.type === 'paren' && token.value === '(') {
      ops.push(token)
      prevType = 'paren'
      continue
    }

    if (token.type === 'paren' && token.value === ')') {
      while (ops.length && !(ops[ops.length - 1].type === 'paren' && ops[ops.length - 1].value === '(')) {
        output.push(ops.pop())
      }
      if (!ops.length) throw makeError('INVALID_EXPR', 'Mismatched parentheses')
      ops.pop()
      if (ops.length && ops[ops.length - 1].type === 'function') {
        output.push(ops.pop())
      }
      prevType = 'paren'
      continue
    }

    if (token.type === 'operator') {
      if (
        token.value === '-' &&
        (prevType === null || prevType === 'operator' || (prevType === 'paren' && tokens[t - 1]?.value === '('))
      ) {
        output.push({ type: 'number', value: 0 })
      }
      if (token.value === '^') {
        while (
          ops.length > 0 &&
          isOperator(ops[ops.length - 1]) &&
          PRECEDENCE[ops[ops.length - 1].value] > PRECEDENCE[token.value]
        ) {
          output.push(ops.pop())
        }
        ops.push(token)
      } else {
        pushOp(token.value)
      }
      prevType = 'operator'
    }
  }

  while (ops.length) {
    const op = ops.pop()
    if (op.type === 'paren') throw makeError('INVALID_EXPR', 'Mismatched parentheses')
    output.push(op)
  }

  const stack = []
  for (const token of output) {
    if (token.type === 'number') {
      stack.push(token.value)
      continue
    }
    if (token.type === 'function') {
      if (stack.length < 1) throw makeError('INVALID_EXPR', 'Invalid expression')
      const arg = stack.pop()
      stack.push(applyFunction(token.value, arg, angleMode))
      continue
    }
    if (token.type === 'operator') {
      if (stack.length < 2) throw makeError('INVALID_EXPR', 'Invalid expression')
      const b = stack.pop()
      const a = stack.pop()
      let result
      switch (token.value) {
        case '+':
          result = a + b
          break
        case '-':
          result = a - b
          break
        case '*':
          result = a * b
          break
        case '/':
          if (b === 0) throw makeError('DIV_BY_ZERO', 'Cannot divide by zero')
          result = a / b
          break
        case '%':
          result = a % b
          break
        case '^':
          result = Math.pow(a, b)
          break
        default:
          throw makeError('INVALID_EXPR', `Unknown operator: ${token.value}`)
      }
      if (!Number.isFinite(result)) {
        throw makeError('INVALID_EXPR', 'Result is not a finite number')
      }
      stack.push(result)
    }
  }

  if (stack.length !== 1) throw makeError('INVALID_EXPR', 'Invalid expression')
  return stack[0]
}

module.exports = { evaluateExpression, tokenize }
