const MAX_HISTORY = 10

/** @type {{ expression: string, result: string, angleMode: string }[]} */
let items = []

export const historyStore = {
  list: () => [...items],

  /** @param {{ expression: string, result: string, angleMode: string }} entry */
  add: (entry) => {
    items = [{ ...entry }, ...items].slice(0, MAX_HISTORY)
  },

  clear: () => {
    items = []
  }
}
