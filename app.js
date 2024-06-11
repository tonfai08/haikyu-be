require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const seatRouter = require("./routes/seat");
const app = express();

const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://tonbee11:7YftVSkhGl3SwLTI@cluster0.ccpp974.mongodb.net/myDatabaseName";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.use("/users", userRouter);
app.use("/seat", seatRouter);

module.exports = app;
