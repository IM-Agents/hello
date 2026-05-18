export const Display = ({
  previewExpression,
  displayValue,
  errorMessage,
  isError,
}) => (
  <div className="display-panel" aria-live="polite">
    <div className="display-expression">{previewExpression || '\u00a0'}</div>
    <div className={`display-value${isError ? ' error' : ''}`}>{displayValue}</div>
    {errorMessage ? (
      <div className="display-error" role="alert">
        {errorMessage}
      </div>
    ) : null}
  </div>
)
