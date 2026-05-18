const API_BASE = typeof __API_BASE_URL__ !== 'undefined' ? __API_BASE_URL__ : '/api'

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  const data = await response.json().catch(() => ({}))
  return { response, data }
}

export const calculateExpression = async (expression, angleMode) => {
  const { response, data } = await request('/v1/calculate', {
    method: 'POST',
    body: JSON.stringify({ expression, angleMode }),
  })
  return { ok: response.ok, status: response.status, data }
}

export const fetchHistory = async () => {
  const { response, data } = await request('/v1/history')
  return { ok: response.ok, data }
}

export const clearHistory = async () => {
  const { response, data } = await request('/v1/history', { method: 'DELETE' })
  return { ok: response.ok, data }
}
