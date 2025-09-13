// Course Enrollment Email Template
exports.courseEnrollmentEmail = (courseName, name) => {
    return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Course Registration Confirmation</title>
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
      }
      .cta {
        display: inline-block;
        padding: 10px 20px;
        background-color: #FFD60A;
        color: #000;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
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
      <!-- Logo and Branding -->
      <a href="https://EduNova-edtech-project.vercel.app">
        <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt= EduNova Logo" />
      </a>
  
      <!-- Email Header -->
      <div class="message">Course Registration Confirmation</div>
  
      <!-- Email Body -->
      <div class="body">
        <p>Dear ${name},</p>
        <p>You have successfully registered for the course 
          <span class="highlight">"${courseName}"</span>. We are excited to have you on board!</p>
        <p>Log in to your dashboard to access the course materials and start learning.</p>
        <a class="cta" href="https://edunova-edtech-project.vercel.app/dashboard">Go to Dashboard</a>
      </div>
  
      <!-- Support Info -->
      <div class="support">
        If you have any questions, email us at 
        <a href="mailto:edunova@gmail.com">edunova@gmail.com</a>
      </div>
    </div>
  </body>
  </html>`;
  };
  