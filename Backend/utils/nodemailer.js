const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendSignUpEmail(recipient, verificationToken) {
  const verificationUrl = `localhost:2000/api/verify-email?token=${verificationToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_MAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GOOGLE_MAIL,
    to: recipient,
    subject: "🎉 SignUp Successful with Choice Mate 🎉",
    html: `
      <html>
        <head>
          <style>
            .container {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              border-radius: 10px;
              text-align: center;
            }
            h1 {
              color: #333333;
            }
            p {
              color: #666666;
            }
            .footer {
              margin-top: 20px;
              color: #999999;
            }
            .verify-button {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              font-size: 16px;
              color: #ffffff;
              background-color: #007bff;
              text-decoration: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎉 Thank You for Signing Up! 🎉</h1>
            <p>Welcome to ChoiceMate. We're excited to have you onboard.</p>
            <p>Get ready to get answers to concerning questions!</p>
            <p>Click the button below to verify your email address:</p>
            <a href="${verificationUrl}" class="verify-button">Verify Email</a>
            <p style="margin-top: 20px;">Or copy and paste the following link into your browser:</p>
            <p><a href="${verificationUrl}" style="color: #007bff; word-break: break-all;">${verificationUrl}</a></p>
            <div class="footer">
              <p>If you have any questions, feel free to contact us at support@dannyphathomtests.com</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
  

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(error);
    throw new Error("Email could not be sent.");
  }
}

async function sendResetLink(recipient, resetToken) {
  const resetUrl = `http://localhost:2000/api/reset-password?token=${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_MAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GOOGLE_MAIL,
    to: recipient,
    subject: "🔒 Password Reset Request for Choice Mate 🔒",
    html: `
      <html>
        <head>
          <style>
            .container {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              border-radius: 10px;
              text-align: center;
            }
            h1 {
              color: #333333;
            }
            p {
              color: #666666;
            }
            .footer {
              margin-top: 20px;
              color: #999999;
            }
            .reset-button {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              font-size: 16px;
              color: #ffffff;
              background-color: #007bff;
              text-decoration: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🔒 Password Reset Request 🔒</h1>
            <p>We received a request to reset your password for your Choice Mate account. Click the button below to reset your password:</p>
            <a href="${resetUrl}" class="reset-button">Reset Password</a>
            <p style="margin-top: 20px;">Or copy and paste the following link into your browser:</p>
            <p><a href="${resetUrl}" style="color: #007bff; word-break: break-all;">${resetUrl}</a></p>
            <div class="footer">
              <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
              <p>If you have any questions, feel free to contact us at support@dannyphathomtests.com</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(error);
    throw new Error("Email could not be sent.");
  }
}


module.exports = {
  sendSignUpEmail,
  sendResetLink,
};
