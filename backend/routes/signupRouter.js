const express = require("express");
const signupRouter = express.Router();
const User = require("../db/user");
const { hashpassword, comparePassword } = require("../helpers/hashingPass");
const signupCredValidator = require("../middlewares/signupCredentials");

signupRouter.post("/", signupCredValidator, async (req, res) => {
  const alreadyExisted = await User.findOne({
    email: req.body.email,
  });
  if (!alreadyExisted) {
    const { name, email, password, role, phone, address, sport } = req.body;
    const hashedPassword = await hashpassword(password);
    const userCreated = await User.create({
      name: name,
      email: email,
      phone: phone,
      role: role,
      address: address,
      password: hashedPassword,
      sport: sport,
    });
    if (userCreated) {
      res.status(200).json({
        register: true,
        message: "User SignedUp successfully",
      });
    }
  } else {
    res.status(400).json({
      register: false,
      existed: true,
      message: "User already existed please login",
    });
  }
});

module.exports = signupRouter;
