// File: app/api/stripe/verify/route.js

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export const runtime = "nodejs";
// Fuerza que esta ruta sea siempre dinámica (no prerender static)
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    // 1) Extraemos session_id de la URL
    const session_id = request.nextUrl.searchParams.get("session_id");
    if (!session_id) {
      return NextResponse.json({ ok: false, error: "Falta session_id" }, { status: 400 });
    }

    // 2) Inicializamos Stripe y recuperamos la sesión
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session || !session.customer_email) {
      return NextResponse.json({ ok: false, error: "Sesión de Stripe no válida" }, { status: 404 });
    }

    // 3) Conectamos a MongoDB y marcamos/creamos al usuario
    await connectMongoDB();
    let user = await User.findOne({ email: session.customer_email });
    if (user) {
      user.subscriptionActive = true;
      await user.save();
    } else {
      await User.create({
        name:                session.customer_details?.name || "",
        lastname:            "",
        cedula:              "",
        especialidad:        "",
        email:               session.customer_email,
        password:            "",      // sin contraseña inicial
        roles:               "user",
        provider:            "google",
        subscriptionActive:  true,
      });
    }

    // 4) Devolver éxito
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("🛑 verify error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
