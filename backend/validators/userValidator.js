import Joi from 'joi';

const userValidator = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters'
  }),
  role: Joi.string().optional()
});

export default userValidator;
