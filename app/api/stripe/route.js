//app/stripe/route.js
import Stripe       from "stripe";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User             from "@/models/user";

export const runtime = "nodejs";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion:"2023-10-16" });
  const sig    = req.headers.get("stripe-signature");
  const buf    = await req.arrayBuffer();

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await connectMongoDB();

    // Si ya existe, solo activa su suscripción
    let user = await User.findOne({ email: session.customer_email });
    if (user) {
      user.subscriptionActive = true;
      await user.save();
    } else {
      // Si se suscribe por Google directamente, créalo aquí
      await User.create({
        name:                session.customer_details?.name || "",
        lastname:            "",
        cedula:              "",
        especialidad:        "",
        email:               session.customer_email,
        password:            "",
        roles:               "user",
        provider:            "google",
        subscriptionActive:  true,
      });
    }
  }

  return NextResponse.json({ received: true });
}
