// ===== File: app/api/stripe/verify/route.js =====
import Stripe from "stripe";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { sendPasswordReset, sendWelcomeEmail } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const session_id = req.nextUrl.searchParams.get("session_id");
  if (!session_id) {
    return NextResponse.json({ ok: false, error: "Falta session_id" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
  const session = await stripe.checkout.sessions.retrieve(session_id);
  await connectMongoDB();

  let user = await User.findOne({ email: session.customer_email });

  if (user) {
    const wasActive = user.subscriptionActive;
    user.subscriptionActive = true;
    await user.save();

    if (user.provider === "credentials" && !wasActive) {
      await sendWelcomeEmail(user.email);
    }
  } else {
    const md = session.metadata || {};
    const provider = md.provider || "google";

    // Si es de tipo "credentials", validamos los campos requeridos
    if (provider === "credentials") {
      if (!md.lastname || !md.cedula || !md.especialidad) {
        return NextResponse.json({
          ok: false,
          error: "Faltan campos requeridos: lastname, cedula o especialidad."
        }, { status: 400 });
      }
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 3600_000;

    user = await User.create({
      name:                 md.name || session.customer_details?.name || "",
      lastname:             md.lastname || undefined,
      cedula:               md.cedula || undefined,
      especialidad:         md.especialidad || undefined,
      email:                session.customer_email,
      password:             "", // sin contraseña
      roles:                md.roles || "user",
      imageUrl:             md.imageUrl || "",
      provider:             provider,
      subscriptionActive:   true,
      passwordResetToken:   token,
      passwordResetExpires: expires,
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
    await sendPasswordReset(user.email, resetUrl);
  }

  return NextResponse.json({ ok: true });
}
