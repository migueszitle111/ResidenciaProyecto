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
  let user = await User.findOne({ email: session.customer_email });
  let provider;

  if (user) {
    // EXISTENTE
    const wasActive = user.subscriptionActive;
    user.subscriptionActive = true;
    await user.save();
    provider = user.provider;

    if (user.provider === "credentials" && !wasActive) {
      await sendWelcomeEmail(user.email);
    }

  } else {
    // NUEVO
    // diferenciar credentials vs google según metadata
    if (session.metadata?.password) {
      // → credentials
      user = await User.create({
        name:               session.metadata.name,
        lastname:           session.metadata.lastname,
        cedula:             session.metadata.cedula,
        especialidad:       session.metadata.especialidad,
        email:              session.metadata.email,
        password:           session.metadata.password,
        roles:              session.metadata.roles,
        imageUrl:           session.metadata.imageUrl,
        provider:           "credentials",
        subscriptionActive: true,
      });
      provider = "credentials";
      await sendWelcomeEmail(user.email);

    } else {
      // → google
      const token   = crypto.randomBytes(32).toString("hex");
      const expires = Date.now() + 3600_000;
      user = await User.create({
        name:                 session.customer_details?.name || "",
        lastname:             "",
        cedula:               "",
        especialidad:         "",
        email:                session.customer_email,
        password:             "",
        roles:                "user",
        provider:             "google",
        subscriptionActive:   true,
        passwordResetToken:   token,
        passwordResetExpires: expires,
      });
      provider = "google";
      const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
      await sendPasswordReset(user.email, resetUrl);
    }
  }

  return NextResponse.json({ ok: true, provider });
}
