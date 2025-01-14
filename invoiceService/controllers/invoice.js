const invoiceLogic = require('../logic/invoiceLogic');

const createInvoice = async (req, res, next) => {
    try {
      const { order_id } = req.body;
  
    
      const { newOrder, items } = await invoiceLogic.createInvoiceLogic(order_id);
  
      return res.status(201).json({
        message: 'Order successfully created.',
        order: newOrder,
        items,
      });
    } catch (error) {
      next(error);
    }
  };


  module.exports = {
    createInvoice,
  }