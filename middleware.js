import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Verifica un JWT HS256 usando Web Crypto API (compatible con Edge Runtime)
async function verifyMobileJwt(token, secret) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const data = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
    const sigBytes = Uint8Array.from(
      atob(parts[2].replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0)
    );

    const valid = await crypto.subtle.verify("HMAC", key, sigBytes, data);
    if (!valid) return null;

    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

    // Verificar expiración si existe
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}

const protectedPageRoutes = [
  "/Perfil",
  "/Educacion",
  "/Reporte",
  "/Tecnicas",
  "/Monitoreo",
];

const authenticatedApiPrefixes = [
  "/api/updateProfile",
  "/api/share/init",
  "/api/share/complete",
  "/api/share/purge",
  "/api/share/upload",
  "/api/share/signed-upload",
  "/api/monitoreo/upload",
  "/api/monitoreopdf",
  "/api/pdf/generate-pdf",
];

const adminApiPrefixes = [
  "/api/temarios",
  "/api/share/_debug",
];

const RATE_LIMIT_STORE = globalThis.__medxMiddlewareRateLimitStore || new Map();

if (!globalThis.__medxMiddlewareRateLimitStore) {
  globalThis.__medxMiddlewareRateLimitStore = RATE_LIMIT_STORE;
}

function matchesPrefix(pathname, prefix) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function applySecurityHeaders(response) {
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

function jsonError(message, status, extraHeaders = {}) {
  return applySecurityHeaders(
    NextResponse.json(
      { message },
      {
        status,
        headers: extraHeaders,
      }
    )
  );
}

function cleanupRateLimitStore(now) {
  for (const [key, value] of RATE_LIMIT_STORE.entries()) {
    if (value.resetAt <= now) {
      RATE_LIMIT_STORE.delete(key);
    }
  }
}

function getRateLimitRule(pathname, method) {
  if (pathname === "/api/register" && method === "POST") {
    return { key: "register", limit: 5, windowMs: 15 * 60_000, by: "ip" };
  }

  if (pathname === "/api/assets/upload" && method === "POST") {
    return { key: "assets-upload", limit: 10, windowMs: 10 * 60_000, by: "ip" };
  }

  if (pathname === "/api/auth/forgot-password" && method === "POST") {
    return { key: "forgot-password", limit: 5, windowMs: 15 * 60_000, by: "ip" };
  }

  if (pathname === "/api/auth/reset-password" && method === "POST") {
    return { key: "reset-password", limit: 8, windowMs: 15 * 60_000, by: "ip" };
  }

  if (pathname === "/api/auth/callback/credentials" && method === "POST") {
    return { key: "credentials-login", limit: 10, windowMs: 15 * 60_000, by: "ip" };
  }

  if (pathname === "/api/auth/callback/qr-web" && method === "POST") {
    return { key: "qr-web-login", limit: 20, windowMs: 15 * 60_000, by: "ip" };
  }

  if (pathname === "/api/auth/qr/init" && method === "POST") {
    return { key: "qr-login-init", limit: 20, windowMs: 10 * 60_000, by: "ip" };
  }

  if (pathname === "/api/auth/qr/status" && method === "GET") {
    return { key: "qr-login-status", limit: 180, windowMs: 10 * 60_000, by: "ip" };
  }

  if (pathname === "/api/auth/qr/approve" && method === "POST") {
    return { key: "qr-login-approve", limit: 30, windowMs: 10 * 60_000, by: "ip" };
  }

  if (pathname === "/api/auth/qr/session-status" && method === "GET") {
    return { key: "qr-session-status", limit: 120, windowMs: 10 * 60_000, by: "ip" };
  }

  if (pathname === "/api/auth/qr/revoke" && method === "POST") {
    return { key: "qr-revoke", limit: 20, windowMs: 10 * 60_000, by: "ip" };
  }

  if (pathname === "/api/auth/qr/check-revocation" && method === "GET") {
    return { key: "qr-check-revocation", limit: 240, windowMs: 10 * 60_000, by: "ip" };
  }

  if (matchesPrefix(pathname, "/api/pdf/generate-pdf") && method === "POST") {
    return { key: "generate-pdf", limit: 40, windowMs: 10 * 60_000, by: "user" };
  }

  if (matchesPrefix(pathname, "/api/share/signed") && method === "GET") {
    return { key: "share-signed", limit: 300, windowMs: 10 * 60_000, by: "ip" };
  }

  if (matchesPrefix(pathname, "/api/share") && pathname !== "/api/share/signed" && method !== "GET") {
    return { key: "share-write", limit: 60, windowMs: 10 * 60_000, by: "user" };
  }

  if (pathname === "/api/share/_debug" && method === "GET") {
    return { key: "share-debug", limit: 20, windowMs: 10 * 60_000, by: "user" };
  }

  if (pathname === "/api/monitoreo/upload" && method === "POST") {
    return { key: "monitoreo-upload", limit: 30, windowMs: 10 * 60_000, by: "user" };
  }

  if (pathname === "/api/monitoreopdf" && method === "GET") {
    return { key: "monitoreopdf", limit: 120, windowMs: 10 * 60_000, by: "user" };
  }

  if (pathname === "/api/plantillas" && method === "GET") {
    return { key: "plantillas", limit: 120, windowMs: 10 * 60_000, by: "ip" };
  }

  if (pathname === "/api/updateProfile" && method === "PUT") {
    return { key: "update-profile", limit: 20, windowMs: 10 * 60_000, by: "user" };
  }

  if (matchesPrefix(pathname, "/api/temarios") && method !== "GET") {
    return { key: "temarios-mutation", limit: 60, windowMs: 10 * 60_000, by: "user" };
  }

  if (pathname === "/api/stripe/verify" && method === "GET") {
    return { key: "stripe-verify", limit: 30, windowMs: 15 * 60_000, by: "ip" };
  }

  return null;
}

function enforceRateLimit(request, rule, token) {
  if (!rule) {
    return null;
  }

  const actor =
    rule.by === "user"
      ? token?.user?.email || getClientIp(request)
      : getClientIp(request);

  const now = Date.now();
  cleanupRateLimitStore(now);

  const bucketKey = `${rule.key}:${actor}`;
  const current = RATE_LIMIT_STORE.get(bucketKey);

  if (!current || current.resetAt <= now) {
    RATE_LIMIT_STORE.set(bucketKey, {
      count: 1,
      resetAt: now + rule.windowMs,
    });
    return null;
  }

  if (current.count >= rule.limit) {
    const retryAfter = Math.max(Math.ceil((current.resetAt - now) / 1000), 1);
    return jsonError(
      "Demasiadas solicitudes. Intenta mas tarde.",
      429,
      { "Retry-After": String(retryAfter) }
    );
  }

  current.count += 1;
  RATE_LIMIT_STORE.set(bucketKey, current);
  return null;
}

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const method = request.method.toUpperCase();
  const isApiRoute = pathname.startsWith("/api/");

  if (pathname === "/blank") {
    const url = request.nextUrl.clone();
    url.pathname = "/api/blank";
    return applySecurityHeaders(NextResponse.rewrite(url));
  }

  const needsToken =
    pathname === "/Login" ||
    protectedPageRoutes.some((route) => pathname.startsWith(route)) ||
    authenticatedApiPrefixes.some((prefix) => matchesPrefix(pathname, prefix)) ||
    adminApiPrefixes.some((prefix) => matchesPrefix(pathname, prefix)) ||
    matchesPrefix(pathname, "/api/pdf/generate-pdf") ||
    getRateLimitRule(pathname, method)?.by === "user";

  // Verificar Bearer token de la app móvil
  let mobileTokenValid = false;
  let mobileEmail = null;
  const authHeader = request.headers.get("authorization") || "";
  if (needsToken && authHeader.startsWith("Bearer ")) {
    const mobileSecret = process.env.MOBILE_JWT_SECRET;
    if (mobileSecret) {
      const decoded = await verifyMobileJwt(authHeader.slice(7).trim(), mobileSecret);
      if (decoded?.email) {
        mobileTokenValid = true;
        mobileEmail = decoded.email;
      }
    }
  }

  const token = needsToken && !mobileTokenValid
    ? await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      })
    : null;

  // Para rate limiting por usuario, sintetizar token mínimo desde Bearer móvil
  const effectiveToken = token ?? (mobileEmail ? { user: { email: mobileEmail } } : null);

  const rateLimitResponse = enforceRateLimit(
    request,
    getRateLimitRule(pathname, method),
    effectiveToken
  );
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  if (pathname === "/Login" && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return applySecurityHeaders(NextResponse.redirect(url));
  }

  if (protectedPageRoutes.some((route) => pathname.startsWith(route)) && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return applySecurityHeaders(NextResponse.redirect(url));
  }

  if (
    isApiRoute &&
    authenticatedApiPrefixes.some((prefix) => matchesPrefix(pathname, prefix)) &&
    !token && !mobileTokenValid
  ) {
    return jsonError("No autenticado", 401);
  }

  if (
    isApiRoute &&
    adminApiPrefixes.some((prefix) => matchesPrefix(pathname, prefix)) &&
    (pathname === "/api/share/_debug" || method !== "GET")
  ) {
    if (!token && !mobileTokenValid) {
      return jsonError("No autenticado", 401);
    }

    if (!mobileTokenValid && token?.user?.roles !== "admin") {
      return jsonError("No autorizado", 403);
    }
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/blank",
    "/Login",
    "/Perfil/:path*",
    "/Educacion/:path*",
    "/Reporte/:path*",
    "/Tecnicas/:path*",
    "/Monitoreo/:path*",
    "/api/:path*",
  ],
};
