import { useCallback, useEffect, useState } from 'react'
import { calculateExpression, clearHistory, fetchHistory } from '../services/api'

const MAX_HISTORY = 10

export const useCalculator = () => {
  const [expression, setExpression] = useState('')
  const [displayValue, setDisplayValue] = useState('0')
  const [previewExpression, setPreviewExpression] = useState('')
  const [angleMode, setAngleMode] = useState('DEG')
  const [memoryValue, setMemoryValue] = useState(0)
  const [history, setHistory] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadHistory = useCallback(async () => {
    const { ok, data } = await fetchHistory()
    if (ok && data.items) setHistory(data.items)
  }, [])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const appendToken = useCallback((token) => {
    setErrorMessage(null)
    setExpression((prev) => {
      const base = displayValue === 'Error' ? '' : prev
      if (!base && /^[0-9]$/.test(token)) return token
      return `${base}${token}`
    })
    setDisplayValue((prev) => {
      if (prev === 'Error') return token
      const base = prev === '0' && /^[0-9]$/.test(token) ? '' : prev
      const next = `${base}${token}`
      return next || '0'
    })
  }, [displayValue])

  const handleClear = useCallback(() => {
    setExpression('')
    setDisplayValue('0')
    setPreviewExpression('')
    setErrorMessage(null)
  }, [])

  const handleBackspace = useCallback(() => {
    setErrorMessage(null)
    setExpression((prev) => {
      const next = prev.slice(0, -1)
      if (!next) setDisplayValue('0')
      return next
    })
  }, [])

  const handleToggleSign = useCallback(() => {
    setExpression((prev) => {
      if (!prev) return prev
      if (prev.startsWith('-')) return prev.slice(1)
      return `-${prev}`
    })
  }, [])

  const handleEvaluate = useCallback(async () => {
    if (!expression.trim()) {
      setErrorMessage('Nothing to calculate')
      setDisplayValue('Error')
      return
    }

    setIsLoading(true)
    setErrorMessage(null)
    setPreviewExpression(expression)

    const { data } = await calculateExpression(expression, angleMode)
    setIsLoading(false)

    if (data.success) {
      setDisplayValue(String(data.result))
      setExpression(String(data.result))
      await loadHistory()
    } else {
      setErrorMessage(data.message || 'Calculation failed')
      setDisplayValue('Error')
    }
  }, [expression, angleMode, loadHistory])

  const handleMemory = useCallback((action) => {
    const current = parseFloat(displayValue)
    const num = Number.isFinite(current) ? current : parseFloat(expression) || 0

    switch (action) {
      case 'MC':
        setMemoryValue(0)
        break
      case 'MR':
        setExpression(String(memoryValue))
        setDisplayValue(String(memoryValue))
        setErrorMessage(null)
        break
      case 'M+':
        setMemoryValue((m) => m + num)
        break
      case 'M-':
        setMemoryValue((m) => m - num)
        break
      default:
        break
    }
  }, [displayValue, expression, memoryValue])

  const handleHistorySelect = useCallback((item) => {
    setExpression(item.expression)
    setPreviewExpression(item.expression)
    setDisplayValue(item.result)
    setErrorMessage(null)
  }, [])

  const handleClearHistory = useCallback(async () => {
    await clearHistory()
    setHistory([])
  }, [])

  const toggleAngleMode = useCallback((mode) => {
    setAngleMode(mode)
  }, [])

  return {
    expression,
    displayValue,
    previewExpression,
    angleMode,
    memoryValue,
    history,
    historyCount: history.length,
    maxHistory: MAX_HISTORY,
    errorMessage,
    isLoading,
    appendToken,
    handleClear,
    handleBackspace,
    handleToggleSign,
    handleEvaluate,
    handleMemory,
    handleHistorySelect,
    handleClearHistory,
    toggleAngleMode,
  }
}
