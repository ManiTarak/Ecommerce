const express = require("express");
const loginRouter = express.Router();
const jwt = require("jsonwebtoken");
const loginValidator = require("../middlewares/loginValidator.js");
const authenticationCheck = require("../middlewares/authMiddleware.js");
const User = require("../db/user.js");
const { hashpassword } = require("../helpers/hashingPass.js");
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

// Profile Details
loginRouter.put("/update-profile", authenticationCheck, async (req, res) => {
  try {
    const { name, password, email, phone, address, sport } = await User.findOne(
      {
        _id: req.id,
      }
    );
    if (req.body.password) {
      var hashedPassword = await hashpassword(req.body.password);
    }
    await User.findByIdAndUpdate(req.id, {
      _id: req.id,
      name: req.body.name || name,
      email: req.body.email || email,
      password: hashedPassword || password,
      phone: req.body.phone || phone,
      address: req.body.address || address,
      role: 1,
    });
    const userDetails = await User.findOne({ _id: req.id });
    res.status(200).send({
      success: true,
      user: {
        id: userDetails._id,
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        address: userDetails.address,
        sport: userDetails.sport,
        role: userDetails.role,
      },
      message: "User Profile Details Updated successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Something bad happend while updating products details",
    });
  }
});

module.exports = loginRouter;
