const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const MAIL_FROM = "onboarding@resend.dev"; // default Resend domain

const mailSender = async (email, title, body) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const response = await resend.emails.send({
      from: MAIL_FROM,
      to: email,          // string or array
      subject: title,
      html: body,
    });

    console.log(
      "mailSender: email sent to",
      email,
      "messageId:",
      response?.data?.id
    );

    return response;
  } catch (error) {
    console.error(
      "mailSender error:",
      error?.message || error
    );
    throw error;
  }
};

module.exports = mailSender;
