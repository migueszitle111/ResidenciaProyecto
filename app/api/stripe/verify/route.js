// app/api/stripe/verify/route.js
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import Stripe          from "stripe";
import crypto          from "crypto";
import { connectMongoDB } from "@/lib/mongodb";
import User              from "@/models/user";
import {
  sendPasswordReset,
  sendWelcomeEmail,
  sendTrialInfoEmail,
} from "@/lib/mail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function GET(req) {
  try {
    const session_id = req.nextUrl.searchParams.get("session_id");
    if (!session_id) {
      return NextResponse.json({ ok: false, error: "Falta session_id" }, { status: 400 });
    }

    // 1) Recuperar la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["subscription", "subscription.customer"],
    });

    const customerEmail   = session.customer_email;
    const subscriptionObj = session.subscription;
    const isTrial         = subscriptionObj.status === "trialing";

    // Determinar provider real
    // metadata.provider existe cuando viene del flow “credentials”
    // en caso contrario, es un Google user
    const provider = session.metadata?.provider || "google";

    // Extraer nombre: metadata.name o bien customer_details.name
    const fullName = session.metadata?.name
      || session.customer_details?.name
      || "";

    // 2) Guardar o actualizar usuario en MongoDB
    await connectMongoDB();
    let user = await User.findOne({ email: customerEmail });

    if (!user) {
      // Sólo incluimos lastname/cedula/especialidad para credentials
      const newUserData = {
        email:                customerEmail,
        provider,
        name:                 fullName,
        subscriptionActive:   true,
        stripeSubscriptionId: subscriptionObj.id,
        roles:                session.metadata?.roles || "user",
        imageUrl:             session.metadata?.imageUrl || "",
      };

      if (provider === "credentials") {
        Object.assign(newUserData, {
          lastname:     session.metadata?.lastname || "",
          cedula:       session.metadata?.cedula || "",
          especialidad: session.metadata?.especialidad || "",
        });
      }

      user = new User(newUserData);
    } else {
      user.provider               = provider;
      user.subscriptionActive     = true;
      user.stripeSubscriptionId   = subscriptionObj.id;
      // No tocamos los campos de perfil
    }

    await user.save();

    // 3) Enviar correos según el tipo de usuario y si está en trial
    if (provider === "credentials") {
      // Generar token de restablecimiento con expiración dinámica
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.passwordResetToken   = resetToken;
      user.passwordResetExpires = isTrial
        ? Date.now() + 24 * 60 * 60 * 1000   // 24 h
        : Date.now() +  1 * 60 * 60 * 1000;  // 1 h
      await user.save();

      const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
      await sendPasswordReset(user.email, resetUrl, isTrial ? 24 : 1);

      if (isTrial) {
        await sendTrialInfoEmail(user.email, {
          trialEndsAt: new Date(subscriptionObj.trial_end * 1000).toISOString(),
        });
      } else {
        await sendWelcomeEmail(user.email);
      }
    } else {
      // Usuario Google
      if (isTrial) {
        await sendTrialInfoEmail(user.email, {
          trialEndsAt: new Date(subscriptionObj.trial_end * 1000).toISOString(),
        });
      } else {
        await sendWelcomeEmail(user.email);
      }
    }

    return NextResponse.json({ ok: true, provider });
  } catch (err) {
    console.error("🔴 [stripe/verify] error:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Error interno" },
      { status: 500 }
    );
  }
}
