const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controller/mailController');

/**
 * @swagger
 * /mail/send:
 *   post:
 *     summary: Send an email
 *     description: Sends an email to the specified recipient with the given subject and content.
 *     tags:
 *       - Email
 *     requestBody:
 *       description: Email details to send the message
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - toMail
 *               - subject
 *               - content
 *             properties:
 *               toMail:
 *                 type: string
 *                 format: email
 *                 description: The recipient's email address
 *                 example: "example@example.com"
 *               subject:
 *                 type: string
 *                 description: The subject of the email
 *                 example: "Invoice for Your Recent Order"
 *               content:
 *                 type: object
 *                 description: The content of the email, which can be any valid JSON object
 *                 example: { "message": "Your order has been processed successfully." }
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "mail success"
 *       400:
 *         description: Invalid input (e.g., missing fields or invalid email format)
 *       500:
 *         description: Internal server error
 */

router.post('/send', sendEmail);

module.exports = router;
