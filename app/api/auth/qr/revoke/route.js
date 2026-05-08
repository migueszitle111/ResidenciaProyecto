export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  ApiInputError,
  enforceRateLimit,
  handleApiError,
  parseJsonBody,
} from "@/lib/api/security";
import { qrRevokeSchema } from "@/lib/api/schemas";
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

// POST /api/auth/qr/revoke
// Body: { mobileToken }
// Invalida inmediatamente la sesión web activa del usuario desde la app móvil.
export async function POST(request) {
  try {
    const rateLimitResponse = enforceRateLimit(request, {
      key: "qr-revoke",
      limit: 20,
      windowMs: 10 * 60_000,
    });

    if (rateLimitResponse) return rateLimitResponse;

    const { mobileToken } = await parseJsonBody(request, qrRevokeSchema);

    const mobileUser = await fetchMobileUser(mobileToken);
    const email = String(mobileUser.email || "").trim().toLowerCase();

    if (!email) {
      throw new ApiInputError("No se pudo resolver el usuario movil", 401);
    }

    await connectMongoDB();

    const now = new Date();

    const result = await WebQrLoginChallenge.updateOne(
      {
        approvedEmail: email,
        status: { $in: ["approved", "consumed"] },
        sessionExpiresAt: { $gt: now },
      },
      { $set: { status: "revoked", revokedAt: now } }
    );

    return NextResponse.json({
      ok: true,
      revoked: result.modifiedCount > 0,
    });
  } catch (error) {
    return handleApiError(error, "No se pudo revocar la sesion web");
  }
}
