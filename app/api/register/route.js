// app/api/register/route.js
// Redirige el registro al backend Express de la app móvil
import { NextResponse } from "next/server";
import { handleApiError, parseJsonBody } from "@/lib/api/security";
import { registerSchema } from "@/lib/api/schemas";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5001";

export async function POST(req) {
  try {
    const body = await parseJsonBody(req, registerSchema);

    const res = await fetch(`${BACKEND_URL}/registrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Error al registrar usuario" },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: "Usuario registrado correctamente" },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error, "Error al registrar usuario");
  }
}
