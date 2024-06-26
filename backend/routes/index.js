const express = require("express");
const signupRouter = require("./signupRouter");
const loginRouter = require("./loginRouter");
const rootRouter = express.Router();
const authenticationCheck = require("../middlewares/authMiddleware");
const ForgetCredCheck = require("../middlewares/forgetCredCheck");
const User = require("../db/user");
const { hashpassword } = require("../helpers/hashingPass");
const isAdmin = require("../middlewares/isAdmin");
const categoryRouter = require("./CategoryRouter");
const productRouter = require("./ProductRouter");
const orderRouter = require("./ordersRoute");
//signup route
rootRouter.use("/signup", signupRouter);

//login route

rootRouter.use("/login", loginRouter);

//Protected route user-auth

rootRouter.get("/user-auth", authenticationCheck, (req, res) => {
  res.status(200).send({
    OK: true,
  });
});

// forget-password , update new password based on Sport that entered during registeration
rootRouter.post("/forget-password", ForgetCredCheck, async (req, res) => {
  try {
    const hashedPassword = await hashpassword(req.body.password);
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
      password: hashedPassword,
    });
    res.status(200).send({
      updated: true,
      message: "Password updated successfully",
    });
  } catch (e) {
    res.status(500).send({
      message: "Error in Password Updation",
    });
  }
});

//admin - auth

rootRouter.get("/admin-auth", authenticationCheck, isAdmin, (req, res) => {
  res.status(200).send({
    OK: true,
  });
});

// Category - route
rootRouter.use("/category", categoryRouter);

// Product - route
rootRouter.use("/product", productRouter);

//Orders -Route
rootRouter.use("/orders", orderRouter);

module.exports = rootRouter;
