import { useEffect } from 'react'

const KEY_MAP = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '.': '.',
  '+': '+',
  '-': '-',
  '*': '*',
  '/': '/',
  '(': '(',
  ')': ')',
  '%': '%',
  '^': '^'
}

export function useKeyboard(handlers) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.target.matches('input, textarea')) return

      if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault()
        handlers.evaluate()
        return
      }

      if (event.key === 'Backspace') {
        event.preventDefault()
        handlers.backspace()
        return
      }

      if (event.key === 'Escape') {
        handlers.clearAll()
        return
      }

      const token = KEY_MAP[event.key]
      if (token) {
        event.preventDefault()
        handlers.appendToken(token)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlers])
}
