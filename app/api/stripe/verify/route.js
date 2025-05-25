// File: app/api/stripe/verify/route.js
import Stripe from "stripe";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { sendPasswordReset } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  // 1) Sacamos session_id de la URL
  const session_id = req.nextUrl.searchParams.get("session_id");
  if (!session_id) {
    return NextResponse.json({ ok: false, error: "Falta session_id" }, { status: 400 });
  }

  // 2) Recuperamos la sesión de Stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
  const session = await stripe.checkout.sessions.retrieve(session_id);

  // 3) Conectamos a MongoDB y buscamos al usuario por email
  await connectMongoDB();
  let user = await User.findOne({ email: session.customer_email });

  if (user) {
    // — Ya existía: sólo marcamos la subscripción como activa
    user.subscriptionActive = true;
    await user.save();
  } else {
    // — Nuevo usuario: creamos sin contraseña, generamos token y enviamos el email
    const token   = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 3600_000; // 1 hora

    user = await User.create({
      name:                 session.customer_details?.name || "",
      lastname:             "",
      cedula:               "",
      especialidad:         "",
      email:                session.customer_email,
      password:             "",                // vacío, porque aún no tiene password
      roles:                "user",
      provider:             "google",
      subscriptionActive:   true,
      passwordResetToken:   token,
      passwordResetExpires: expires,
    });

    // 4) Enviamos enlace para que cree su contraseña
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
    await sendPasswordReset(user.email, resetUrl);
  }

  return NextResponse.json({ ok: true });
}
