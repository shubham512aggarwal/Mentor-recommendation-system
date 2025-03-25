const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const studentRoutes = require("./Routes/registerRoute");
const loginRoutes = require("./Routes/loginRoute");
const getStudentDetails = require("./Routes/getStudentDetails");
const addProject = require("./Routes/addNewProject");

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/students", loginRoutes);
app.use("/api/students", getStudentDetails);
app.use("/api/students", addProject);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
