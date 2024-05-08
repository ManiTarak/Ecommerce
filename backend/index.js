const express = require("express");
const app = express();
const dotenv = require("dotenv");
const rootRouter = require("./routes");
const connectDB = require("./db/index");
//env config
dotenv.config();
//Port
const PORT = process.env.PORT || 8080;
//db config
connectDB();
//middlewares
app.use(express.json());
//routes
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log("port is", PORT);
});
