const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");

// -------------------- CONTACT US CONTROLLER --------------------
exports.contactUsController = async (req, res) => {
  try {
    const { email, firstname, lastname, message, phoneNo, countrycode } = req.body;

    //  Validate required fields
    if (!email || !firstname || !lastname || !message) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    //  Send email using mailSender utility
    await mailSender(
      email,
      "Your data was sent successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending email",
      error: error.message,
    });
  }
};
