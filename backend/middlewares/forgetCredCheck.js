const zod = require("zod");
const User = require("../db/user");
async function ForgetCredCheck(req, res, next) {
  try {
    const credSchema = zod.object({
      email: zod.string(),
      password: zod.string().min(8).max(14),
      sport: zod.string().min(1),
    });

    if (credSchema.safeParse(req.body).success) {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        if (user.sport !== req.body.sport) {
          res.status(404).send({
            invalidSport: true,
            message: "Invalid Sport",
          });
          return;
        } else {
          req.user = user._id;
          next();
        }
      } else {
        res.status(404).send({
          message: "Invalid User passed",
        });
        return;
      }
    } else {
      res.status(404).send({
        message: "Invalid data passed",
      });
      return;
    }
  } catch (e) {
    res.status(500).send({
      message: "Error in forget Cred checking ",
    });
  }
}

module.exports = ForgetCredCheck;
