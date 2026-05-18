export const HistoryPanel = ({
  history,
  historyCount,
  maxHistory,
  onSelect,
  onClear,
}) => (
  <aside className="history-panel" aria-label="Calculation history">
    <div className="history-header">
      <h2 className="history-title">
        History <span className="history-count">({historyCount}/{maxHistory})</span>
      </h2>
      {historyCount > 0 ? (
        <button
          type="button"
          className="history-clear"
          onClick={onClear}
          aria-label="Clear history"
        >
          Clear
        </button>
      ) : null}
    </div>

    <div className="history-list">
      {history.length === 0 ? (
        <div className="history-empty">
          <div className="history-empty-icon" aria-hidden="true">
            ↺
          </div>
          <p className="history-empty-title">No calculations yet</p>
          <p className="history-empty-sub">
            Your recent operations will appear here for quick access.
          </p>
        </div>
      ) : (
        history.map((item) => (
          <button
            key={item.id}
            type="button"
            className="history-item"
            onClick={() => onSelect(item)}
            aria-label={`Load ${item.expression}`}
          >
            <div className="history-item-expr">{item.expression}</div>
            <div className="history-item-result">= {item.result}</div>
          </button>
        ))
      )}
    </div>

    <div className="history-tip">
      <p className="history-tip-label">Tip</p>
      <p className="history-tip-text">
        Click on a history entry to load the formula back into the main display.
      </p>
    </div>
  </aside>
)
