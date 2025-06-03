// app/api/stripe/verify/route.js
import { NextResponse } from "next/server";
import Stripe          from "stripe";
import crypto          from "crypto";
import { connectMongoDB } from "@/lib/mongodb";
import User            from "@/models/user";
import { sendPasswordReset, sendWelcomeEmail, sendTrialInfoEmail } from "@/lib/mail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function GET(req) {
  const session_id = req.nextUrl.searchParams.get("session_id");
  if (!session_id) {
    return NextResponse.json({ ok: false, error: "Falta session_id" }, { status: 400 });
  }

  // 1) Recuperar la sesión de Stripe y expandir la suscripción
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["subscription", "subscription.customer"],
  });

  const customerEmail = session.customer_email;
  const subscriptionObj = session.subscription; // Objeto Subscription

  // 2) Decidir si fue trial (estado “trialing”) o pago normal
  const isTrial = subscriptionObj.status === "trialing";

  // 3) Guardamos o actualizamos al usuario en MongoDB
  await connectMongoDB();
  let user = await User.findOne({ email: customerEmail });

  if (!user) {
    // Si no existía, lo creamos
    user = new User({
      email: customerEmail,
      provider: session.metadata?.provider || "credentials",
      name: session.metadata?.name || "",
      lastname: session.metadata?.lastname || "",
      cedula: session.metadata?.cedula || "",
      especialidad: session.metadata?.especialidad || "",
      imageUrl: session.metadata?.imageUrl || "",
      roles: session.metadata?.roles || "user",
      subscriptionActive: true,
      // Podemos guardar también el id de suscripción si queremos:
      stripeSubscriptionId: subscriptionObj.id,
    });
  } else {
    // Si ya existe, solo actualizamos “subscriptionActive” y guardamos subscriptionId
    user.subscriptionActive = true;
    user.stripeSubscriptionId = subscriptionObj.id;
  }
  await user.save();

  // 4) Enviar correos según “provider” y “isTrial”
  if (user.provider === "credentials") {
    // 4.1) Correo para crear contraseña
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600_000; // caduca en 1 hora
    await user.save();

    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
    await sendPasswordReset(user.email, resetUrl);

    // 4.2) Correo informativo de trial o confirmación de pago
    if (isTrial) {
      // Correo que diga “tienes 3 meses de prueba… después debes pagarla”
      await sendTrialInfoEmail(user.email, {
        trialEndsAt: new Date(subscriptionObj.trial_end * 1000).toISOString(),
      });
    } else {
      // Si no es trial, podemos mandar el welcome normal
      await sendWelcomeEmail(user.email);
    }
  } else {
    // provider === "google"
    if (isTrial) {
      // 4.3) Correo de trial a Google user
      await sendTrialInfoEmail(user.email, {
        trialEndsAt: new Date(subscriptionObj.trial_end * 1000).toISOString(),
      });
    } else {
      // 4.4) Correo de bienvenida si pagó sin trial
      await sendWelcomeEmail(user.email);
    }
  }

  return NextResponse.json({ ok: true, provider: user.provider });
}
