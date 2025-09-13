// Import required modules
const express = require("express");
const router = express.Router();

// Import Payment Controllers
const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
  // verifySignature, // Uncomment if needed for signature validation
} = require("../controllers/payments");

// Import authentication and role-based middlewares
const { auth, isStudent } = require("../middlewares/auth");

// ********************************************************************************************
//                                      PAYMENT ROUTES
// ********************************************************************************************

// Route to capture payment for a course (Only accessible to Students)
router.post("/capturePayment", auth, isStudent, capturePayment);

// Route to verify payment after transaction (Only accessible to Students)
router.post("/verifyPayment", auth, isStudent, verifyPayment);

// Route to send a confirmation email after successful payment (Only accessible to Students)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

// Optional route for verifying signature (for extra security, enable if needed)
// router.post("/verifySignature", verifySignature);

// Export the router to be used in main server
module.exports = router;
