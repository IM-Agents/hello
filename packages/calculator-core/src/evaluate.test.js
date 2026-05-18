const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const { evaluateExpression, DEG, RAD } = require('./evaluate')

describe('evaluateExpression', () => {
  it('adds two numbers', () => {
    const r = evaluateExpression('2+3', DEG)
    assert.equal(r.success, true)
    assert.equal(r.result, 5)
  })

  it('handles division by zero', () => {
    const r = evaluateExpression('10/0', DEG)
    assert.equal(r.success, false)
    assert.equal(r.errorCode, 'DIVISION_BY_ZERO')
  })

  it('evaluates sin in degrees', () => {
    const r = evaluateExpression('sin(30)', DEG)
    assert.equal(r.success, true)
    assert.ok(Math.abs(r.result - 0.5) < 1e-10)
  })

  it('evaluates sin in radians', () => {
    const r = evaluateExpression('sin(1.5708)', RAD)
    assert.ok(r.success)
  })
})
