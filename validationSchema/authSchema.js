import Joi from "joi";

const authLoginSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).required()
});
const authSignUpSchema= Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
});
export{authLoginSchema, authSignUpSchema};


