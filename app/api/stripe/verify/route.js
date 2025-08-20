export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
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

    const subscription = session.subscription;
    const status       = subscription?.status;
    const isTrial      = status === "trialing";
    const isActive     = status === "active";
    const isOk         = isTrial || isActive;

    // Email del cliente
    let customerEmail =
      session.customer_email ||
      session.customer_details?.email ||
      session.metadata?.email ||
      null;

    if (!customerEmail && subscription?.customer) {
      const cust =
        typeof subscription.customer === "string"
          ? await stripe.customers.retrieve(subscription.customer)
          : subscription.customer;
      customerEmail = cust?.email || null;
    }

    if (!customerEmail) {
      return NextResponse.json({ ok: false, error: "No se pudo resolver email del cliente" }, { status: 400 });
    }

    const customerId =
      typeof subscription?.customer === "string"
        ? subscription.customer
        : subscription?.customer?.id;

    await connectMongoDB();
    let user = await User.findOne({ email: customerEmail });

    const provider = session.metadata?.provider || "google";
    const fullName = session.metadata?.name || session.customer_details?.name || "";

    if (!user) {
      user = new User({
        email: customerEmail,
        provider,
        name: fullName,
        roles: session.metadata?.roles || "user",
        imageUrl: session.metadata?.imageUrl || "",
      });
    }

    user.stripeCustomerId     = customerId || user.stripeCustomerId;
    user.stripeSubscriptionId = subscription?.id || user.stripeSubscriptionId;
    user.subscriptionActive   = Boolean(isOk);
    user.trialEndsAt          = subscription?.trial_end ? new Date(subscription.trial_end * 1000) : null;

    if (provider === "credentials") {
      user.lastname     = session.metadata?.lastname     ?? user.lastname     ?? "";
      user.cedula       = session.metadata?.cedula       ?? user.cedula       ?? "";
      user.especialidad = session.metadata?.especialidad ?? user.especialidad ?? "";
    }

    await user.save();

    // 3) Emails
    if (provider === "credentials") {
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.passwordResetToken   = resetToken;
      user.passwordResetExpires = isTrial
        ? Date.now() + 24*60*60*1000   // 24 h durante trial
        : Date.now() +  1*60*60*1000;  // 1 h si ya activo
      await user.save();

      const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
      await sendPasswordReset(user.email, resetUrl, isTrial ? 24 : 1);
    }

    if (isTrial) {
      await sendTrialInfoEmail(user.email, {
        trialEndsAt: new Date(subscription.trial_end * 1000).toISOString(),
      });
    } else if (isActive) {
      await sendWelcomeEmail(user.email);
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
