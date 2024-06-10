const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = require("../app");

// Enable CORS for all requests
app.use(cors({ origin: true }));

exports.app = functions.https.onRequest(app);
