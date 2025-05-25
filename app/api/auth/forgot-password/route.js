// app/api/auth/forgot-password/route.js
import { NextResponse } from "next/server";
import crypto         from "crypto";
import { connectMongoDB } from "@/lib/mongodb";
import User           from "@/models/user";
import { sendPasswordReset } from "@/lib/mail";

export async function POST(req) {
  const { email } = await req.json();
  await connectMongoDB();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ ok: true }); // no reveles si existe

  // crea token y caduca en 1 hora
  const token   = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken   = token;
  user.passwordResetExpires = Date.now() + 3600_000;
  await user.save();

  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
  await sendPasswordReset(user.email, resetUrl);

  return NextResponse.json({ ok: true });
}
