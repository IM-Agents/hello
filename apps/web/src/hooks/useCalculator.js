import { useCallback, useEffect, useState } from 'react'
import { postCalculate, fetchHistory, clearHistory } from '../api/calculatorApi'

const MAX_DISPLAY = 24

export function useCalculator() {
  const [expression, setExpression] = useState('')
  const [displayValue, setDisplayValue] = useState('0')
  const [angleMode, setAngleMode] = useState('DEG')
  const [memoryValue, setMemoryValue] = useState(0)
  const [history, setHistory] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadHistory = useCallback(async () => {
    try {
      const { ok, data } = await fetchHistory()
      if (ok && data.history) setHistory(data.history)
    } catch {
      /* offline — keep local history */
    }
  }, [])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const appendToken = useCallback((token) => {
    setErrorMessage(null)
    setExpression((prev) => {
      const next = prev + token
      setDisplayValue(next.slice(-MAX_DISPLAY) || '0')
      return next
    })
  }, [])

  const clearAll = useCallback(() => {
    setExpression('')
    setDisplayValue('0')
    setErrorMessage(null)
  }, [])

  const backspace = useCallback(() => {
    setErrorMessage(null)
    setExpression((prev) => {
      const next = prev.slice(0, -1)
      setDisplayValue(next || '0')
      return next
    })
  }, [])

  const toggleAngleMode = useCallback(() => {
    setAngleMode((m) => (m === 'DEG' ? 'RAD' : 'DEG'))
  }, [])

  const toggleSign = useCallback(() => {
    setExpression((prev) => {
      if (!prev) return prev
      const match = prev.match(/(-?\d+\.?\d*)$/)
      if (!match) return prev
      const num = match[1]
      const toggled = num.startsWith('-') ? num.slice(1) : `-${num}`
      const next = prev.slice(0, -num.length) + toggled
      setDisplayValue(next.slice(-MAX_DISPLAY) || '0')
      return next
    })
  }, [])

  const memoryAdd = useCallback(() => {
    const val = parseFloat(displayValue)
    if (!Number.isNaN(val)) setMemoryValue((m) => m + val)
  }, [displayValue])

  const memorySubtract = useCallback(() => {
    const val = parseFloat(displayValue)
    if (!Number.isNaN(val)) setMemoryValue((m) => m - val)
  }, [displayValue])

  const memoryRecall = useCallback(() => {
    const token = String(memoryValue)
    setExpression((prev) => prev + token)
    setDisplayValue(token.slice(-MAX_DISPLAY))
  }, [memoryValue])

  const memoryClear = useCallback(() => {
    setMemoryValue(0)
  }, [])

  const evaluate = useCallback(async () => {
    if (!expression.trim()) {
      setErrorMessage('Nothing to evaluate')
      return
    }
    setLoading(true)
    setErrorMessage(null)
    try {
      const { ok, data } = await postCalculate(expression, angleMode)
      if (ok && data.success) {
        const resultStr = String(data.result)
        setDisplayValue(resultStr.slice(-MAX_DISPLAY))
        setExpression(resultStr)
        await loadHistory()
      } else {
        setErrorMessage(data.message || 'Calculation failed')
      }
    } catch {
      setErrorMessage('Unable to reach calculator service')
    } finally {
      setLoading(false)
    }
  }, [expression, angleMode, loadHistory])

  const handleClearHistory = useCallback(async () => {
    try {
      await clearHistory()
      setHistory([])
    } catch {
      setHistory([])
    }
  }, [])

  return {
    expression,
    displayValue,
    angleMode,
    memoryValue,
    history,
    errorMessage,
    loading,
    appendToken,
    clearAll,
    backspace,
    toggleAngleMode,
    toggleSign,
    memoryAdd,
    memorySubtract,
    memoryRecall,
    memoryClear,
    evaluate,
    handleClearHistory
  }
}
