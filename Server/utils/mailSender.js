const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    const host = process.env.SMTP_HOST;     // smtp.gmail.com
    const user = process.env.SMTP_USER;     // gmail id
    const pass = process.env.SMTP_PASS;     // app password
    const port = 587;                  // Gmail TLS port (FIXED)

    if (!host || !user || !pass) {
      throw new Error("Missing mail environment variables");
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,                   // true ONLY for 465
      auth: { user, pass },
    });

    await transporter.verify();        // ensures SMTP connection works

    const info = await transporter.sendMail({
      from: `EdTech <${user}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Mail sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("mailSender error:", error);
    throw error;
  }
};

module.exports = mailSender;
