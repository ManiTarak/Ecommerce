const jwt = require("jsonwebtoken");
function authenticationCheck(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      res.status(401).json({
        message: "Invalid access",
      });
      return;
    } else {
      req.id = data._id;
      next();
    }
  });
}

module.exports = authenticationCheck;
