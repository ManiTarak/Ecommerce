const express = require("express");
const loginRouter = express.Router();
const jwt = require("jsonwebtoken");
const loginValidator = require("../middlewares/loginValidator.js");

// LOGIN || POST
loginRouter.post("/", loginValidator, (req, res) => {
  const userId = req.id;
  jwt.sign({ _id: userId }, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Sorry there is an error while creating token",
      });
    } else {
      res.status(200).json({
        token: data,
      });
    }
  });
});

module.exports = loginRouter;
