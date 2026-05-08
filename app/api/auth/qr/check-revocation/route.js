export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { enforceRateLimit, handleApiError } from "@/lib/api/security";
import { connectMongoDB } from "@/lib/mongodb";
import WebQrLoginChallenge from "@/models/webQrLoginChallenge";

// GET /api/auth/qr/check-revocation
// Requiere sesión NextAuth (cookie). Devuelve si la sesión QR del navegador
// fue revocada o expiró, para que el cliente haga signOut automáticamente.
export async function GET(request) {
  try {
    const rateLimitResponse = enforceRateLimit(request, {
      key: "qr-check-revocation",
      limit: 240,
      windowMs: 10 * 60_000,
    });

    if (rateLimitResponse) return rateLimitResponse;

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const challengeId = token?.qrChallengeId;

    if (!challengeId) {
      return NextResponse.json({ revoked: false, isQrSession: false });
    }

    await connectMongoDB();

    const challenge = await WebQrLoginChallenge.findOne({ challengeId }).lean();

    if (!challenge) {
      return NextResponse.json({ revoked: true, reason: "not_found" });
    }

    if (challenge.status === "revoked") {
      return NextResponse.json({ revoked: true, reason: "revoked" });
    }

    if (
      challenge.sessionExpiresAt &&
      new Date(challenge.sessionExpiresAt) < new Date()
    ) {
      return NextResponse.json({ revoked: true, reason: "expired" });
    }

    return NextResponse.json({ revoked: false, isQrSession: true });
  } catch (error) {
    return handleApiError(error, "No se pudo verificar el estado de la sesion QR");
  }
}
