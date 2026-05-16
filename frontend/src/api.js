const apiBase = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000'

export const calculate = async (expression, angleMode) => {
  const res = await fetch(`${apiBase}/api/v1/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ expression, angleMode })
  })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data }
}

export const fetchHistory = async () => {
  const res = await fetch(`${apiBase}/api/v1/history`)
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, data }
}

export const clearHistory = async () => {
  const res = await fetch(`${apiBase}/api/v1/history`, { method: 'DELETE' })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, data }
}
