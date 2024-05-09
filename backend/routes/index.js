const express = require("express");
const signupRouter = require("./signupRouter");
const loginRouter = require("./loginRouter");
const rootRouter = express.Router();

//signup route
rootRouter.use("/signup", signupRouter);

//login route

rootRouter.use("/login", loginRouter);

module.exports = rootRouter;
