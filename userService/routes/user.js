const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser, loginUser, verifyToken } = require('../controllers/user');
const { authChech } = require('../middlewares/CheckAuth');
const validationHandler = require('../utils/validators');
const userValidator = require('../utils/validators/user');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           description: User's password
 *           example: Passw0rd!
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           description: User's password
 *           example: Passw0rd!
 *     Token:
 *       type: object
 *       properties:
 *         authorization:
 *           type: string
 *           description: Bearer token for authentication
 *           example: Bearer eyJhbGciOiJIUzI1NiIsIn...
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error occurred
 */
router.post('/', validationHandler(userValidator.createUser), createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve user details by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The UUID of the user
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/:id', validationHandler(userValidator.getUser), getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user details by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The UUID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/:id', authChech, validationHandler(userValidator.updateUser), updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The UUID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', authChech, deleteUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user and obtain a token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       404:
 *         description: User not found
 */
router.post('/login', validationHandler(userValidator.loginUser), loginUser);

/**
 * @swagger
 * /users/verify:
 *   post:
 *     summary: Verify the validity of a user's token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token successfully verified
 *       401:
 *         description: Unauthorized or invalid token
 */
router.post('/verify', authChech, validationHandler(userValidator.verifyToken), verifyToken);

module.exports = router;
