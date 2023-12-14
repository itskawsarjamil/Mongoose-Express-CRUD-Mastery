import Joi from 'joi';
const fullNameValidationSchema = Joi.object({
  firstName: Joi.string().required().max(20).trim(),
  lastName: Joi.string().required(),
});

const addressValidationSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

export const orderValidationSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

export const userValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required().max(20),
  fullName: fullNameValidationSchema.required(),
  age: Joi.number().required(),
  email: Joi.string().required().email(),
  isActive: Joi.boolean().default(true),
  hobbies: Joi.array().items(Joi.string()).default([]),
  address: addressValidationSchema.required(),
  orders: Joi.array().items(orderValidationSchema),
});

// export const ValidationSchema = {
//     orderValidationSchema,

// };
