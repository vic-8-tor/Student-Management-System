const PORT = 3000;
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());

// Serve FrontEnd
app.use(express.static(path.join(__dirname, "studentsUI")));

const studentRoute = require("./routes/studentRoute");
app.use("/students", studentRoute);

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const postRoutes = require("./routes/postRoutes");
app.use("/api", postRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(`DB connected`);
  } catch (err) {
    console.log(err.message);
  }
};
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
