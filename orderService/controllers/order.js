const orderLogic = require('../logic/orderLogic');

const createOrder = async (req, res, next) => {
    try {
      const { products } = req.body;
      const user_id = req.user.userId
  
      if (!products || products.length === 0) {
        return res.status(400).json({ error: 'You must select at least one product.' });
      }
  
    
      const { newOrder, items } = await orderLogic.createOrderLogic(req,products, user_id);
  
      return res.status(201).json({
        message: 'Order successfully created.',
        order: newOrder,
        items,
      });
    } catch (error) {
      next(error);
    }
  };


const getOrders = async (req, res, next) => {
    try {
      const user_id = req.user.userId
        const order = await orderLogic.getOrdersLogic(req,user_id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};



const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await orderLogic.getOrderByIdLogic(id);

        if (!order) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        console.log("52 de order:",order);
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};



const cancelOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user_id = req.user.userId
        const isDeleted = await orderLogic.cancelProductLogic(req,user_id,id);

        if (!isDeleted) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        res.status(200).json({ message: 'The order has been cancelled successfully.' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    cancelOrder,
};
