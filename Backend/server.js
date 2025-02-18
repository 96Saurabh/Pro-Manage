const express = require("express");
var cors = require("cors");
const connectDB = require("./database");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
require("dotenv").config();

connectDB();

const app = express()

// Apply CORS middleware
app.use(cors({
  origin: ['https://project-frontend-seven-zeta.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("Welcome to the Quizze server! 🚀");
});

// Health API
app.get("/health", (req, res) => {
  return res.json({
    message: "Your API is running successfully!",
  });
});

// Connect DB
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Successfully connected to the DB");
//   })
//   .catch((err) => {
//     console.log("Some error occurred while connecting to the DB", err);
//   });

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Something went wrong!',
    error: err.message,
  });
});

// 404 middleware
app.use((req, res) => {
  res.status(404).send({
    message: 'Route not found',
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running at the port ${PORT}`);
  }
});
