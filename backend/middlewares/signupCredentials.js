const zod = require("zod");
function signupCredValidator(req, res, next) {
  const { name, password, email, phone, address, role } = req.body;
  const signupSchema = zod.object({
    name: zod.string().max(15),
    password: zod.string().min(8).max(14),
    email: zod.string(),
    phone: zod.string().min(10).max(10),
    address: zod.string(),
    role: zod.number(),
  });

  if (signupSchema.safeParse(req.body).success) {
    next();
  } else {
    res.status(401).json({
      register: false,
      cred: false,
      message: "Invalid credentials",
    });
  }
}

module.exports = signupCredValidator;
