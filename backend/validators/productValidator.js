import Joi from 'joi';

const productValidator = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Product name is required'
  }),
  description: Joi.string().optional().allow(''),
  price: Joi.number().required().messages({
    'number.base': 'Price must be a number',
    'any.required': 'Price is required'
  }),
  imageUrl: Joi.string().uri().optional().messages({
    'string.uri': 'Image URL must be a valid URI'
  })
});

export default productValidator;
