// Import the required modules
const express = require("express");
const router = express.Router();

// Import authentication controllers
const { login, signup, sendotp, changePassword } = require("../controllers/Auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");

// Import middleware for authentication
const { auth } = require("../middlewares/auth");

// ****************************************************************************************************
//                                      Authentication Routes
// ****************************************************************************************************

// User login
router.post("/login", login);

// User signup
router.post("/signup", signup);

// Send OTP to user's email for verification
router.post("/sendotp", sendotp);

// Change password (User must be authenticated)
router.post("/changepassword", auth, changePassword);

// ****************************************************************************************************
//                                      Reset Password Routes
// ****************************************************************************************************

// Generate reset password token
router.post("/reset-password-token", resetPasswordToken);

// Reset user's password after verifying token
router.post("/reset-password", resetPassword);

// Export router for use in main application
module.exports = router;
