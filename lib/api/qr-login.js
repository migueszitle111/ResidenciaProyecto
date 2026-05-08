import crypto from "crypto";
import { nanoid } from "nanoid";

export const QR_LOGIN_TTL_MS = 2 * 60 * 1000;
export const QR_LOGIN_POLL_MS = 2500;
export const WEB_SESSION_TTL_MS = 20 * 60 * 1000;

export function createQrLoginChallenge() {
  return {
    challengeId: nanoid(24),
    challengeSecret: crypto.randomBytes(32).toString("hex"),
    browserCode: crypto.randomBytes(32).toString("hex"),
    expiresAt: new Date(Date.now() + QR_LOGIN_TTL_MS),
  };
}

export function hashQrLoginValue(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function safeCompareQrHash(rawValue, hashedValue) {
  const rawHash = hashQrLoginValue(rawValue);

  try {
    return crypto.timingSafeEqual(
      Buffer.from(rawHash, "hex"),
      Buffer.from(hashedValue, "hex")
    );
  } catch {
    return false;
  }
}

export function isQrLoginExpired(expiresAt) {
  return !expiresAt || new Date(expiresAt).getTime() <= Date.now();
}

export function buildQrLoginPayload({ origin, challengeId, challengeSecret }) {
  const baseOrigin = String(origin || "").replace(/\/+$/, "");
  const url = new URL("medxpro://web-login");
  url.searchParams.set("challengeId", challengeId);
  url.searchParams.set("challengeSecret", challengeSecret);
  url.searchParams.set("origin", baseOrigin);
  return url.toString();
}

export function maskEmail(email) {
  const normalized = typeof email === "string" ? email.trim().toLowerCase() : "";
  const [name = "", domain = ""] = normalized.split("@");

  if (!name || !domain) {
    return "";
  }

  if (name.length <= 2) {
    return `${name[0] || "*"}*@${domain}`;
  }

  return `${name.slice(0, 2)}***@${domain}`;
}
