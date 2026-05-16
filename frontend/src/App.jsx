import React from 'react'
import { calculate, clearHistory, fetchHistory } from './api.js'

const CalcButton = ({ label, onPress, variant = 'num', className = '', ariaLabel }) => {
  const base =
    'min-h-12 rounded-xl text-lg font-medium transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950'

  const styles = {
    num: 'bg-slate-800 text-white hover:bg-slate-700',
    op: 'bg-violet-600 text-white hover:bg-violet-500',
    fn: 'bg-slate-700 text-slate-100 hover:bg-slate-600 text-base',
    util: 'bg-slate-900 text-slate-200 hover:bg-slate-800 text-sm'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onPress()
    }
  }

  return (
    <button
      type="button"
      className={`${base} ${styles[variant] ?? styles.num} ${className}`}
      aria-label={ariaLabel ?? label}
      onClick={onPress}
      onKeyDown={handleKeyDown}
    >
      {label}
    </button>
  )
}

export default function App() {
  const [expr, setExpr] = React.useState('')
  const [error, setError] = React.useState('')
  const [angleMode, setAngleMode] = React.useState('DEG')
  const [memory, setMemory] = React.useState(0)
  const [history, setHistory] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const refreshHistory = React.useCallback(async () => {
    const { ok, data } = await fetchHistory()
    if (ok && data?.items) setHistory(data.items)
  }, [])

  React.useEffect(() => {
    let alive = true
    ;(async () => {
      const { ok, data } = await fetchHistory()
      if (!alive) return
      if (ok && data?.items) setHistory(data.items)
    })()
    return () => {
      alive = false
    }
  }, [])

  const append = (tok) => {
    setError('')
    setExpr((e) => `${e}${tok}`)
  }

  const handleEvaluate = React.useCallback(async () => {
    if (!expr.trim()) {
      setError('Nothing to evaluate')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { ok, data } = await calculate(expr, angleMode)

      if (!ok || !data?.success) {
        setError(data?.message ?? 'Calculation failed')
        return
      }

      const next = String(data.result)
      setExpr(next)
      await refreshHistory()
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }, [angleMode, expr, refreshHistory])

  const handleBackspace = () => {
    setError('')
    setExpr((e) => e.slice(0, -1))
  }

  const handleClear = () => {
    setError('')
    setExpr('')
  }

  const handleSignToggle = () => {
    setError('')
    setExpr((e) => {
      if (e.length === 0) return '-'
      if (e.startsWith('-')) return e.slice(1)
      return `-${e}`
    })
  }

  const parseCurrent = () => {
    const n = Number.parseFloat(expr)
    return Number.isFinite(n) ? n : 0
  }

  const handleMemoryAdd = () => {
    setMemory((m) => m + parseCurrent())
  }

  const handleMemorySub = () => {
    setMemory((m) => m - parseCurrent())
  }

  const handleMemoryRecall = () => {
    setError('')
    setExpr(String(memory))
  }

  const handleMemoryClear = () => {
    setMemory(0)
  }

  const handleClearHistory = async () => {
    setLoading(true)
    try {
      await clearHistory()
      await refreshHistory()
    } catch {
      setError('Could not clear history')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault()
        void handleEvaluate()
        return
      }

      if (e.key === 'Backspace') {
        e.preventDefault()
        handleBackspace()
        return
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        handleClear()
        return
      }

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault()
        append(e.key)
        return
      }

      if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault()
        append(e.key)
      }

      if (e.key === '(' || e.key === ')' || e.key === '.' || e.key === '^') {
        e.preventDefault()
        append(e.key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleEvaluate])

  return (
    <div className="min-h-svh bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row lg:gap-10">
        <div className="flex-1">
          <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Calculator
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Responsive layout — pair with Figma page Container for visual QA.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-slate-500">Angle</span>
              <button
                type="button"
                className={`rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  angleMode === 'DEG'
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                aria-pressed={angleMode === 'DEG'}
                aria-label="Degree mode"
                onClick={() => setAngleMode('DEG')}
              >
                DEG
              </button>
              <button
                type="button"
                className={`rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  angleMode === 'RAD'
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                aria-pressed={angleMode === 'RAD'}
                aria-label="Radian mode"
                onClick={() => setAngleMode('RAD')}
              >
                RAD
              </button>
            </div>
          </header>

          <div
            className="mb-4 min-h-[4.5rem] rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-right shadow-inner"
            aria-live="polite"
            aria-label="Expression display"
          >
            <div className="break-all font-mono text-2xl text-white sm:text-3xl">{expr || '0'}</div>
            {error ? (
              <div className="mt-2 text-sm text-rose-400" role="alert">
                {error}
              </div>
            ) : null}
            {loading ? (
              <div className="mt-2 text-xs text-slate-500">Working…</div>
            ) : null}
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <CalcButton label="C" variant="util" aria-label="Clear all" onPress={handleClear} />
            <CalcButton label="⌫" variant="util" aria-label="Backspace" onPress={handleBackspace} />
            <CalcButton label="±" variant="util" onPress={handleSignToggle} />
            <CalcButton label="/" variant="op" onPress={() => append('/')} />

            <CalcButton label="MC" variant="fn" onPress={handleMemoryClear} />
            <CalcButton label="MR" variant="fn" onPress={handleMemoryRecall} />
            <CalcButton label="M+" variant="fn" onPress={handleMemoryAdd} />
            <CalcButton label="M−" variant="fn" onPress={handleMemorySub} />

            <CalcButton label="sin" variant="fn" onPress={() => append('sin(')} />
            <CalcButton label="cos" variant="fn" onPress={() => append('cos(')} />
            <CalcButton label="tan" variant="fn" onPress={() => append('tan(')} />
            <CalcButton label="*" variant="op" onPress={() => append('*')} />

            <CalcButton label="log" variant="fn" onPress={() => append('log(')} />
            <CalcButton label="ln" variant="fn" onPress={() => append('ln(')} />
            <CalcButton label="√" variant="fn" aria-label="Square root" onPress={() => append('sqrt(')} />
            <CalcButton label="-" variant="op" onPress={() => append('-')} />

            <CalcButton label="π" variant="fn" onPress={() => append('PI')} />
            <CalcButton label="e" variant="fn" onPress={() => append('E')} />
            <CalcButton label="^" variant="fn" onPress={() => append('^')} />
            <CalcButton label="+" variant="op" onPress={() => append('+')} />

            <CalcButton label="%" variant="fn" onPress={() => append('%')} />
            <CalcButton label="(" variant="fn" onPress={() => append('(')} />
            <CalcButton label=")" variant="fn" onPress={() => append(')')} />
            <CalcButton label="7" variant="num" onPress={() => append('7')} />
            <CalcButton label="8" variant="num" onPress={() => append('8')} />
            <CalcButton label="9" variant="num" onPress={() => append('9')} />
            <CalcButton label="×" variant="op" aria-label="Multiply" onPress={() => append('*')} />
            <CalcButton label="4" variant="num" onPress={() => append('4')} />
            <CalcButton label="5" variant="num" onPress={() => append('5')} />
            <CalcButton label="6" variant="num" onPress={() => append('6')} />
            <CalcButton label="1" variant="num" onPress={() => append('1')} />
            <CalcButton label="2" variant="num" onPress={() => append('2')} />
            <CalcButton label="3" variant="num" onPress={() => append('3')} />
            <CalcButton label="0" variant="num" className="col-span-2" onPress={() => append('0')} />
            <CalcButton label="." variant="num" onPress={() => append('.')} />
            <CalcButton
              label="="
              variant="op"
              aria-label="Evaluate"
              onPress={() => void handleEvaluate()}
            />
          </div>
        </div>

        <aside
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 p-4 lg:max-w-sm"
          aria-label="Calculation history"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              History
            </h2>
            <button
              type="button"
              className="rounded px-2 py-1 text-xs text-violet-400 hover:text-violet-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              onClick={() => void handleClearHistory()}
            >
              Clear
            </button>
          </div>
          <ol className="max-h-[28rem] space-y-2 overflow-y-auto pr-1 text-left">
            {history.length === 0 ? (
              <li className="text-sm text-slate-500">No calculations yet.</li>
            ) : (
              history.map((item, i) => (
                <li
                  key={`${item.expression}-${i}`}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
                >
                  <div className="font-mono text-slate-300">{item.expression}</div>
                  <div className="font-mono text-lg text-white">= {item.result}</div>
                  <div className="text-xs text-slate-500">{item.angleMode}</div>
                </li>
              ))
            )}
          </ol>
        </aside>
      </div>
    </div>
  )
}
