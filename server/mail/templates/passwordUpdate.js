// Password Update Confirmation Email Template
exports.passwordUpdated = (email, name) => {
    return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Update Confirmation</title>
    <style>
      body {
        background-color: #fff;
        font-family: Arial, sans-serif;
        font-size: 16px;
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
        max-width: 180px;
        margin-bottom: 20px;
      }
      .message {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .body {
        margin-bottom: 20px;
      }
      .highlight {
        font-weight: bold;
      }
      .support {
        font-size: 14px;
        color: #666;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Logo -->
      <a href="https://edunova-edtech-project.vercel.app">
        <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="EduNova Logo" />
      </a>
  
      <!-- Main Message -->
      <div class="message">Password Update Confirmation</div>
  
      <!-- Email Body -->
      <div class="body">
        <p>Hi ${name},</p>
        <p>Your password has been successfully updated for the email: <span class="highlight">${email}</span>.</p>
        <p>If you did not request this change, please contact us immediately to secure your account.</p>
      </div>
  
      <!-- Support Information -->
      <div class="support">
        Need help? Contact us at 
        <a href="mailto:edunova@gmail.com">edunova@gmail.com</a>

      </div>
    </div>
  </body>
  </html>`;
  };
  