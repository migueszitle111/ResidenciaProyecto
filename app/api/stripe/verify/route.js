// app/api/stripe/verify/route.js
import { NextResponse } from "next/server";
import Stripe          from "stripe";
import crypto          from "crypto";
import { connectMongoDB } from "@/lib/mongodb";
import User            from "@/models/user";
import {
  sendPasswordReset,
  sendWelcomeEmail,
  sendTrialInfoEmail,
} from "@/lib/mail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function GET(req) {
  const session_id = req.nextUrl.searchParams.get("session_id");
  if (!session_id) {
    return NextResponse.json({ ok: false, error: "Falta session_id" }, { status: 400 });
  }

  // 1) Recuperar la sesión de Stripe, ampliando la suscripción y el customer
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["subscription", "subscription.customer"],
  });

  const customerEmail    = session.customer_email;
  const subscriptionObj  = session.subscription;      // Objeto Subscription
  const isTrial          = subscriptionObj.status === "trialing";

  // 2) Guardar o actualizar al usuario en MongoDB
  await connectMongoDB();
  let user = await User.findOne({ email: customerEmail });

  if (!user) {
    user = new User({
      email:               customerEmail,
      provider:            session.metadata?.provider || "credentials",
      name:                session.metadata?.name || "",
      lastname:            session.metadata?.lastname || "",
      cedula:              session.metadata?.cedula || "",
      especialidad:        session.metadata?.especialidad || "",
      imageUrl:            session.metadata?.imageUrl || "",
      roles:               session.metadata?.roles || "user",
      subscriptionActive:  true,
      stripeSubscriptionId: subscriptionObj.id,
    });
  } else {
    user.subscriptionActive     = true;
    user.stripeSubscriptionId   = subscriptionObj.id;
  }
  await user.save();

  // 3) Enviar correos según provider y si es trial
  if (user.provider === "credentials") {
    // -------- A) Usuario “credentials” --------

    // Generar token para crear contraseña, con expiración a 1 hora o 24 horas
    const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken   = resetToken;
  user.passwordResetExpires = Date.now() + 3600_000; // **1 hora (antes)**
  user.passwordResetToken = resetToken;
  // Si está en trial, expira en 24 horas; si no, expira en 1 hora
  user.passwordResetExpires = isTrial
    ? Date.now() + 24 * 60 * 60 * 1000  // 24 horas
    : Date.now() +  1 * 60 * 60 * 1000;  //  1 hora
  await user.save();

    // Enviar correo de “crear contraseña”
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
    await sendPasswordReset(user.email, resetUrl);

    // Enviar segundo correo: info de ensayo o bienvenida
    if (isTrial) {
      await sendTrialInfoEmail(user.email, {
        trialEndsAt: new Date(subscriptionObj.trial_end * 1000).toISOString(),
      });
    } else {
      await sendWelcomeEmail(user.email);
    }
  } else {
    // -------- B) Usuario “google” --------
    if (isTrial) {
      await sendTrialInfoEmail(user.email, {
        trialEndsAt: new Date(subscriptionObj.trial_end * 1000).toISOString(),
      });
    } else {
      await sendWelcomeEmail(user.email);
    }
  }

  return NextResponse.json({ ok: true, provider: user.provider });
}
