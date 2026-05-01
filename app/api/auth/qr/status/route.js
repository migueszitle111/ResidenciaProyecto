export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  enforceRateLimit,
  handleApiError,
  ApiInputError,
} from "@/lib/api/security";
import {
  isQrLoginExpired,
  maskEmail,
  safeCompareQrHash,
} from "@/lib/api/qr-login";
import { qrLoginStatusSchema } from "@/lib/api/schemas";
import { connectMongoDB } from "@/lib/mongodb";
import WebQrLoginChallenge from "@/models/webQrLoginChallenge";

export async function GET(request) {
  try {
    const rateLimitResponse = enforceRateLimit(request, {
      key: "qr-login-status",
      limit: 180,
      windowMs: 10 * 60_000,
    });

    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const parsedQuery = qrLoginStatusSchema.safeParse({
      challengeId: request.nextUrl.searchParams.get("challengeId") || "",
      browserCode: request.nextUrl.searchParams.get("browserCode") || "",
    });

    if (!parsedQuery.success) {
      throw new ApiInputError("Parametros QR invalidos", 400);
    }

    const { challengeId, browserCode } = parsedQuery.data;

    await connectMongoDB();

    const challenge = await WebQrLoginChallenge.findOne({ challengeId }).lean();

    if (!challenge || !safeCompareQrHash(browserCode, challenge.browserCodeHash)) {
      return NextResponse.json(
        { ok: false, status: "not_found" },
        { status: 404 }
      );
    }

    if (isQrLoginExpired(challenge.expiresAt)) {
      if (challenge.status === "pending") {
        await WebQrLoginChallenge.updateOne(
          { _id: challenge._id, status: "pending" },
          { $set: { status: "expired" } }
        );
      }

      return NextResponse.json(
        {
          ok: false,
          status: "expired",
          expiresAt: new Date(challenge.expiresAt).toISOString(),
        },
        { status: 410 }
      );
    }

    return NextResponse.json({
      ok: true,
      status: challenge.status,
      expiresAt: new Date(challenge.expiresAt).toISOString(),
      approvedEmail: challenge.approvedEmail
        ? maskEmail(challenge.approvedEmail)
        : "",
    });
  } catch (error) {
    return handleApiError(error, "No se pudo consultar el estado del QR");
  }
}
