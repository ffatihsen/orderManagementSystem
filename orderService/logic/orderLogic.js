
const Order = require('../models').Order;
const OrderItem = require('../models').OrderItem;
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const { addTask } = require('../rabbitmq');

const createOrderLogic = async (req, products, user_id) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let totalAmount = 0;
    let totalTaxAmount = 0;
    const orderItems = [];

    for (const { product_id, quantity } of products) {

      const response = await axios.get(
        `${process.env.PRODUCT_SERVICE_URL}/products/${product_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const product = response.data;

      if (!product) {
        throw new Error(`Product not found: ${product_id}`);
      } else if (product.stock < quantity) {
        throw new Error(`There are not enough stocks of this product as requested.: ${product.name}`);
      }


      await axios.put(
        `${process.env.PRODUCT_SERVICE_URL}/products/${product_id}/stock`,
        { stock: product.stock - quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


       const itemTax = product.price * (product.tax / 100) * quantity;


      const itemTotal = product.price * quantity;
      totalAmount += itemTotal;
      totalTaxAmount += itemTax;



      orderItems.push({
        order_id: null,
        product_id,
        quantity,
        price: product.price,
        tax: itemTax
      });
    }


    const newOrder = await Order.create({
      order_id: uuidv4(),
      user_id,
      status: 'pending',
      total_amount: totalAmount,
      tax_amount: totalTaxAmount
    });


    const itemsWithOrderId = orderItems.map((item) => ({
      ...item,
      order_id: newOrder.order_id,
    }));

    await OrderItem.bulkCreate(itemsWithOrderId);

    const invoiceObj = { 
      order_id:newOrder.order_id,
      user_id:user_id,
      invoice_date:new Date(),
      total_amount:totalAmount,
      tax_amount: totalTaxAmount,
      status:"pending"
  };



    await addTask('invoiceQueue', invoiceObj);

    return { newOrder, items: itemsWithOrderId };
  } catch (error) {
    console.error("Error Detail:", error);
    throw new Error(error.message || 'An error occurred while creating the order.');
  }
};
  
const cancelProductLogic = async (req,user_id, order_id) => {
  try {

    const token = req.headers.authorization.split(" ")[1];

    const order = await Order.findOne({
      where: {
        order_id: order_id,
      },
    });


    if (!order) {
      throw new Error('Odder not found.');
    }

 
    if (order.user_id !== user_id) {
      throw new Error('You do not have authorization to perform this action..');
    }

    if (order.status === 'cancelled') {
      throw new Error('This order has already been cancelled.');
    }


    await order.update({
      status: 'cancelled',
    });


    const orderItems = await OrderItem.findAll({
      where: {
        order_id: order_id,
      },
    });


    for (const item of orderItems) {
      const productResponse = await axios.get(
        `${process.env.PRODUCT_SERVICE_URL}/products/${item.product_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const product = productResponse.data;

      if (product) {

        await axios.put(
          `${process.env.PRODUCT_SERVICE_URL}/products/${item.product_id}/stock`,
          { stock: product.stock + item.quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    }

    return { message: 'The order has been cancelled successfully.' };
  } catch (error) {
    console.error("Hata Detayı:", error);
    throw new Error(error.message || 'An error occurred while cancelling the order.');
  }
};

const getOrdersLogic = async (req, user_id) => {
  try {
    const { startDate, endDate, minAmount, maxAmount, direction } = req.query;


    let filt_direction = 'DESC';

    if (direction && ['ASC', 'DESC'].includes(direction.toUpperCase())) {
      filt_direction = direction.toUpperCase();
    } else if (direction) {
      throw new Error('Invalid sort direction. Only ASC or DESC is valid.');
    }

    const filters = {
      user_id: user_id,
    };

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (isNaN(start) || isNaN(end)) {
        throw new Error('Invalid date format.');
      }

      filters.created_at = {
        [Op.between]: [start, end],
      };
    }

    if (minAmount) {
      filters.total_amount = {
        [Op.gte]: parseFloat(minAmount),
      };
    }

    if (maxAmount) {
      filters.total_amount = {
        ...filters.total_amount,
        [Op.lte]: parseFloat(maxAmount),
      };
    }

    if (minAmount && maxAmount && parseFloat(minAmount) > parseFloat(maxAmount)) {
      throw new Error('Minimum amount cannot be greater than maximum amount.');
    }

    const orders = await Order.findAll({
      where: filters,
      order: [['created_at', filt_direction]],
    });

    return orders;
  } catch (error) {
    console.error('Hata Detayı:', error);
    throw new Error(error.message || 'An error occurred while receiving orders.');
  }
};


const getOrderByIdLogic = async (id) => {
  try {
      const order = await Order.findOne({
          where: { order_id: id },
      });

      if (!order) {
          return null;
      }

      const orderItems = await OrderItem.findAll({
          where: { order_id: id },
      });

      const formattedOrderItems = await Promise.all(
        orderItems.map(async (item) => {
          const productResponse = await axios.get(
            `${process.env.PRODUCT_SERVICE_URL}/products/${item.product_id}`
          );
  
          const productResponseData = productResponse.data;
  
          return {
            product_id: item.product_id,
            product_name: productResponseData.name,
            quantity: item.quantity,
            price: item.price,
            tax: item.tax,
          };
        })
      );


      const userResponse = await axios.get(`${process.env.USER_SERVICE_URL}/users/${order.user_id}`, {
      });

      const userRes = userResponse.data


      const formattedOrder = {
          id: order.id,
          order_id: order.order_id,
          user_id: order.user_id,
          user_name: userRes.name,
          user_email: userRes.email,
          total_amount: order.total_amount,
          tax_amount: order.tax_amount,
          orderItems: formattedOrderItems 
          
      };

      return formattedOrder;
  } catch (error) {
      console.error('Error retrieving order:', error);
      throw new Error('An error occurred while fetching the order.');
  }
};


  module.exports = {
    createOrderLogic,
    cancelProductLogic,
    getOrdersLogic,
    getOrderByIdLogic,
  }