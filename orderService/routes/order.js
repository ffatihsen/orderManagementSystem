const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, cancelOrder } = require('../controllers/order');
const { authChech } = require("../middlewares/CheckAuth");

const validationHandler = require("../utils/validators");
const orderValidator = require("../utils/validators/order");

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: This endpoint allows an authenticated user to create a new order by selecting products and specifying quantities. 
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 description: List of products to be ordered
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       description: ID of the product to order
 *                       example: 123
 *                     quantity:
 *                       type: integer
 *                       description: Number of units of the product to order
 *                       example: 2
 *                 minItems: 1
 *             required:
 *               - products
 *     responses:
 *       201:
 *         description: Order successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Order successfully created.
 *                 order:
 *                   type: object
 *                   description: The created order details
 *                   properties:
 *                     order_id:
 *                       type: string
 *                       description: Unique order identifier
 *                       example: "60a5f3b4c1d2b3421d8f1f61"
 *                     total_amount:
 *                       type: number
 *                       format: float
 *                       description: Total price of the order
 *                       example: 99.99
 *                     tax_amount:
 *                       type: number
 *                       format: float
 *                       description: Total tax amount for the order
 *                       example: 18.99
 *       400:
 *         description: Invalid input, missing or incorrect product details
 *       401:
 *         description: Unauthorized access, missing or invalid token
 */
router.post('/', authChech, validationHandler(orderValidator.createOrder), createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get a list of orders
 *     description: This endpoint retrieves a list of orders placed by the authenticated user. You can optionally filter by date range and amount range.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: false
 *         description: The start date for filtering orders
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: The end date for filtering orders
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: minAmount
 *         required: false
 *         description: Minimum total amount for filtering orders
 *         schema:
 *           type: number
 *           format: float
 *       - in: query
 *         name: maxAmount
 *         required: false
 *         description: Maximum total amount for filtering orders
 *         schema:
 *           type: number
 *           format: float
 *       - in: query
 *         name: direction
 *         required: false
 *         description: The sorting direction for orders ('ASC' or 'DESC'). Defaults to 'DESC'.
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   order_id:
 *                     type: string
 *                     description: Unique identifier for the order
 *                     example: "60a5f3b4c1d2b3421d8f1f61"
 *                   total_amount:
 *                     type: number
 *                     format: float
 *                     description: Total price of the order
 *                     example: 99.99
 *                   status:
 *                     type: string
 *                     description: Current status of the order
 *                     example: "pending"
 *       401:
 *         description: Unauthorized access, missing or invalid token
 *       404:
 *         description: No orders found for the user
 */
router.get('/', authChech, getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     description: Retrieve the details of a specific order by its ID. The user must be authenticated.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique order ID
 *         schema:
 *           type: string
 *           example: "60a5f3b4c1d2b3421d8f1f61"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Order details successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_id:
 *                   type: string
 *                   description: Unique identifier for the order
 *                   example: "60a5f3b4c1d2b3421d8f1f61"
 *                 products:
 *                   type: array
 *                   description: List of products in the order
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: integer
 *                         description: Product ID
 *                         example: 123
 *                       quantity:
 *                         type: integer
 *                         description: Quantity of the product
 *                         example: 2
 *       401:
 *         description: Unauthorized access, missing or invalid token
 *       404:
 *         description: Order not found
 */
router.get('/:id', validationHandler(orderValidator.getOrder), getOrderById);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Cancel an order by ID
 *     description: Cancel a specific order by its ID. Only the user who placed the order can cancel it.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID to be canceled
 *         schema:
 *           type: string
 *           example: "60a5f3b4c1d2b3421d8f1f61"
 *     responses:
 *       200:
 *         description: Order successfully canceled
 *       401:
 *         description: Unauthorized access, missing or invalid token
 *       404:
 *         description: Order not found
 */
router.delete('/:id', authChech, cancelOrder);

module.exports = router;
