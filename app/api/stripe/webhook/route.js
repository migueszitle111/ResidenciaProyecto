// ===== File: app/api/stripe/webhook/route.js =====
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export const runtime = "nodejs";

export async function POST(req) {
  console.log("🔔 [Webhook] llamada recibida");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
  const sig = req.headers.get("stripe-signature");
  console.log("🔔 [Webhook] signature:", sig);

  const buf = await req.arrayBuffer();
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("✅ [Webhook] firma válida, evento:", event.type);
  } catch (err) {
    console.error("❌ [Webhook] error de firma:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("📥 [Webhook] checkout.session.completed:", session);

    await connectMongoDB();
    console.log("🗄️  [Webhook] Mongo conectado");

    let user = await User.findOne({ email: session.customer_email });
    console.log("🔍 [Webhook] encontrado user:", user);

    if (user) {
      user.subscriptionActive = true;
      await user.save();
      console.log("✅ [Webhook] subscriptionActive actualizado para:", user.email);
    } else {
      const newUser = await User.create({
        name: session.customer_details?.name || "",
        lastname: "",
        cedula: "",
        especialidad: "",
        email: session.customer_email,
        password: "",
        roles: "user",
        provider: "google",
        subscriptionActive: true,
      });
      console.log("✅ [Webhook] creado nuevo user:", newUser);
    }
  }

  return NextResponse.json({ received: true });
}
