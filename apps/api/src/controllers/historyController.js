'use strict'

const { historyStore } = require('../services/historyStore')

const getHistory = (_req, res) => {
  res.json({ success: true, history: historyStore.list() })
}

const postHistory = (req, res) => {
  const item = historyStore.add(req.validated)
  res.status(201).json({ success: true, item })
}

const deleteHistory = (_req, res) => {
  historyStore.clear()
  res.json({ success: true, message: 'History cleared' })
}

module.exports = { getHistory, postHistory, deleteHistory }
