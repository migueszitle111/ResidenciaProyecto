import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host:    process.env.SMTP_HOST,           // ej. smtp.hostinger.com
  port:    587,                             // for STARTTLS
  secure:  false,                           // STARTTLS, no SSL/TLS inmediato
  requireTLS: true,                         // fuerza uso de TLS una vez conectado
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  logger: true,  // activa logs en consola
  debug:  true,  // modo verboso
});

// Verificación al arrancar
transporter.verify()
  .then(() => console.log("✅ SMTP conectado OK (STARTTLS)"))
  .catch(err => console.error("❌ Error conexión SMTP:", err));

export async function sendPasswordReset(email, resetUrl) {
  try {
    const info = await transporter.sendMail({
      from:    process.env.SMTP_FROM,  // ej. "MedxProapp <soporte@medxproapp.com>"
      to:      email,
      subject: "Crea tu contraseña en MedxProapp",
      html:    `
        <p>Hola,</p>
        <p>Haz clic <a href="${resetUrl}">aquí</a> para crear tu contraseña.</p>
        <p>El enlace expira en 1 hora.</p>
      `,
    });
    console.log(`✉️  Email enviado a ${email}`, info);
  } catch (err) {
    console.error("❌ Error enviando email:", err);
    throw err;
  }
}
