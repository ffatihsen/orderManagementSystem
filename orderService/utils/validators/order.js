const Joi = require('joi');

const createOrder = Joi.object({
    body: Joi.object({
        products: Joi.array()
            .items(
                Joi.object({
                    product_id: Joi.number()
                        .integer()
                        .min(0)
                        .required()
                        .label('Product ID'),
                    quantity: Joi.number()
                        .integer()
                        .min(1)
                        .required()
                        .label('Quantity'),
                }).required()
            )
            .min(1)
            .required()
            .label('Products'),
    }).required(),
});

const getOrder = Joi.object({
    params: Joi.object({
        id: Joi.string().uuid().required().label('Order ID'),
    }).required(),
});

module.exports = {
    createOrder,
    getOrder,
};
