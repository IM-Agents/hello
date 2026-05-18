const KEYS = [
  { label: 'MC', type: 'fn', action: 'MC' },
  { label: 'MR', type: 'fn', action: 'MR' },
  { label: 'M+', type: 'fn', action: 'M+' },
  { label: 'M-', type: 'fn', action: 'M-' },
  { label: '⌫', type: 'clear', action: 'clear' },
  { label: 'sin', type: 'fn', token: 'sin(' },
  { label: '7', type: 'num', token: '7' },
  { label: '8', type: 'num', token: '8' },
  { label: '9', type: 'num', token: '9' },
  { label: '÷', type: 'op', token: '/' },
  { label: 'cos', type: 'fn', token: 'cos(' },
  { label: '4', type: 'num', token: '4' },
  { label: '5', type: 'num', token: '5' },
  { label: '6', type: 'num', token: '6' },
  { label: '×', type: 'op', token: '*' },
  { label: 'tan', type: 'fn', token: 'tan(' },
  { label: '1', type: 'num', token: '1' },
  { label: '2', type: 'num', token: '2' },
  { label: '3', type: 'num', token: '3' },
  { label: '−', type: 'op', token: '-' },
  { label: 'log', type: 'fn', token: 'log(' },
  { label: '0', type: 'num', token: '0' },
  { label: '.', type: 'num', token: '.' },
  { label: '±', type: 'fn', action: 'sign' },
  { label: '+', type: 'op', token: '+' },
  { label: 'ln', type: 'fn', token: 'ln(' },
  { label: 'π', type: 'fn', token: 'π' },
  { label: 'e', type: 'fn', token: 'e' },
  { label: '√', type: 'fn', token: 'sqrt(' },
  { label: '=', type: 'equals', action: 'equals' },
  { label: 'x', type: 'fn', token: '^', suffix: 'y', superscript: true },
  { label: '%', type: 'fn', token: '%' },
  { label: '(', type: 'fn', token: '(' },
  { label: ')', type: 'fn', token: ')' },
  { label: 'mod', type: 'fn', token: 'mod' },
]

export const Keypad = ({
  onToken,
  onMemory,
  onClear,
  onSign,
  onEquals,
}) => {
  const handleClick = (key) => {
    if (key.action === 'clear') {
      onClear()
      return
    }
    if (key.action === 'equals') {
      onEquals()
      return
    }
    if (key.action === 'sign') {
      onSign()
      return
    }
    if (['MC', 'MR', 'M+', 'M-'].includes(key.action)) {
      onMemory(key.action)
      return
    }
    if (key.token) onToken(key.token)
  }

  return (
    <div className="keypad" role="group" aria-label="Calculator keypad">
      {KEYS.map((key) => (
        <button
          key={key.label + (key.token || key.action)}
          type="button"
          className={`key-btn ${key.type}`}
          onClick={() => handleClick(key)}
          aria-label={key.label}
        >
          {key.superscript ? (
            <>
              x<sup>y</sup>
            </>
          ) : (
            key.label
          )}
        </button>
      ))}
    </div>
  )
}
