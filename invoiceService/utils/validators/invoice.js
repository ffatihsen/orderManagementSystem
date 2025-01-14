const Joi = require('joi');

const createInvoice = Joi.object({
  body: Joi.object({
    order_id: Joi.string()
      .guid({ version: 'uuidv4' })
      .required()
      .label('order_id'),
}).required(),
});



module.exports = {
  createInvoice,
};
