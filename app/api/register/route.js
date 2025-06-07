import { NextResponse } from "next/server";
import Stripe          from "stripe";
import { isAllowedForTrial } from "@/lib/allowedTrials";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  try {
    const { name, lastname, cedula, especialidad, email, roles, imageUrl } =
      await req.json();

    const giveTrial = isAllowedForTrial(email);

    // Creamos la sesión de Stripe con trial si aplica
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      customer_email: email,
      subscription_data: {
        ...(giveTrial ? { trial_period_days: 90 } : {}),
      },
      metadata: {
        name,
        lastname,
        cedula,
        especialidad,
        email,
        roles:   roles || "user",
        imageUrl: imageUrl || "",
        provider: "credentials",
      },
      success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXTAUTH_URL}/Registro?canceled=true`,
    });

    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error("🔴 Error en /api/register:", err);
    return NextResponse.json(
      { url: null, error: err.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}
