const express = require("express");
const router = express.Router();

const orderRouter = require("./order")


router.use("/orders", orderRouter);


module.exports = router;