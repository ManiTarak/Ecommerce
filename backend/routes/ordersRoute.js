const express = require("express");
const authenticationCheck = require("../middlewares/authMiddleware");
const OrderModel = require("../db/ordermodel");
const orderRouter = express.Router();
const isAdmin = require("../middlewares/isAdmin");
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

//route to get all the orders to display in Admin dashboard Order panel
orderRouter.get(
  "/getall-orders",
  authenticationCheck,
  isAdmin,
  async (req, res) => {
    try {
      const orders = await OrderModel.find({})
        .populate("product", "-photo")
        .populate("buyer", "name");
      res.status(200).send({
        success: true,
        orders: orders,
      });
    } catch (e) {
      res.status(500).send({
        message: "something bad happend while getting all products",
      });
    }
  }
);

// route to update status of order
orderRouter.put(
  "/updateOrderStatus/:orderId",
  authenticationCheck,
  isAdmin,
  async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const order = await OrderModel.findByIdAndUpdate(
        orderId,
        {
          status,
        },
        {
          new: true,
        }
      );
      res.status(200).send({
        success: true,
        order,
      });
    } catch (e) {
      res.status(500).send({
        success: false,
        message: "Something bad happend in updating order status",
      });
    }
  }
);
module.exports = orderRouter;
