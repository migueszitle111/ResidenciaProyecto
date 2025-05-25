// ===== File: app/api/register/route.js =====
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, lastname, cedula, especialidad, email, password, roles, imageUrl } =
    await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);
  await connectMongoDB();
  await User.create({
    name,
    lastname,
    cedula,
    especialidad,
    email,
    password: hashedPassword,
    roles,
    imageUrl,
    provider: "credentials",
    subscriptionActive: true, // activo al registrarse
  });

  return NextResponse.json(
    { message: "Usuario creado correctamente" },
    { status: 201 }
  );
}
