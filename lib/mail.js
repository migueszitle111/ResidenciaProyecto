// ===== File: lib/mail.js =====
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host:       process.env.SMTP_HOST,
  port:       Number(process.env.SMTP_PORT),       // 587 o 465
  secure:     process.env.SMTP_PORT === "465",     // true si usas 465
  requireTLS: process.env.SMTP_PORT === "587",     // fuerza STARTTLS en 587
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

/**
 * Envía un correo para que el usuario cree o restablezca su contraseña.
 * Lo usas tanto en el flujo de "nueva cuenta tras Stripe" como en "olvidé mi contraseña".
 */
export async function sendPasswordReset(email, resetUrl) {
  const html = `
  <div style="font-family: sans-serif; background: #f5f5f5; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden;">
      <div style="background: #ff6600; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">MedxProapp</h1>
      </div>
      <div style="padding: 30px; color: #333;">
        <p>¡Hola!</p>
        <p>Para crear tu contraseña y activar tu acceso, haz clic en el botón:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}"
             style="
               display: inline-block;
               background-color: #ff6600;
               color: white;
               text-decoration: none;
               padding: 12px 24px;
               border-radius: 4px;
               font-weight: bold;
             ">
            Crear mi contraseña
          </a>
        </p>
        <p>Si el botón no funciona, copia y pega esta URL en tu navegador:</p>
        <p style="word-break: break-all; color: #0066cc;">${resetUrl}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #999;">
          Este enlace expira en 1 hora. Si no solicitaste este correo, ignóralo.
        </p>
      </div>
      <div style="background: #fafafa; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        © ${new Date().getFullYear()} MedxProapp. Todos los derechos reservados.
      </div>
    </div>
  </div>
  `;

  await transporter.sendMail({
    from:    process.env.SMTP_FROM,
    to:      email,
    subject: "Crea tu contraseña en MedxProapp",
    html,
  });
}

/**
 * Envía un correo de bienvenida **después** de que un usuario credential realice el pago.
 * (Opcional: puedes prescindir de este si prefieres que primero creen contraseña.)
 */
export async function sendWelcomeEmail(email) {
  const html = `
  <div style="font-family: sans-serif; background: #f5f5f5; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden;">
      <div style="background: #ff6600; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">¡Bienvenido a MedxProapp!</h1>
      </div>
      <div style="padding: 30px; color: #333;">
        <p>¡Hola!</p>
        <p>Gracias por completar tu registro y pago.</p>
        <p>Tu suscripción ya está activa y puedes comenzar a disfrutar de todos nuestros servicios médicos digitales.</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/"
             style="
               display: inline-block;
               background-color: #ff6600;
               color: white;
               text-decoration: none;
               padding: 12px 24px;
               border-radius: 4px;
               font-weight: bold;
             ">
            Ir a MedxProapp
          </a>
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #999;">
          Si necesitas ayuda, escríbenos a <a href="mailto:soporte@medxproapp.com">soporte@medxproapp.com</a>.
        </p>
      </div>
      <div style="background: #fafafa; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        © ${new Date().getFullYear()} MedxProapp. Todos los derechos reservados.
      </div>
    </div>
  </div>
  `;

  await transporter.sendMail({
    from:    process.env.SMTP_FROM,
    to:      email,
    subject: "¡Bienvenido a MedxProapp!",
    html,
  });
}
