const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

// OTP Schema for storing email and OTP with an expiration of 5 minutes
const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // Auto-delete after 5 minutes
  },
});

/**
 * Send verification email with OTP
 * @param {string} email - Recipient's email
 * @param {string} otp - One-time password to be sent
 */
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp)
    );
    console.log("Verification email sent:", mailResponse.response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error; // Important to propagate the error
  }
}

// Pre-save hook: Trigger email only for new OTP documents
OTPSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      await sendVerificationEmail(this.email, this.otp);
    } catch (error) {
      console.error("Failed to send OTP email:", error);
      // You catch error but do not propagate it, so OTP is saved even if email fails
    }
  }
  next();
});

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;
