const ROWS = [
  [
    { label: 'MC', action: 'memoryClear', variant: 'fn' },
    { label: 'MR', action: 'memoryRecall', variant: 'fn' },
    { label: 'M+', action: 'memoryAdd', variant: 'fn' },
    { label: 'M−', action: 'memorySubtract', variant: 'fn' },
    { label: 'C', action: 'clear', variant: 'fn' }
  ],
  [
    { label: 'sin', token: 'sin(', variant: 'sci' },
    { label: 'cos', token: 'cos(', variant: 'sci' },
    { label: 'tan', token: 'tan(', variant: 'sci' },
    { label: '√', token: 'sqrt(', variant: 'sci' },
    { label: '^', token: '^', variant: 'op' }
  ],
  [
    { label: 'log', token: 'log(', variant: 'sci' },
    { label: 'ln', token: 'ln(', variant: 'sci' },
    { label: 'π', token: 'pi', variant: 'sci' },
    { label: 'e', token: 'e', variant: 'sci' },
    { label: '%', token: '%', variant: 'op' }
  ],
  [
    { label: '7', token: '7', variant: 'num' },
    { label: '8', token: '8', variant: 'num' },
    { label: '9', token: '9', variant: 'num' },
    { label: '÷', token: '/', variant: 'op' },
    { label: '⌫', action: 'backspace', variant: 'fn' }
  ],
  [
    { label: '4', token: '4', variant: 'num' },
    { label: '5', token: '5', variant: 'num' },
    { label: '6', token: '6', variant: 'num' },
    { label: '×', token: '*', variant: 'op' },
    { label: '±', action: 'toggleSign', variant: 'fn' }
  ],
  [
    { label: '1', token: '1', variant: 'num' },
    { label: '2', token: '2', variant: 'num' },
    { label: '3', token: '3', variant: 'num' },
    { label: '−', token: '-', variant: 'op' },
    { label: '(', token: '(', variant: 'fn' }
  ],
  [
    { label: '0', token: '0', variant: 'num' },
    { label: '.', token: '.', variant: 'num' },
    { label: '=', action: 'evaluate', variant: 'equals' },
    { label: '+', token: '+', variant: 'op' },
    { label: ')', token: ')', variant: 'fn' }
  ]
]

export function Keypad({ onAction, disabled }) {
  const handleClick = (key) => {
    if (key.action) {
      onAction(key.action)
    } else if (key.token) {
      onAction('append', key.token)
    }
  }

  return (
    <div className="keypad" role="group" aria-label="Calculator keypad">
      {ROWS.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="keypad__row">
          {row.map((key) => (
            <button
              key={key.label}
              type="button"
              className={`key key--${key.variant}`}
              onClick={() => handleClick(key)}
              disabled={disabled}
              aria-label={key.label}
            >
              {key.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
