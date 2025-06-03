// app/api/register/route.js
import { NextResponse } from "next/server";
import Stripe          from "stripe";
import { isAllowedForTrial } from "@/lib/allowedTrials";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  const { name, lastname, cedula, especialidad, email, roles, imageUrl } =
    await req.json();

 // 1) Determinamos si el correo tiene derecho a trial de 90 días
 const giveTrial = isAllowedForTrial(email);

  // 2) Creamos la sesión de Checkout en modo “subscription”
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    customer_email: email,
   subscription_data: {
     // Si el usuario está en la lista de trial, le asignamos 90 días gratis
     ...(giveTrial ? { trial_period_days: 90 } : {}),
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
