// app/api/auth/reset-password/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) {
  const { token, password } = await req.json();
  await connectMongoDB();

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() }
  });
  if (!user) {
    return NextResponse.json({ error: "Token inválido o expirado" }, { status: 400 });
  }

  user.password             = await bcrypt.hash(password, 10);
  user.provider             = "credentials";      // que ahora puedan usar credentials
  user.passwordResetToken   = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return NextResponse.json({ ok: true });
}
