const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MDBURL);
    return conn;
  } catch (err) {
    console.log(`Error while connecting DB ${err}`);
  }
};

module.exports = connectDB;
