const express = require("express");
const app = express();
const dotenv = require("dotenv");
const rootRouter = require("./routes");
const connectDB = require("./db/index");
const cors = require("cors");
//env config
dotenv.config();
//Port
const PORT = process.env.PORT || 8080;
//db config
connectDB();
//middlewares
app.use(cors());
// app.use(express.json());
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);
//routes
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log("port is", PORT);
});
