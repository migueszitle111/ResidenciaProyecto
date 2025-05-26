// app/api/register/route.js
import { NextResponse } from "next/server";
import Stripe          from "stripe";
import bcrypt          from "bcryptjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  const { name, lastname, cedula, especialidad, email, password, roles, imageUrl } =
    await req.json();

  // 1) Hasheamos la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // 2) Creamos la sesión de Checkout pasando todos los datos en metadata
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    customer_email: email,
    metadata: {
      name,
      lastname,
      cedula,
      especialidad,
      email,
      password: hashedPassword,
      roles: roles || "user",
      imageUrl: imageUrl || "",
    },
    success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${process.env.NEXTAUTH_URL}/Registro?canceled=true`,
  });

  return NextResponse.json({ url: session.url });
}
