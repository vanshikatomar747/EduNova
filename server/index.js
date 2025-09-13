// Import core modules and packages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// Import custom modules
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// Import route handlers
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");

// Load environment variables
dotenv.config();

// Set up server port
const PORT = process.env.PORT || 3000;

// Connect to database
database.connect();

// Global middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // Change to specific domain in production
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connect to Cloudinary
cloudinaryConnect();

// Register API routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up and running...",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//End