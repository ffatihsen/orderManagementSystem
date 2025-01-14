const Invoice = require('../models').Invoice;
const InvoiceItem = require('../models').InvoiceItem;
const axios = require('axios');
const { addTask } = require('../rabbitmq');

const createInvoiceLogic = async (order_id) => {
  try {

    const orderResponse = await axios.get(`${process.env.ORDER_SERVICE_URL}/orders/${order_id}`, {
    });

    const order = orderResponse.data;


    const invoiceData = {
      order_id: order.order_id,
      user_id: order.user_id,
      user_name: order.user_name,
      user_email: order.user_email,
      invoice_date: new Date(),
      total_amount: order.total_amount,
      tax_amount: order.tax_amount || 0,
      status: 'pending'
    };
    
    const newInvoice = await Invoice.create(invoiceData);


    const itemsData = order.orderItems.map(product => {
      return {
        invoice_id: newInvoice.id,
        product_id: product.product_id,
        product_name: product.product_name,
        quantity: product.quantity,
        price: product.price,
        tax: product.tax,
        total_price: (product.price * product.quantity) + (product.tax * product.quantity)
      };
    });


    const invoiceItems = await InvoiceItem.bulkCreate(itemsData);


    const mailObj = { 
      newInvoice:newInvoice,
      invoiceItems:invoiceItems
  };


    await addTask('emailQueue', mailObj);


    return {
      newOrder: newInvoice,
      items: invoiceItems
    };

  } catch (error) {
    console.error("Error Detail:", error);
    throw new Error(error.message || 'An error occurred while creating the invoice.');
  }
};

module.exports = {
  createInvoiceLogic,
};
