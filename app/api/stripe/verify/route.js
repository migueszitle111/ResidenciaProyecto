// ===== File: app/api/stripe/verify/route.js =====
import Stripe             from "stripe";
import crypto             from "crypto";
import { NextResponse }   from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User               from "@/models/user";
import { sendPasswordReset, sendWelcomeEmail } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const session_id = req.nextUrl.searchParams.get("session_id");
  if (!session_id) {
    return NextResponse.json({ ok: false, error: "Falta session_id" }, { status: 400 });
  }

  const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
  const session = await stripe.checkout.sessions.retrieve(session_id);
  await connectMongoDB();

  // ¿Ya estaba en la DB?
  let user = await User.findOne({ email: session.customer_email });

  if (user) {
    // => EXISTENTE: activamos si no estaba
    const wasActive = user.subscriptionActive;
    user.subscriptionActive = true;
    await user.save();

    // Si era credentials y justo pagó, enviamos bienvenida:
    if (user.provider === "credentials" && !wasActive) {
      await sendWelcomeEmail(user.email);
    }

  } else {
    // => NUEVO: sacamos toda la metadata
    const md = session.metadata || {};

    // Generamos token para reset
    const token   = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 3600_000;

    user = await User.create({
      name:                 md.name || session.customer_details?.name || "",
      lastname:             md.lastname || "",
      cedula:               md.cedula || "",
      especialidad:         md.especialidad || "",
      email:                session.customer_email,
      password:             "",            // sin contraseña
      roles:                md.roles || "user",
      imageUrl:             md.imageUrl || "",
      provider:             md.provider || "credentials",
      subscriptionActive:   true,
      passwordResetToken:   token,
      passwordResetExpires: expires,
    });

    // Enviamos correo para crear contraseña
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
    await sendPasswordReset(user.email, resetUrl);
  }

  return NextResponse.json({ ok: true });
}
