const express = require('express');
const router = express.Router();
const { createProduct, getProductById, updateProduct, deleteProduct, updateStock,getAllProduct } = require('../controllers/product');
const { authChech } = require("../middlewares/CheckAuth");
const { roleCheck } = require("../middlewares/roleCheck");
const validationHandler = require("../utils/validators");
const productValidator = require("../utils/validators/product");

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: This endpoint allows an admin to create a new product.
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *                 example: Product 1
 *               stock:
 *                 type: integer
 *                 description: Product stock count
 *                 example: 100
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Product price
 *                 example: 29.99
 *               tax:
 *                 type: integer
 *                 description: Product tax
 *                 example: 20
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', authChech, roleCheck("admin"), validationHandler(productValidator.createProduct), createProduct);


/**
 * @swagger
 * /products/:
 *   get:
 *     summary: Get a all product
 *     description: This endpoint allows you to retrieve a product's details by its ID.
 *     tags: [Products]

 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get('/',  getAllProduct); 




/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: This endpoint allows you to retrieve a product's details by its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get('/:id', validationHandler(productValidator.getProduct), getProductById); 

/**
 * @swagger
 * /products/{id}/stock:
 *   put:
 *     summary: Update product stock
 *     description: This endpoint allows an admin to update the stock of an existing product.
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: integer
 *                 description: Updated stock quantity
 *                 example: 150
 *     responses:
 *       200:
 *         description: Product stock updated successfully
 *       400:
 *         description: Invalid input
 */
router.put('/:id/stock', authChech, validationHandler(productValidator.updateProductStock), updateStock); // rolu normal kullanıcılar için...

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product details
 *     description: This endpoint allows an admin to update an existing product's details.
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *                 example: Updated Product
 *               stock:
 *                 type: integer
 *                 description: Product stock count
 *                 example: 120
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Product price
 *                 example: 39.99
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
router.put('/:id', authChech, roleCheck("admin"), validationHandler(productValidator.updateProduct), updateProduct);// Admin tipindeki kullanıcılar için

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: This endpoint allows an admin to delete a product by its ID.
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/:id', authChech, roleCheck("admin"), deleteProduct);

module.exports = router;
