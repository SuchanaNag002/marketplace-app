import Joi from 'joi';

const userValidator = Joi.object({
  name: Joi.string().required().trim().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters'
  }),
  address: Joi.string().required().trim().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required'
  })
});

export default userValidator;
