import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host:    process.env.SMTP_HOST,           // smtp.hostinger.com
  port:    Number(process.env.SMTP_PORT),   // 465
  secure:  process.env.SMTP_PORT === "465", // true para SSL/TLS
  auth:    {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  logger: true,  // activa logs en consola
  debug:  true,  // modo verboso
});

// Verificación al arrancar
transporter.verify()
  .then(() => console.log("✅ SMTP conectado OK"))
  .catch(err => console.error("❌ Error conexión SMTP:", err));

export async function sendPasswordReset(email, resetUrl) {
  try {
    await transporter.sendMail({
      to:      email,
      from:    process.env.SMTP_FROM,
      subject: "Crea tu contraseña en MedxProapp",
      html:    `<p>Hola,</p>
                <p>Haz clic <a href="${resetUrl}">aquí</a> para crear tu contraseña.</p>
                <p>El enlace expira en 1 hora.</p>`
    });
    console.log(`✉️  Email enviado a ${email}`);
  } catch (err) {
    console.error("❌ Error enviando email:", err);
    throw err;
  }
}
