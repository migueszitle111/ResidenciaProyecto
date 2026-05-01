export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  ApiInputError,
  enforceRateLimit,
  getClientIp,
  handleApiError,
  parseJsonBody,
} from "@/lib/api/security";
import { isQrLoginExpired, safeCompareQrHash } from "@/lib/api/qr-login";
import { qrLoginApproveSchema } from "@/lib/api/schemas";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
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
    headers: {
      "Content-Type": "application/json",
    },
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

export async function POST(request) {
  try {
    const rateLimitResponse = enforceRateLimit(request, {
      key: "qr-login-approve",
      limit: 30,
      windowMs: 10 * 60_000,
    });

    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const { challengeId, challengeSecret, mobileToken, deviceName } =
      await parseJsonBody(request, qrLoginApproveSchema);

    await connectMongoDB();

    const challenge = await WebQrLoginChallenge.findOne({ challengeId });

    if (
      !challenge ||
      !safeCompareQrHash(challengeSecret, challenge.challengeSecretHash)
    ) {
      return NextResponse.json(
        { ok: false, message: "QR invalido o ya no disponible" },
        { status: 404 }
      );
    }

    if (isQrLoginExpired(challenge.expiresAt)) {
      challenge.status = "expired";
      await challenge.save();

      return NextResponse.json(
        { ok: false, message: "Este QR ya expiro", status: "expired" },
        { status: 410 }
      );
    }

    if (challenge.status === "consumed") {
      return NextResponse.json(
        { ok: false, message: "Este QR ya fue utilizado", status: "consumed" },
        { status: 409 }
      );
    }

    if (challenge.status === "approved") {
      return NextResponse.json(
        { ok: false, message: "Este QR ya fue aprobado", status: "approved" },
        { status: 409 }
      );
    }

    const mobileUser = await fetchMobileUser(mobileToken);
    const email = String(mobileUser.email || "").trim().toLowerCase();

    if (!email) {
      throw new ApiInputError("No se pudo resolver el usuario movil", 401);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiInputError(
        "El usuario movil no existe en la base web compartida",
        404
      );
    }

    challenge.status = "approved";
    challenge.approvedAt = new Date();
    challenge.approvedUserId = user._id;
    challenge.approvedEmail = user.email;
    challenge.approvalIp = getClientIp(request);
    challenge.approvalUserAgent = request.headers.get("user-agent") || "";
    challenge.mobileDeviceName = deviceName || "";
    await challenge.save();

    return NextResponse.json({
      ok: true,
      status: "approved",
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return handleApiError(error, "No se pudo aprobar el login QR");
  }
}
