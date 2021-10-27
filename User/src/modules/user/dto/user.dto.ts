import { Joi } from 'express-validation';

export const user = {
  body: Joi.object({
    id: Joi.string().optional(),
    firstName: Joi.string().required(),
    middleName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    secundaryEmail: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    secundaryPhoneNumber: Joi.string().required(),
    homeAddress: Joi.string().required(),
    city: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
