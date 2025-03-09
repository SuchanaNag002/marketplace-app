import Joi from 'joi';

const orderValidator = Joi.object({
  quantity: Joi.number().required().min(1).messages({
    'number.base': 'Quantity must be a number',
    'any.required': 'Quantity is required',
    'number.min': 'Quantity must be at least 1'
  }),
  orderDate: Joi.date().default(() => new Date()).messages({
    'date.base': 'Order date must be a valid date'
  }),
  status: Joi.string().valid('Pending', 'Delivered').default('Pending').messages({
    'any.only': 'Status must be either Pending or Delivered'
  })
});

export default orderValidator;
