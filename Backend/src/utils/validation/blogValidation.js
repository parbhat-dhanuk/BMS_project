import Joi from "joi";

export const validateBlog=(data)=>{
    const schema=Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required()
    })
    return schema.validate(data)
}
