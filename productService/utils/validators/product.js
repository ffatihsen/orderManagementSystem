const Joi = require('joi');


const createProduct = Joi.object({
    body: Joi.object({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
            .label('name'),
        stock: Joi.number()
            .integer()
            .min(0)
            .required()
            .label('stock'),
        price: Joi.number()
            .precision(2)
            .positive()
            .required()
            .label('price'),
        tax: Joi.number()
            .integer()
            .min(0)
            .required()
            .label('tax'),
    }).required(),
});


const getProduct = Joi.object({
    params: Joi.object({
        id: Joi.string().required().label('ID'),
    }).required(),
});


const updateProduct = Joi.object({
    params: Joi.object({
        id: Joi.string().required().label('ID'),
    }).required(),
    body: Joi.object({
        name: Joi.string()
            .min(3)
            .max(100)
            .optional()
            .label('name'),
        stock: Joi.number()
            .integer()
            .min(0)
            .optional()
            .label('stock'),
        price: Joi.number()
            .precision(2)
            .positive()
            .optional()
            .label('price'),
    }).min(1).required(),
});

const updateProductStock = Joi.object({
    params: Joi.object({
        id: Joi.string().required().label('ID'),
    }).required(),
    body: Joi.object({

        stock: Joi.number()
            .integer()
            .min(0)
            .optional()
            .label('stock'),
    }).required(),
});

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    updateProductStock,
};
