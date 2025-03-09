import Joi from 'joi';

const orderValidator = Joi.object({
  productId: Joi.string().required().messages({
    'string.empty': 'Product ID is required',
    'any.required': 'Product ID is required'
  }),
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

const updateOrderValidator = Joi.object({
  quantity: Joi.number().min(1).optional().messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity must be at least 1'
  }),
  status: Joi.string().valid('Pending', 'Delivered').optional().messages({
    'any.only': 'Status must be either Pending or Delivered'
  })
});

export { orderValidator, updateOrderValidator };
