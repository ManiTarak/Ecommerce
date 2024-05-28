const express = require("express");
const loginRouter = express.Router();
const jwt = require("jsonwebtoken");
const loginValidator = require("../middlewares/loginValidator.js");
const authenticationCheck = require("../middlewares/authMiddleware.js");
// LOGIN || POST
loginRouter.post("/", loginValidator, (req, res) => {
  const userId = req.id;
  jwt.sign(
    { _id: userId },
    process.env.JWT_SECRET,
    (err, data) => {
      if (err) {
        res.status(500).json({
          error: true,
          message: "Sorry there is an error while creating token",
        });
      } else {
        res.status(200).json({
          token: data,
          user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            address: req.user.address,
            role: req.user.role,
          },
          message: "User Logged in Successfully",
        });
      }
    },
    { expiresIn: 60 }
  );
});

loginRouter.get("/test", authenticationCheck, (req, res) => {
  res.send("<h1>This sample protected route</h1>");
});

module.exports = loginRouter;
