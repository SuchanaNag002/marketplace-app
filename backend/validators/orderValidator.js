import Joi from 'joi';

const orderValidator = Joi.object({
  productId: Joi.string().required().messages({
    'string.empty': 'Product ID is required'
  }),
  orderStatus: Joi.string().optional().default('Pending'),
  orderDate: Joi.date().optional().default(() => new Date(), 'current date')
});

export default orderValidator;
