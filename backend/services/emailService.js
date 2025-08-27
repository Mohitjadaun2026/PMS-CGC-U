const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

// Create transporter for nodemailer
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Generate unsubscribe token
const generateUnsubscribeToken = (email) => {
  const secret = process.env.NEWSLETTER_SUBSCRIBE_SECRET;
  return crypto.createHmac("sha256", secret).update(email).digest("hex");
};

// Send subscription confirmation email
const sendConfirmationEmail = async (email, unsubscribeLink) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"CGC Jhanjeri DCPD" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject:
        "Welcome to CGC Jhanjeri DCPD! 🎓 Your Career Development Partner",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to CGC Jhanjeri DCPD</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <div style="background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to CGC Jhanjeri DCPD</h1>
      <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">
        Department of Career Planning & Development<br />Empowering students for successful careers.
      </p>
    </div>
    <div style="padding: 30px 20px; text-align: center;">
      <h2 style="color: #1f2937; margin-bottom: 15px;">We're excited to have you on board!</h2>
      <p style="color: #6b7280; line-height: 1.6; margin: 0;">
        Thank you for subscribing to CGC Jhanjeri DCPD's updates. You'll now receive information about job opportunities, training programs, placement activities, and career development resources.
      </p>
      <div style="margin: 30px 0;">
        <a href="https://cgcuet.cgcuniversity.in/admission?utm_source=google&utm_medium=search&utm_campaign=competitors&gad_source=1&gad_campaignid=22921948485&gbraid=0AAAAACuqqMirhwli4aAUiyHZJj3ZJQ0gJ&gclid=Cj0KCQjwzaXFBhDlARIsAFPv-u8V7UEgLEzK-OOOovi_VjppR0AJpWinfrxX33BTJb6YNSVd7c-zj44aAndrEALw_wcB" style="display: inline-block; background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
          Visit Campus Recruitment Portal
        </a>
      </div>
    </div>
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
      <p style="color: #6b7280; margin: 0 0 15px; font-size: 14px;">
        You're receiving this email because you signed up for updates from CGC Jhanjeri DCPD.
      </p>
      <div style="margin-bottom: 15px;">
        <a href="${unsubscribeLink}" style="color: #ef4444; text-decoration: none; font-size: 14px;">
          Unsubscribe from our updates
        </a>
      </div>
      <div style="margin-bottom: 15px;">
        <a href="https://linkedin.com/school/cgcjhanjeri" style="display: inline-block; margin: 0 10px;"><span style="font-size: 20px;">🎓</span></a>
        <a href="https://facebook.com/cgcjhanjeri" style="display: inline-block; margin: 0 10px;"><span style="font-size: 20px;">📘</span></a>
        <a href="https://instagram.com/cgcjhanjeri" style="display: inline-block; margin: 0 10px;"><span style="font-size: 20px;">📸</span></a>
      </div>
      <p style="color: #9ca3af; margin: 0; font-size: 12px;">
        &copy; ${new Date().getFullYear()} CGC Jhanjeri - Department of Career Planning & Development. All rights reserved.<br />
        Chandigarh Group of Colleges, Jhanjeri, Mohali, Punjab 140307
      </p>
    </div>
  </div>
</body>
</html>`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
};

// Send newsletter to all subscribers
const sendBulkNewsletter = async (
  subscribers,
  subject,
  content,
  unsubscribeLinkGenerator
) => {
  const transporter = createTransporter();

  for (const subscriber of subscribers) {
    const unsubscribeLink = unsubscribeLinkGenerator(subscriber.email);

    const mailOptions = {
      from: `"CGC Jhanjeri DCPD" <${process.env.EMAIL_USERNAME}>`,
      to: subscriber.email,
      subject: subject,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CGC Jhanjeri DCPD Update</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <div style="background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); padding: 25px 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">CGC Jhanjeri DCPD</h1>
      <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0; font-size: 14px;">
        Department of Career Planning & Development - Empowering students for successful careers.
      </p>
    </div>
    <div style="padding: 30px 20px;">
      ${content}
    </div>
    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
      <p style="color: #6b7280; margin: 0 0 15px; font-size: 14px;">
        You're receiving this email because you subscribed to CGC Jhanjeri DCPD updates.
      </p>
      <a href="${unsubscribeLink}" style="color: #ef4444; text-decoration: none; font-size: 14px;">
        Unsubscribe
      </a>
      <p style="color: #9ca3af; margin: 15px 0 0; font-size: 12px;">
        &copy; ${new Date().getFullYear()} CGC Jhanjeri - Department of Career Planning & Development.
      </p>
    </div>
  </div>
</body>
</html>`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(`Failed to send to ${subscriber.email}:`, error);
    }
  }
};

module.exports = {
  generateUnsubscribeToken,
  sendConfirmationEmail,
  sendBulkNewsletter,
};
