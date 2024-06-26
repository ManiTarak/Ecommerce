const express = require("express");
const authenticationCheck = require("../middlewares/authMiddleware");
const OrderModel = require("../db/ordermodel");
const orderRouter = express.Router();

// route to get orders of signed user
orderRouter.get("/get-orders", authenticationCheck, async (req, res) => {
  try {
    const orders = await OrderModel.find({ buyer: req.user._id })
      .populate("product", "-photo")
      .populate("buyer", "name");
    res.status(200).send({
      orders: orders,
    });
  } catch (e) {
    res.status(500).send({
      message: "Something bad happend in getting orders",
    });
  }
});
module.exports = orderRouter;
