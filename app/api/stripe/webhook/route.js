// app/api/stripe/webhook/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    console.log("🔔 [Webhook] llamada recibida");

    // 1) Instancia de Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    // 2) Lee la firma Stripe de las cabeceras
    const sig = req.headers.get("stripe-signature");
    console.log("🔔 [Webhook] signature:", sig);

    // 3) Lee el cuerpo **crudo** como texto
    const rawBody = await req.text();

    // 4) Verifica la firma
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log("✅ [Webhook] firma válida, evento:", event.type);
    } catch (err) {
      console.error("❌ [Webhook] error de firma:", err.message);
      return NextResponse.json(
        { error: `Invalid signature: ${err.message}` },
        { status: 400 }
      );
    }

    // 5) Sólo nos interesa el checkout.session.completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("📥 [Webhook] checkout.session.completed:", session);

      // 6) Conecta a Mongo
      await connectMongoDB();
      console.log("🗄️  [Webhook] Mongo conectado");

      // 7) Busca o crea/actualiza al usuario
      let user = await User.findOne({ email: session.customer_email });
      console.log("🔍 [Webhook] encontrado user:", user);

      if (user) {
        user.subscriptionActive = true;
        await user.save();
        console.log(
          "✅ [Webhook] subscriptionActive actualizado para:",
          user.email
        );
      } else {
        const newUser = await User.create({
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
        console.log("✅ [Webhook] creado nuevo user:", newUser);
      }
    }

    // 8) Responde OK a Stripe
    return NextResponse.json({ received: true });
  } catch (err) {
    // Cualquier otro error terminará aquí
    console.error("❌ [Webhook] error inesperado:", err);
    return NextResponse.json(
      { error: `Webhook handler failed: ${err.message}` },
      { status: 500 }
    );
  }
}
