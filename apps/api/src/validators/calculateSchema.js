'use strict'

const Joi = require('joi')

const calculateSchema = Joi.object({
  expression: Joi.string().trim().min(1).max(500).required(),
  angleMode: Joi.string().valid('DEG', 'RAD').default('DEG')
})

const historyPostSchema = Joi.object({
  expression: Joi.string().trim().min(1).max(500).required(),
  result: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
  angleMode: Joi.string().valid('DEG', 'RAD').default('DEG')
})

module.exports = { calculateSchema, historyPostSchema }
