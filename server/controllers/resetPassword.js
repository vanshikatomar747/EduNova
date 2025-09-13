const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Generate Reset Password Token and Send Email
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Email ${email} is not registered`,
      });
    }

    // Generate secure token
    const token = crypto.randomBytes(20).toString("hex");

    // Save token and expiry time in DB
    await User.findOneAndUpdate(
      { email },
      {
        token,
        resetPasswordExpires: Date.now() + 3600000, // 1 hour expiry
      },
      { new: true }
    );

    // Create reset URL
    const url = `http://localhost:3000/update-password/${token}`;

    // Send email
    await mailSender(
      email,
      "Password Reset",
      `Your password reset link: ${url}. This link will expire in 1 hour.`
    );

    return res.json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error("Error in resetPasswordToken:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send reset email",
      error: error.message,
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (!password || !confirmPassword || !token) {
      return res.status(400).json({
        success: false,
        message: "Password, Confirm Password, and Token are required",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    // Find user by token
    const userDetails = await User.findOne({ token });
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Check token expiry
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(403).json({
        success: false,
        message: "Token expired. Please request a new reset link",
      });
    }

    // Hash new password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Update password and remove token
    await User.findOneAndUpdate(
      { token },
      { password: encryptedPassword, token: null, resetPasswordExpires: null },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
      error: error.message,
    });
  }
};
