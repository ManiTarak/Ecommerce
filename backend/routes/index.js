const express = require("express");
const signupRouter = require("./signupRouter");
const rootRouter = express.Router();

rootRouter.use("/signup", signupRouter);

module.exports = rootRouter;
