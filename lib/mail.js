// lib/mail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host:       process.env.SMTP_HOST,
  port:       Number(process.env.SMTP_PORT),      // 587 para STARTTLS o 465 para SSL
  secure:     process.env.SMTP_PORT === "465",    // true si usas 465
  requireTLS: process.env.SMTP_PORT === "587",    // fuerza STARTTLS en 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  logger: true,
  debug:  true,
});

transporter.verify()
  .then(() => console.log("✅ SMTP conectado OK"))
  .catch(err => console.error("❌ Error conexión SMTP:", err));

export async function sendPasswordReset(email, resetUrl) {
  await transporter.sendMail({
    from:    process.env.SMTP_FROM,
    to:      email,
    subject: "Crea tu contraseña en MedxProapp",
    html:    `<p>Hola,</p>
              <p>Haz clic <a href="${resetUrl}">aquí</a> para crear tu contraseña.</p>
              <p>El enlace expira en 1 hora.</p>`,
  });
}

export async function sendWelcomeEmail(email) {
  await transporter.sendMail({
    from:    process.env.SMTP_FROM,
    to:      email,
    subject: "¡Bienvenido a MedxProapp!",
    html:    `<p>¡Hola!</p>
              <p>Gracias por completar tu registro y pago. Tu suscripción está activa y ya puedes disfrutar de todos nuestros servicios.</p>
              <p>¡Nos alegra tenerte con nosotros!</p>`,
  });
}
