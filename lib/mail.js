// lib/mail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host:    process.env.SMTP_HOST,
  port:    Number(process.env.SMTP_PORT),
  secure:  process.env.SMTP_PORT === "465",
  auth:    {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordReset(email, resetUrl) {
  await transporter.sendMail({
    to:      email,
    from:    process.env.SMTP_FROM,
    subject: "Crea tu contraseña en MedxProapp",
    html: `
      <p>Hola,</p>
      <p>Para poder iniciar sesión por primera vez, haz clic aquí y crea tu contraseña:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>El enlace expira en 1 hora.</p>
    `,
  });
}
