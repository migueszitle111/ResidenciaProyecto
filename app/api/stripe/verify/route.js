// app/api/stripe/verify/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export const runtime = "nodejs";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");
  if (!session_id) {
    return NextResponse.json({ error: "Falta session_id" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
  const session = await stripe.checkout.sessions.retrieve(session_id);

  await connectMongoDB();
  let user = await User.findOne({ email: session.customer_email });

  if (user) {
    user.subscriptionActive = true;
    await user.save();
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
    });
  }

  return NextResponse.json({ ok: true });
}
