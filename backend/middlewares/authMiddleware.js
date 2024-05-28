const User = require("../db/user");
const jwt = require("jsonwebtoken");
function authenticationCheck(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      res.status(401).json({
        message: "Invalid access",
      });
      return;
    } else {
      const user = await User.findOne({ _id: data._id });
      req.id = data._id;
      req.user = user;
      next();
    }
  });
}

module.exports = authenticationCheck;
