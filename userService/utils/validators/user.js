const Joi = require('joi');


const createUser = Joi.object({
    body: Joi.object({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
            .label('name'),
        email: Joi.string()
            .email()
            .required()
            .label('Email'),
        password: Joi.string()
            .min(8)
            .max(128)
            .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'))
            .message(
                'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character'
            )
            .required()
            .label('Password'),
    }).required(),
});


const getUser = Joi.object({
    params: Joi.object({
        id: Joi.string().required().label('ID'),
    }).required(),
});




const updateUser = Joi.object({
    params: Joi.object({
        id: Joi.string().required().label('ID'),
    }).required(),
    body: Joi.object({
        name: Joi.string()
            .min(3)
            .max(100)
            .optional()
            .label('name'),
    }).required(),
});




const loginUser = Joi.object({
    body: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .label('Email'),
        password: Joi.string()
            .min(8)
            .max(128)
            .required()
            .label('Password'),
    }).required(),
});


const verifyToken = Joi.object({
    headers: Joi.object({
        authorization: Joi.string().required().label('Authorization Token'),
    }).unknown(true),
});

module.exports = {
    createUser,
    getUser,
    updateUser,
    loginUser,
    verifyToken,
};
