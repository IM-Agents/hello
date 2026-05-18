const Joi = require('joi')

const calculateSchema = Joi.object({
  expression: Joi.string().trim().min(1).max(500).required(),
  angleMode: Joi.string().valid('DEG', 'RAD').default('DEG'),
})

const validate = (schema, data) => schema.validate(data, { abortEarly: false })

module.exports = { calculateSchema, validate }
