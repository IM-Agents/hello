'use strict'

const { test } = require('node:test')
const assert = require('node:assert/strict')
const { evaluateExpression } = require('./evaluator')

test('basic arithmetic', () => {
  assert.equal(evaluateExpression('2+3*4'), 14)
  assert.equal(evaluateExpression('10/2'), 5)
})

test('trig in degrees', () => {
  assert.ok(Math.abs(evaluateExpression('sin(30)', 'DEG') - 0.5) < 1e-10)
})

test('division by zero', () => {
  assert.throws(() => evaluateExpression('5/0'), (e) => e.code === 'DIV_BY_ZERO')
})

test('sqrt negative', () => {
  assert.throws(() => evaluateExpression('sqrt(-1)'), (e) => e.code === 'SQRT_NEGATIVE')
})
