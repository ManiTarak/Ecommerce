function isAdmin(req, res, next) {
  try {
    const role = req.user.role;
    if (role === 0) {
      next();
    } else {
      res.status(404).send({
        admin: false,
        message: "User is not an admin",
      });
    }
  } catch (e) {
    res.status(500).send({
      message: "Something error happend during isAdmin check",
    });
  }
}

module.exports = isAdmin;
