import Joi from "joi";


const todoSchema= Joi.object({
    name: Joi.string().min(1).required(),
    status: Joi.string().min(1).required()
})

export {todoSchema};


