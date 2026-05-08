export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  ApiInputError,
  enforceRateLimit,
  handleApiError,
} from "@/lib/api/security";
import { connectMongoDB } from "@/lib/mongodb";
import WebQrLoginChallenge from "@/models/webQrLoginChallenge";

const BACKEND_URL = (
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  ""
).replace(/\/+$/, "");

async function fetchMobileUser(mobileToken) {
  if (!BACKEND_URL) {
    throw new Error("BACKEND_URL no configurado");
  }

  const response = await fetch(`${BACKEND_URL}/userdata`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ token: mobileToken }),
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    throw new ApiInputError("No se pudo validar la sesion movil", 502);
  }

  const backendStatus =
    typeof payload?.status === "string" ? payload.status.toLowerCase() : "";

  if (!response.ok || backendStatus !== "ok" || !payload?.data?.email) {
    throw new ApiInputError("Token movil invalido o expirado", 401);
  }

  return payload.data;
}

// GET /api/auth/qr/session-status
// Authorization: Bearer <mobileToken>
// Devuelve si el usuario tiene una sesión web activa y los datos del navegador.
export async function GET(request) {
  try {
    const rateLimitResponse = enforceRateLimit(request, {
      key: "qr-session-status",
      limit: 120,
      windowMs: 10 * 60_000,
    });

    if (rateLimitResponse) return rateLimitResponse;

    const authHeader = request.headers.get("authorization") || "";
    const mobileToken = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : "";

    if (!mobileToken || mobileToken.length < 20) {
      throw new ApiInputError("Token movil requerido en Authorization: Bearer", 401);
    }

    const mobileUser = await fetchMobileUser(mobileToken);
    const email = String(mobileUser.email || "").trim().toLowerCase();

    if (!email) {
      throw new ApiInputError("No se pudo resolver el usuario movil", 401);
    }

    await connectMongoDB();

    const activeChallenge = await WebQrLoginChallenge.findOne({
      approvedEmail: email,
      status: { $in: ["approved", "consumed"] },
    })
      .sort({ approvedAt: -1 })
      .lean();

    if (!activeChallenge) {
      return NextResponse.json({ hasActiveSession: false });
    }

    return NextResponse.json({
      hasActiveSession: true,
      session: {
        challengeId: activeChallenge.challengeId,
        requestIp: activeChallenge.requestIp || "",
        requestUserAgent: activeChallenge.requestUserAgent || "",
        mobileDeviceName: activeChallenge.mobileDeviceName || "",
      },
    });
  } catch (error) {
    return handleApiError(error, "No se pudo consultar el estado de la sesion web");
  }
}
