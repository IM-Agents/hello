const MAX_HISTORY = 10

let history = []

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

const addEntry = ({ expression, result, angleMode }) => {
  const entry = {
    id: createId(),
    expression,
    result: String(result),
    angleMode,
    createdAt: new Date().toISOString(),
  }
  history = [entry, ...history].slice(0, MAX_HISTORY)
  return entry
}

const getHistory = () => [...history]

const clearHistory = () => {
  history = []
}

module.exports = {
  MAX_HISTORY,
  addEntry,
  getHistory,
  clearHistory,
}
