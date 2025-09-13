// OTP Verification Email Template
const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
  <html>
  <head>
	<meta charset="UTF-8" />
	<title>OTP Verification</title>
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
		font-size: 24px;
		margin: 10px 0;
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
  
	  <!-- Email Header -->
	  <div class="message">OTP Verification</div>
  
	  <!-- Email Body -->
	  <div class="body">
		<p>Dear User,</p>
		<p>Use the following OTP to verify your account:</p>
		<h2 class="highlight">${otp}</h2>
		<p>This OTP is valid for 5 minutes. If you didn’t request this, please ignore this email.</p>
	  </div>
  
	  <!-- Support Info -->
	  <div class="support">
		Need help? Contact us at 
		<a href="mailto:edunova@gmail.com">edunova@gmail.com</a>
	  </div>
	</div>
  </body>
  </html>`;
  };
  
  module.exports = otpTemplate;
  