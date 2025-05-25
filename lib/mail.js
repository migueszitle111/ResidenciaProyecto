// lib/mail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host:    process.env.SMTP_HOST,
  port:    Number(process.env.SMTP_PORT),       // por ejemplo 465
  secure:  process.env.SMTP_PORT === "465",     // true si usas 465
  auth:    {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify()
  .then(() => console.log("✅ SMTP conectado (465/SSL OK)"))
  .catch(err => console.error("❌ Error conexión SMTP:", err));

export async function sendPasswordReset(email, resetUrl) {
  try {
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
    console.log(`✉️  Email de restablecimiento enviado a ${email}`);
  } catch (err) {
    console.error("❌ Error enviando email:", err);
    throw err;
  }
}
