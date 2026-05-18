import { useMemo } from 'react'
import { DisplayPanel } from './components/DisplayPanel'
import { Keypad } from './components/Keypad'
import { HistoryPanel } from './components/HistoryPanel'
import { useCalculator } from './hooks/useCalculator'
import { useKeyboard } from './hooks/useKeyboard'

export function App() {
  const calc = useCalculator()

  const keyboardHandlers = useMemo(
    () => ({
      appendToken: calc.appendToken,
      backspace: calc.backspace,
      clearAll: calc.clearAll,
      evaluate: calc.evaluate
    }),
    [calc.appendToken, calc.backspace, calc.clearAll, calc.evaluate]
  )

  useKeyboard(keyboardHandlers)

  const handleKeypadAction = (action, token) => {
    switch (action) {
      case 'append':
        calc.appendToken(token)
        break
      case 'clear':
        calc.clearAll()
        break
      case 'backspace':
        calc.backspace()
        break
      case 'evaluate':
        calc.evaluate()
        break
      case 'toggleSign':
        calc.toggleSign()
        break
      case 'memoryAdd':
        calc.memoryAdd()
        break
      case 'memorySubtract':
        calc.memorySubtract()
        break
      case 'memoryRecall':
        calc.memoryRecall()
        break
      case 'memoryClear':
        calc.memoryClear()
        break
      default:
        break
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Calculator</h1>
        <p className="app-header__subtitle">Scientific · Responsive</p>
      </header>
      <main className="calculator-layout">
        <section className="calculator-unit" aria-label="Calculator">
          <DisplayPanel
            displayValue={calc.displayValue}
            angleMode={calc.angleMode}
            errorMessage={calc.errorMessage}
            memoryValue={calc.memoryValue}
            onToggleAngle={calc.toggleAngleMode}
          />
          <Keypad onAction={handleKeypadAction} disabled={calc.loading} />
        </section>
        <HistoryPanel history={calc.history} onClear={calc.handleClearHistory} />
      </main>
    </div>
  )
}
