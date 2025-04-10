const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const userRouter = require("./routes/users");
const seatRouter = require("./routes/seat");
const orderRouter = require("./routes/order");
const customerRouter = require("./routes/customer"); // ✅ Import Route
const versionRouter = require("./routes/version"); // ✅ Import Route
const visitRoutes = require("./routes/visit");
const floatingRoute = require("./routes/floating");
const app = express();

const floatingLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 นาที
  max: 5, // ขอได้แค่ 5 ครั้ง/นาที ต่อ IP
  message: { error: "Too many requests, please try again later." },
});

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
app.use("/customers", customerRouter);
app.use("/version", versionRouter);
app.use("/visit", visitRoutes);
app.use("/api/floating", (req, res, next) => {
  if (req.method === "POST") {
    return floatingLimiter(req, res, next); // ✅ ใช้ limiter เฉพาะ POST
  }
  next(); // ✅ อื่นๆ ไปต่อ
}, floatingRoute);


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
