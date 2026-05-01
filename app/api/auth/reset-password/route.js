// app/api/auth/reset-password/route.js
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { resetPasswordSchema } from "@/lib/api/schemas";
import { handleApiError, parseJsonBody } from "@/lib/api/security";

export async function POST(req) {
  try {
    const { token, password } = await parseJsonBody(req, resetPasswordSchema);
    await connectMongoDB();

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token inválido o expirado" },
        { status: 400 }
      );
    }

    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error, "No se pudo restablecer la contraseña");
  }
}
