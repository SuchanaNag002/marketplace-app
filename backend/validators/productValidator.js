import Joi from 'joi';
import path from 'path';

const validImageExtensions = ['.jpeg', '.jpg', '.png'];

const productValidator = Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'Product name is required' }),
  description: Joi.string().required().messages({ 'string.empty': 'Product description is required' }),
  price: Joi.number().required().messages({ 'number.base': 'Price must be a number', 'any.required': 'Price is required' }),
  quantity: Joi.number().required().messages({ 'number.base': 'Quantity must be a number', 'any.required': 'Quantity is required' }),
  imageUrl: Joi.string().uri().optional().custom((value, helpers) => {
    if (value) {
      const ext = path.extname(value).toLowerCase();
      if (!validImageExtensions.includes(ext)) return helpers.error('any.invalid');
    }
    return value;
  }).messages({ 'string.uri': 'Image Path must be a valid image path', 'any.invalid': 'Image must have a valid .jpeg, .jpg, or .png extension' }),
  image: Joi.any().optional(),
  userId: Joi.string().optional()
});

const updateProductValidator = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional().allow(''),
  price: Joi.number().optional(),
  quantity: Joi.number().optional(),
  imageUrl: Joi.string().optional(),
  userId: Joi.string().optional()
});

export { productValidator, updateProductValidator };