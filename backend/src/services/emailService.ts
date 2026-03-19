/**
 * Email Service
 * Handles sending verification emails via configured email provider
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Email service types
type EmailProvider = 'sendgrid' | 'mailgun' | 'smtp';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Create transporter based on configured email service
 */
function createTransporter() {
  const provider = (process.env.EMAIL_SERVICE || 'smtp').toLowerCase() as EmailProvider;

  if (provider === 'sendgrid') {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY || '',
      },
    });
  }

  if (provider === 'mailgun') {
    return nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILGUN_EMAIL || 'postmaster@' + (process.env.MAILGUN_DOMAIN || ''),
        pass: process.env.MAILGUN_API_KEY || '',
      },
    });
  }

  // Default to SMTP
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'localhost',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || '',
    },
  });
}

const transporter = createTransporter();

/**
 * Send email verification email
 */
export async function sendVerificationEmail(
  email: string,
  fullName: string,
  verificationLink: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 3px solid #007bff;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #007bff;
      margin: 0;
    }
    .content {
      margin: 20px 0;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      margin: 20px 0;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      color: #666;
      font-size: 12px;
    }
    .token-text {
      background-color: #f0f0f0;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
      word-break: break-all;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✉️ Verify Your Email</h1>
    </div>
    
    <div class="content">
      <p>Hello ${fullName},</p>
      
      <p>Thank you for registering with test-bmad! We're excited to have you on board.</p>
      
      <p>To complete your registration and verify your email address, please click the button below:</p>
      
      <a href="${verificationLink}" class="button">Verify Email Address</a>
      
      <p>Or copy and paste this link in your browser:</p>
      <div class="token-text">${verificationLink}</div>
      
      <p><strong>⏰ This link expires in 24 hours.</strong> If you didn't create this account, you can safely ignore this email.</p>
      
      <p>If you have any questions, please don't hesitate to reach out to our support team.</p>
    </div>
    
    <div class="footer">
      <p>© 2026 test-bmad. All rights reserved.</p>
      <p>This email was sent to ${email} because this address was used to create an account on test-bmad.</p>
      <p>If you did not sign up, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
    `;

    const mailOptions: EmailOptions = {
      to: email,
      subject: 'Verify Your Email Address - test-bmad',
      html: htmlContent,
    };

    await transporter.sendMail({
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@test-bmad.com',
      ...mailOptions,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return {
      success: false,
      error: `Failed to send verification email: ${error}`,
    };
  }
}

/**
 * Test email service connection
 */
export async function testEmailService(): Promise<{ success: boolean; error?: string }> {
  try {
    await transporter.verify();
    return { success: true };
  } catch (error) {
    console.error('Email service verification failed:', error);
    return {
      success: false,
      error: `Email service is not configured properly: ${error}`,
    };
  }
}
