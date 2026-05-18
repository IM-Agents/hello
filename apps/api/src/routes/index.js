'use strict'

const express = require('express')
const { asyncHandler } = require('../middleware/asyncHandler')
const { validate } = require('../middleware/validate')
const { calculateSchema, historyPostSchema } = require('../validators/calculateSchema')
const { postCalculate } = require('../controllers/calculateController')
const { getHistory, postHistory, deleteHistory } = require('../controllers/historyController')

const router = express.Router()

router.post('/calculate', validate(calculateSchema), asyncHandler(postCalculate))
router.get('/history', asyncHandler(getHistory))
router.post('/history', validate(historyPostSchema), asyncHandler(postHistory))
router.delete('/history', asyncHandler(deleteHistory))

module.exports = router
