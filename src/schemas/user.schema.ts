import Joi from "joi";

const signupSchema = Joi.object({
    email: Joi.string().email().required().lowercase().trim(),
    companyName: Joi.string().required().trim(),
    password: Joi.string().required().min(8)
});

const loginSchema = Joi.object({
    email: Joi.string().required().email().trim(),
    password: Joi.string().required().min(8)
});

export {
    signupSchema,
    loginSchema
}