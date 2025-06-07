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
      return NextResponse.json(
        { ok: false, error: "Falta session_id" },
        { status: 400 }
      );
    }

    // 1) Recuperar la sesión de Stripe y expandir suscripción + cliente
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["subscription", "subscription.customer"],
    });

    const customerEmail   = session.customer_email;
    const subscriptionObj = session.subscription;
    const isTrial         = subscriptionObj.status === "trialing";

    // 2) Guardar o actualizar usuario en MongoDB
    await connectMongoDB();
    let user = await User.findOne({ email: customerEmail });

    if (!user) {
      user = new User({
        email:                customerEmail,
        provider:             session.metadata?.provider || "credentials",
        name:                 session.metadata?.name || "",
        lastname:             session.metadata?.lastname || "",
        cedula:               session.metadata?.cedula || "",
        especialidad:         session.metadata?.especialidad || "",
        imageUrl:             session.metadata?.imageUrl || "",
        roles:                session.metadata?.roles || "user",
        subscriptionActive:   true,
        stripeSubscriptionId: subscriptionObj.id,
      });
    } else {
      user.subscriptionActive     = true;
      user.stripeSubscriptionId   = subscriptionObj.id;
    }
    await user.save();

    // 3) Enviar correos según tipo de usuario y si está en trial
    if (user.provider === "credentials") {
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
      if (isTrial) {
        await sendTrialInfoEmail(user.email, {
          trialEndsAt: new Date(subscriptionObj.trial_end * 1000).toISOString(),
        });
      } else {
        await sendWelcomeEmail(user.email);
      }
    }

    return NextResponse.json({ ok: true, provider: user.provider });

  } catch (err) {
    console.error("🔴 Error en /api/stripe/verify:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}
