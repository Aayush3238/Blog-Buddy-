const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// DB connection
connectDB();

// Routes import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

// App init
const app = express();

// Middlewares
app.use(
  cors({
    origin: "*", // allow all (ok for now, restrict later)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// Health check (IMPORTANT for Render / Netlify testing)
app.get("/", (req, res) => {
  res.send("🚀 Blog API is running");
});

// Port
const PORT = process.env.PORT || 8080;

// Server listen
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
      .bgCyan.white
  );
});
