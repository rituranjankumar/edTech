const nodemailer = require("nodemailer");
require("dotenv").config();

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const MAIL_FROM = process.env.MAIL_FROM || `EdTech <kunal50639@gmail.com>`;

// Initialize transporter once (reuse for all sends)
let transporter = null;
if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  // Verify at startup (async, don't block)
  transporter.verify()
    .then(() => console.log("mailSender: SMTP transporter verified"))
    .catch((err) => console.error("mailSender: transporter verify failed -", err && (err.message || err)));
}

const mailSender = async (email, title, body) => {
  try {
    if (!transporter) {
      throw new Error("SMTP transporter not configured (missing SMTP_HOST, SMTP_USER, SMTP_PASS)");
    }

    const info = await transporter.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: title,
      html: body,
    });

    console.log("mailSender: email sent to", email, "messageId:", info.messageId);
    return info;
  } catch (error) {
    console.error("mailSender error:", error && (error.stack || error.message || error));
    throw error;  
  }
};

module.exports = mailSender;