import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.hostinger.com
  port: Number(process.env.SMTP_PORT) || 587, // 587 for TLS, 465 for SSL
  secure: Number(process.env.SMTP_PORT) === 465, // true for SSL
  // secure: false,
  auth: {
    user: process.env.EMAIL_USER, // e.g., info@yourdomain.com
    pass: process.env.EMAIL_PASSWORD, // your email password
  },
});

/**
 * Create a transporter for bulk sending. It keeps ONE SMTP connection open and
 * reuses it for every email (instead of logging in again for each message),
 * which is much faster and avoids SMTP "too many connections" rate limits.
 * Always call `.close()` on it when you are done.
 */
export function createBulkTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    pool: true,
    maxConnections: 1,
    maxMessages: 100,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

export async function sendEmail({ to, subject, html }, customTransporter) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Trim Medical Centre <noreply@trimmedicalcentre.ca>',
      to,
      subject,
      html,
    };

    const result = await (customTransporter || transporter).sendMail(mailOptions);
    // console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}
