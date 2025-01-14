const express = require("express");
const router = express.Router();

const invoiceRouter = require("./invoice")


router.use("/invoices", invoiceRouter);


module.exports = router;