'use strict'

const MAX_HISTORY = 10
const history = []

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

const historyStore = {
  list() {
    return [...history]
  },

  add(entry) {
    history.unshift({
      id: createId(),
      expression: entry.expression,
      result: String(entry.result),
      angleMode: entry.angleMode,
      createdAt: new Date().toISOString()
    })
    if (history.length > MAX_HISTORY) {
      history.length = MAX_HISTORY
    }
    return history[0]
  },

  clear() {
    history.length = 0
    return { cleared: true }
  }
}

module.exports = { historyStore, MAX_HISTORY }
