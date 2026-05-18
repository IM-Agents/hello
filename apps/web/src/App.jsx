import { useEffect } from 'react'
import { Display } from './components/Display'
import { HistoryPanel } from './components/HistoryPanel'
import { Keypad } from './components/Keypad'
import { useCalculator } from './hooks/useCalculator'

const KEY_MAP = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  '+': '+', '-': '-', '*': '*', '/': '/',
  'Enter': 'equals', 'Backspace': 'backspace',
  '.': '.', '(': '(', ')': ')',
}

export const App = () => {
  const calc = useCalculator()
  const isError = calc.displayValue === 'Error'

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return

      const action = KEY_MAP[event.key]
      if (!action) return

      event.preventDefault()

      if (action === 'equals') {
        calc.handleEvaluate()
        return
      }
      if (action === 'backspace') {
        calc.handleBackspace()
        return
      }
      calc.appendToken(action)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [calc])

  return (
    <main className="calculator-app">
      <div className="calculator-layout">
        <section className="calculator-unit" aria-label="Scientific calculator">
          <div className="mode-toggles" role="group" aria-label="Angle mode">
            <button
              type="button"
              className={`mode-btn${calc.angleMode === 'DEG' ? ' active' : ''}`}
              onClick={() => calc.toggleAngleMode('DEG')}
              aria-pressed={calc.angleMode === 'DEG'}
            >
              DEG
            </button>
            <button
              type="button"
              className={`mode-btn${calc.angleMode === 'RAD' ? ' active' : ''}`}
              onClick={() => calc.toggleAngleMode('RAD')}
              aria-pressed={calc.angleMode === 'RAD'}
            >
              RAD
            </button>
          </div>

          <Display
            previewExpression={calc.previewExpression || calc.expression}
            displayValue={calc.displayValue}
            errorMessage={calc.errorMessage}
            isError={isError}
          />

          <Keypad
            onToken={calc.appendToken}
            onMemory={calc.handleMemory}
            onClear={calc.handleClear}
            onSign={calc.handleToggleSign}
            onEquals={calc.handleEvaluate}
          />
        </section>

        <HistoryPanel
          history={calc.history}
          historyCount={calc.historyCount}
          maxHistory={calc.maxHistory}
          onSelect={calc.handleHistorySelect}
          onClear={calc.handleClearHistory}
        />
      </div>
    </main>
  )
}
