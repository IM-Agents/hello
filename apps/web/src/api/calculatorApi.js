const API_BASE = '/api/v1'

export async function postCalculate(expression, angleMode) {
  const response = await fetch(`${API_BASE}/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression, angleMode })
  })
  const data = await response.json()
  return { ok: response.ok, status: response.status, data }
}

export async function fetchHistory() {
  const response = await fetch(`${API_BASE}/history`)
  const data = await response.json()
  return { ok: response.ok, data }
}

export async function clearHistory() {
  const response = await fetch(`${API_BASE}/history`, { method: 'DELETE' })
  const data = await response.json()
  return { ok: response.ok, data }
}
