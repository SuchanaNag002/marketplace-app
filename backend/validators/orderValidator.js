import Joi from 'joi';

const orderValidator = Joi.object({
  productId: Joi.string().required().messages({
    'string.empty': 'Product ID is required',
    'any.required': 'Product ID is required'
  }),
  userId: Joi.string().required().messages({
    'string.empty': 'User ID is required',
    'any.required': 'User ID is required'
  }),
  quantity: Joi.number().required().messages({
    'number.base': 'Quantity must be a number',
    'any.required': 'Quantity is required'
  }),
  orderDate: Joi.date().optional().default(() => new Date()).messages({
    'date.base': 'Order date must be a valid date'
  }),
  arrivalDate: Joi.date().optional().messages({
    'date.base': 'Arrival date must be a valid date'
  })
});

export default orderValidator;
