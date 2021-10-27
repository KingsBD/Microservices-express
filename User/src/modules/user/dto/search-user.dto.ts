import { Joi } from 'express-validation';

export const userParams = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
