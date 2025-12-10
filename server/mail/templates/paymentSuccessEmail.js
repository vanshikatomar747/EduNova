// Payment Success Email Template
exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
    return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Payment Confirmation</title>
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
  
      <!-- Title -->
      <div class="message">Course Payment Confirmation</div>
  
      <!-- Payment Details -->
      <div class="body">
        <p>Dear ${name},</p>
        <p>We have received a payment of <span class="highlight">₹${amount}</span>.</p>
        <p>Your Payment ID: <span class="highlight">${paymentId}</span></p>
        <p>Your Order ID: <span class="highlight">${orderId}</span></p>
      </div>
  
      <!-- Support Info -->
      <div class="support">
        If you have any questions or need help, contact us at 
        <a href="mailto:edunova.test11@gmail.com">edunova.test11@gmail.com</a>
      </div>
    </div>
  </body>
  </html>`;
  };
  