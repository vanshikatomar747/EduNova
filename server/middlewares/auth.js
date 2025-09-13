// Import required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

// Load environment variables
dotenv.config();

// Middleware to authenticate user using JWT
exports.auth = async (req, res, next) => {
  try {
    // Extract token from cookies, body, or header
    const token =
      req.cookies.token ||
      req.body.token ||
      (req.header("Authorization")?.replace("Bearer ", "") || null);

    // If token is missing, return 401 Unauthorized
    if (!token) {
      return res.status(401).json({ success: false, message: "Token Missing" });
    }

    try {
      // Verify token using secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to request
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    next(); // Proceed if token is valid
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error while validating token",
    });
  }
};

// Middleware to check if user is a Student
exports.isStudent = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user || user.accountType !== "Student") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error verifying user role",
    });
  }
};

// Middleware to check if user is an Admin
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user || user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error verifying user role",
    });
  }
};

// Middleware to check if user is an Instructor
exports.isInstructor = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user || user.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Instructors only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error verifying user role",
    });
  }
};
