export function DisplayPanel({ displayValue, angleMode, errorMessage, memoryValue, onToggleAngle }) {
  return (
    <section className="display-panel" aria-label="Calculator display">
      <div className="display-panel__modes">
        <button
          type="button"
          className={`mode-btn ${angleMode === 'DEG' ? 'mode-btn--active' : ''}`}
          onClick={onToggleAngle}
          aria-pressed={angleMode === 'DEG'}
          aria-label="Degree mode"
        >
          DEG
        </button>
        <button
          type="button"
          className={`mode-btn ${angleMode === 'RAD' ? 'mode-btn--active' : ''}`}
          onClick={onToggleAngle}
          aria-pressed={angleMode === 'RAD'}
          aria-label="Radian mode"
        >
          RAD
        </button>
        {memoryValue !== 0 && (
          <span className="memory-badge" aria-label="Memory stored">
            M
          </span>
        )}
      </div>
      <div
        className={`display-panel__value ${errorMessage ? 'display-panel__value--error' : ''}`}
        role="status"
        aria-live="polite"
      >
        {errorMessage || displayValue}
      </div>
    </section>
  )
}
