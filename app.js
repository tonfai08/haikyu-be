const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/users");
const seatRouter = require("./routes/seat");
const orderRouter = require("./routes/order");
const customerRouter = require("./routes/customer"); // ✅ Import Route
const versionRouter = require("./routes/version"); // ✅ Import Route

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://tonbee11:7YftVSkhGl3SwLTI@cluster0.ccpp974.mongodb.net/test";

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/users", userRouter);
app.use("/seat", seatRouter);
app.use("/order", orderRouter);
app.use("/customers", customerRouter); // ✅ เพิ่มเส้นทางใหม่
app.use("/version", versionRouter);
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
