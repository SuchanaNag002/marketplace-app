import Joi from 'joi';
import path from 'path';

const validImageExtensions = ['.jpeg', '.jpg', '.png'];

const productValidator = Joi.object({
  name: Joi.string().required().trim().min(1).messages({
    'string.empty': 'Product name is required',
    'string.min': 'Product name cannot be empty',
    'any.required': 'Product name is required'
  }),
  description: Joi.string().required().trim().min(1).messages({
    'string.empty': 'Product description is required',
    'string.min': 'Product description cannot be empty',
    'any.required': 'Product description is required'
  }),
  price: Joi.number().required().min(0.01).messages({
    'number.base': 'Price must be a number',
    'any.required': 'Price is required',
    'number.min': 'Price must be greater than 0'
  }),
  quantity: Joi.number().required().min(1).messages({
    'number.base': 'Quantity must be a number',
    'any.required': 'Quantity is required',
    'number.min': 'Quantity must be greater than 0'
  }),
  image: Joi.any().required().messages({
    'any.required': 'Image is required'
  }),
  imageUrl: Joi.string().uri().optional().custom((value, helpers) => {
    if (value) {
      const ext = path.extname(value).toLowerCase();
      if (!validImageExtensions.includes(ext)) return helpers.error('any.invalid');
    }
    return value;
  }).messages({
    'string.uri': 'Image URL must be a valid image path',
    'any.invalid': 'Image URL must have a valid .jpeg, .jpg, or .png extension'
  }),
  userId: Joi.string().optional()
});

const updateProductValidator = Joi.object({
  name: Joi.string().optional().trim().min(1).messages({
    'string.empty': 'Product name cannot be empty',
    'string.min': 'Product name cannot be empty'
  }),
  description: Joi.string().optional().trim().min(1).messages({
    'string.empty': 'Product description cannot be empty',
    'string.min': 'Product description cannot be empty'
  }),
  price: Joi.number().optional().min(0.01).messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be greater than 0'
  }),
  quantity: Joi.number().optional().min(1).messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity must be greater than 0'
  }),
  image: Joi.any().optional(),
  imageUrl: Joi.string().uri().optional().custom((value, helpers) => {
    if (value) {
      const ext = path.extname(value).toLowerCase();
      if (!validImageExtensions.includes(ext)) return helpers.error('any.invalid');
    }
    return value;
  }).messages({
    'string.uri': 'Image URL must be a valid image path',
    'any.invalid': 'Image URL must have a valid .jpeg, .jpg, or .png extension'
  }),
  userId: Joi.string().optional()
});

export { productValidator, updateProductValidator };
