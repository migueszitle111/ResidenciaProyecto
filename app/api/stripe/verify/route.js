export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";
import bcrypt from "bcryptjs";
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

function isValidSessionId(value) {
  return typeof value === "string" && /^cs_[A-Za-z0-9_]+$/.test(value.trim());
}

export async function GET(req) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");
    if (!isValidSessionId(sessionId)) {
      return NextResponse.json(
        { ok: false, error: "session_id inválido" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "subscription.customer"],
    });

    const subscription = session.subscription;
    const status = subscription?.status;
    const isTrial = status === "trialing";
    const isActive = status === "active";
    const isOk = isTrial || isActive;

    let customerEmail =
      session.customer_email ||
      session.customer_details?.email ||
      session.metadata?.email ||
      null;

    if (!customerEmail && subscription?.customer) {
      const customer =
        typeof subscription.customer === "string"
          ? await stripe.customers.retrieve(subscription.customer)
          : subscription.customer;
      customerEmail = customer?.email || null;
    }

    if (!customerEmail) {
      return NextResponse.json(
        { ok: false, error: "No se pudo resolver email del cliente" },
        { status: 400 }
      );
    }

    customerEmail = customerEmail.toLowerCase().trim();

    const customerId =
      typeof subscription?.customer === "string"
        ? subscription.customer
        : subscription?.customer?.id;

    await connectMongoDB();
    let user = await User.findOne({ email: customerEmail });

    const provider = session.metadata?.provider || "google";
    const fullName = session.metadata?.name || session.customer_details?.name || "";

    if (!user) {
      const generatedPassword = crypto.randomBytes(32).toString("hex");
      user = new User({
        email: customerEmail,
        provider,
        name: fullName || "Usuario",
        lastname: session.metadata?.lastname || "Pendiente",
        idprofessional: session.metadata?.idprofessional || "Pendiente",
        specialty: session.metadata?.specialty || "Pendiente",
        password: await bcrypt.hash(generatedPassword, 10),
        roles: session.metadata?.roles || "user",
        imageUrl: session.metadata?.imageUrl || "",
      });
    }

    user.provider = provider;
    user.roles = user.roles || session.metadata?.roles || "user";
    user.stripeCustomerId = customerId || user.stripeCustomerId;
    user.stripeSubscriptionId = subscription?.id || user.stripeSubscriptionId;
    user.subscriptionActive = Boolean(isOk);
    user.trialEndsAt = subscription?.trial_end
      ? new Date(subscription.trial_end * 1000)
      : null;

    await user.save();

    if (provider === "credentials") {
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.passwordResetToken = resetToken;
      user.passwordResetExpires = isTrial
        ? Date.now() + 24 * 60 * 60 * 1000
        : Date.now() + 1 * 60 * 60 * 1000;
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
  } catch (error) {
    console.error("[stripe/verify] error:", error);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
