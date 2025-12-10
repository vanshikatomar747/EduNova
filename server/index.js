// Core modules
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// Custom modules
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");

// Load env
dotenv.config();
const PORT = process.env.PORT || 3000;

// Connect DB & Cloudinary
database.connect();
cloudinaryConnect();

// ----------------------
// MIDDLEWARES
// ----------------------
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL, // Add your production frontend URL to .env
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));



// File uploads
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

// ----------------------
// LOGGING (for debugging)
// ----------------------
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  console.log("Headers:", req.headers);
  next();
});

// ----------------------
// ROUTES
// ----------------------
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server running..." });
});

// ----------------------
// START SERVER
// ----------------------
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
