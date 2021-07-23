const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8081;

app.use((req, res, next) => {
  let err = new Error("Not found!");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`server running on port: ${PORT}`.underline.cyan)
);
