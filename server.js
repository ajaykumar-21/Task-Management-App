const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const app = express();

app.use(express.json());

// app.post("/api/test", (req, res) => {
//   res.json({ message: "API is working fine" });
// });

// Routes
app.use("/api/auth", authRoutes); // Use task routes for API Auth
app.use("/api/tasks", taskRoutes); // Use task routes for API tasks

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
