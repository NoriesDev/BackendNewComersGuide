import Joi from 'joi';


export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).max(20).required(),

})

export const registerSchema = Joi.object({
    userName: Joi.string().alphanum().min(4).max(20).required(),
    email: Joi.string().required(),
    profileImg: Joi.string(),
    password: Joi.string().min(8).max(20).required(),

})