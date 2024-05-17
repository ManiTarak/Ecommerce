const zod = require("zod");
const User = require("../db/user.js");
const { comparePassword } = require("../helpers/hashingPass");

async function loginValidator(req, res, next) {
  const { email, password } = req.body;
  // input validation using ZOD
  const loginSchema = zod.object({
    email: zod.string(),
    password: zod.string().min(8),
  });

  if (loginSchema.safeParse(req.body)) {
    //const passwordCheck = comparePassword(password, hashedPassword);
    //console.log(passwordCheck);
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      res.status(401).json({
        existed: false,
        message: "Invalid User or User doesn't existed",
      });
      return;
    }
    const hashedPassword = user.password;
    const passwordCheck = await comparePassword(password, hashedPassword);
    if (passwordCheck) {
      req.id = user._id;
      next();
    } else {
      res.status(401).json({
        pass: false,
        message: "Wrong Password",
      });
      return;
    }
  }
}
module.exports = loginValidator;
