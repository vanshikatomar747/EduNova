// Contact Us Email Template
exports.contactUsEmail = (email, firstname, lastname, message, phoneNo, countrycode) => {
    return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Contact Form Confirmation</title>
    <style>
      body {
        background-color: #fff;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        text-align: center;
      }
      .logo {
        max-width: 200px;
        margin-bottom: 20px;
      }
      .message {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .body {
        margin-bottom: 20px;
        text-align: left;
      }
      .support {
        font-size: 14px;
        color: #999;
        margin-top: 20px;
      }
      .highlight {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="https://EduNova-edtech-project.vercel.app">
        <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="EduNova Logo" />
      </a>
      <div class="message">Contact Form Confirmation</div>
      <div class="body">
        <p>Dear ${firstname} ${lastname},</p>
        <p>Thank you for contacting us. We have received your message and will respond to you shortly.</p>
        <p><span class="highlight">Details you provided:</span></p>
        <p>Name: ${firstname} ${lastname}</p>
        <p>Email: ${email}</p>
        <p>Phone Number: ${countrycode || ""} ${phoneNo}</p>
        <p>Message: ${message}</p>
        <p>We appreciate your interest and will get back to you as soon as possible.</p>
      </div>
      <div class="support">
        If you need immediate assistance, email us at 
        <a href="mailto:edunova@gmail.com">edunova@gmail.com</a>
      </div>
    </div>
  </body>
  </html>`;
  };
  