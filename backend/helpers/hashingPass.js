const bcrypt = require("bcrypt");
async function hashpassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.log("There is an error while hashing your password", err);
  }
}

async function comparePassword(password, hashedPassword) {
  const compared = await bcrypt.compare(password, hashedPassword);
  return compared;
}

module.exports = {
  hashpassword,
  comparePassword,
};
