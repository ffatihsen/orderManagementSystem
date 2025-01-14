const express = require('express');
const router = express.Router();
const { createInvoice } = require('../controllers/invoice');
const validationHandler = require("../utils/validators");
const invoiceValidator = require("../utils/validators/invoice");

/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Create a new invoice for an order
 *     description: This endpoint creates an invoice for an existing order by providing the order ID. The `order_id` must be a valid UUID (UUIDv4).
 *     tags:
 *       - Invoice
 *     requestBody:
 *       description: Data for creating a new invoice
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *                 format: uuid
 *                 description: Unique identifier of the order (UUIDv4)
 *                 example: "852dc567-d680-48db-af82-f781aaa9b5a32"
 *           example:
 *             order_id: "852dc567-d680-48db-af82-f781aaa9b5a32"
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order successfully created."
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       description: Unique identifier of the order
 *                       example: "b342c2a3-ec57-4b70-a9b5-2a8b9b86ed23"
 *                     total_amount:
 *                       type: number
 *                       format: float
 *                       description: Total amount of the order
 *                       example: 150.50
 *                     tax_amount:
 *                       type: number
 *                       format: float
 *                       description: Tax amount for the order
 *                       example: 30.10
 *                 items:
 *                   type: array
 *                   description: List of items in the order
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: string
 *                         format: uuid
 *                         description: Unique identifier of the product
 *                         example: "7c3f6ec4-d16a-46b8-bb4f-cf7f6754c3fa"
 *                       quantity:
 *                         type: integer
 *                         description: Quantity of the product
 *                         example: 2
 *                       price:
 *                         type: number
 *                         format: float
 *                         description: Price per unit of the product
 *                         example: 75.25
 *                       tax:
 *                         type: number
 *                         format: float
 *                         description: Tax per unit of the product
 *                         example: 15.05
 *       400:
 *         description: Invalid input or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation error: order_id is required and must be a UUID."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error. Please try again later."
 */

router.post('/', validationHandler(invoiceValidator.createInvoice), createInvoice);

module.exports = router;
