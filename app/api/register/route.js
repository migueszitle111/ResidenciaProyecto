import { NextResponse } from "next/server";
import Stripe from "stripe";
import { isAllowedForTrial } from "@/lib/allowedTrials";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const TRIAL_DAYS = Number(process.env.TRIAL_DAYS || 30);

async function getOrCreateCustomerByEmail(email, metadata = {}) {
  const list = await stripe.customers.list({ email, limit: 1 });
  if (list.data.length > 0) return list.data[0];
  return await stripe.customers.create({ email, metadata });
}

export async function POST(req) {
  const { name, lastname, cedula, especialidad, email, roles, imageUrl } =
    await req.json();

  const giveTrial = isAllowedForTrial(email);
  const trialDays = giveTrial ? TRIAL_DAYS : 0;

  const customer = await getOrCreateCustomerByEmail(email, {
    name, lastname, cedula, especialidad,
  });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customer.id,
    payment_method_types: ["card"],
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    subscription_data: {
      ...(trialDays > 0 ? { trial_period_days: trialDays } : {}),
    },
    metadata: {
      name,
      lastname,
      cedula,
      especialidad,
      email,
      roles: roles || "user",
      imageUrl: imageUrl || "",
      provider: "credentials",
    },
    success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/Registro?canceled=true`,
  });

  return NextResponse.json({ url: session.url });
}
