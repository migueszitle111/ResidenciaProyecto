export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  enforceRateLimit,
  getClientIp,
  handleApiError,
} from "@/lib/api/security";
import {
  buildQrLoginPayload,
  createQrLoginChallenge,
  hashQrLoginValue,
  QR_LOGIN_POLL_MS,
} from "@/lib/api/qr-login";
import { connectMongoDB } from "@/lib/mongodb";
import WebQrLoginChallenge from "@/models/webQrLoginChallenge";

export async function POST(request) {
  try {
    const rateLimitResponse = enforceRateLimit(request, {
      key: "qr-login-init",
      limit: 20,
      windowMs: 10 * 60_000,
    });

    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    await connectMongoDB();

    const { challengeId, challengeSecret, browserCode, expiresAt } =
      createQrLoginChallenge();

    await WebQrLoginChallenge.create({
      challengeId,
      challengeSecretHash: hashQrLoginValue(challengeSecret),
      browserCodeHash: hashQrLoginValue(browserCode),
      expiresAt,
      requestIp: getClientIp(request),
      requestUserAgent: request.headers.get("user-agent") || "",
    });

    return NextResponse.json({
      ok: true,
      challengeId,
      browserCode,
      expiresAt: expiresAt.toISOString(),
      pollAfterMs: QR_LOGIN_POLL_MS,
      qrValue: buildQrLoginPayload({
        origin: request.nextUrl.origin,
        challengeId,
        challengeSecret,
      }),
    });
  } catch (error) {
    return handleApiError(error, "No se pudo iniciar el login QR");
  }
}
