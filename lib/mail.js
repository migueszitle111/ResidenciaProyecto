import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordReset(email, resetUrl) {
  await transporter.sendMail({
    to: email,
    from: process.env.SMTP_FROM,
    subject: "Crea tu contraseña en MedxProapp",
    html: `
      <p>¡Hola!</p>
      <p>Haz clic en el enlace para establecer tu contraseña:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Si no solicitaste esto, ignora este correo.</p>
    `,
  });
}
