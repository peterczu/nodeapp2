const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");

const app = express();

/* =========================
   Middleware
========================= */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* =========================
   Serve Public HTML Pages
========================= */

app.use(express.static(path.join(__dirname, "public")));

/* =========================
   MongoDB Connection
========================= */

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/nodeapp2";

mongoose.connect(MONGO_URI)
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

/* =========================
   Routes
========================= */

app.use("/auth", authRoutes);

/* Default route → login page */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

/* =========================
   Start Server
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
