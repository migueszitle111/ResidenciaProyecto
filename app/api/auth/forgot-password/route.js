// app/api/auth/forgot-password/route.js
export const dynamic = "force-dynamic";

import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { forgotPasswordSchema } from "@/lib/api/schemas";
import { handleApiError, parseJsonBody } from "@/lib/api/security";

export async function POST(req) {
  try {
    const { email } = await parseJsonBody(req, forgotPasswordSchema);
    await connectMongoDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ ok: true });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600_000;
    await user.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error, "No se pudo procesar la solicitud");
  }
}
