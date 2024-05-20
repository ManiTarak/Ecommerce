const express = require("express");
const signupRouter = require("./signupRouter");
const loginRouter = require("./loginRouter");
const rootRouter = express.Router();
const authenticationCheck = require("../middlewares/authMiddleware");
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

module.exports = rootRouter;
