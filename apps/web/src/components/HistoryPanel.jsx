export function HistoryPanel({ history, onClear }) {
  return (
    <aside className="history-panel" aria-label="Calculation history">
      <header className="history-panel__header">
        <h2>History</h2>
        <button
          type="button"
          className="history-panel__clear"
          onClick={onClear}
          aria-label="Clear history"
        >
          Clear
        </button>
      </header>
      <ul className="history-panel__list">
        {history.length === 0 ? (
          <li className="history-panel__empty">No calculations yet</li>
        ) : (
          history.map((item) => (
            <li key={item.id} className="history-item">
              <span className="history-item__expr">{item.expression}</span>
              <span className="history-item__result">= {item.result}</span>
              <span className="history-item__meta">{item.angleMode}</span>
            </li>
          ))
        )}
      </ul>
    </aside>
  )
}
