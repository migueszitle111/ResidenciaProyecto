// app/api/auth/forgot-password/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { email } = await req.json();
  await connectMongoDB();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ ok:true }); // No revelar existencia

  // Genera token y caducidad (1 hora)
  const token = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken   = token;
  user.passwordResetExpires = Date.now() + 3600_000;
  await user.save();

  // Envía email con enlace
  const transporter = nodemailer.createTransport({
    host:    process.env.SMTP_HOST,
    port:    Number(process.env.SMTP_PORT),
    secure:  true,
    auth:    { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
  await transporter.sendMail({
    to: user.email,
    from: process.env.SMTP_FROM,
    subject: "Restablece tu contraseña en MedxProapp",
    html: `
      <p>Hola ${user.name},</p>
      <p>Haz clic <a href="${resetUrl}">aquí</a> para crear tu contraseña.</p>
      <p>Este enlace expira en 1 hora.</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
