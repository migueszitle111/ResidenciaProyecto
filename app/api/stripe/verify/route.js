// File: app/api/stripe/verify/route.js
import Stripe from "stripe"
import { NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"

export const runtime = "nodejs"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const session_id = searchParams.get("session_id")
    if (!session_id) {
      return NextResponse.json(
        { ok: false, error: "Falta session_id" },
        { status: 400 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    })

    // Recupera la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id)
    if (!session || !session.customer_email) {
      return NextResponse.json(
        { ok: false, error: "Sesión de Stripe no válida" },
        { status: 404 }
      )
    }

    // Marca o crea al usuario en Mongo
    await connectMongoDB()
    let user = await User.findOne({ email: session.customer_email })
    if (user) {
      user.subscriptionActive = true
      await user.save()
    } else {
      await User.create({
        name: session.customer_details?.name || "",
        lastname: "",
        cedula: "",
        especialidad: "",
        email: session.customer_email,
        password: "",
        roles: "user",
        provider: "google",
        subscriptionActive: true,
      })
    }

    // Finalmente devuelve ok:true
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("🛑 verify error:", err)
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    )
  }
}
