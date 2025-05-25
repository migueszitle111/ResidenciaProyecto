// app/api/stripe/verify/route.js
import Stripe from "stripe";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { sendPasswordReset } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const session_id = request.nextUrl.searchParams.get("session_id");
  if (!session_id) return NextResponse.json({ ok:false, error:"Falta session_id" },{ status:400 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion:"2023-10-16" });
  const session = await stripe.checkout.sessions.retrieve(session_id);
  if (!session?.customer_email) return NextResponse.json({ ok:false, error:"Sesión no válida" },{ status:404 });

  await connectMongoDB();
  let user = await User.findOne({ email: session.customer_email });

  if (user) {
    user.subscriptionActive = true;
    await user.save();
  } else {
    // 1) creamos al usuario
    user = await User.create({
      name:                session.customer_details?.name || "",
      lastname:            "",
      cedula:              "",
      especialidad:        "",
      email:               session.customer_email,
      password:            "",
      roles:               "user",
      provider:            "google",
      subscriptionActive:  true,
    });
    // 2) generamos token + expiración
    const token = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken   = token;
    user.passwordResetExpires = Date.now() + 3600_000; // 1 hora
    await user.save();

    // 3) enviamos email
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
    await sendPasswordReset(user.email, resetUrl);
  }

  return NextResponse.json({ ok:true });
}
