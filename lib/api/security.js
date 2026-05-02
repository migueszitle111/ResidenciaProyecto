import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

const MONGO_OPERATOR_PATTERN = /(^\$)|\./;
const RATE_LIMIT_STORE = globalThis.__medxRateLimitStore || new Map();

if (!globalThis.__medxRateLimitStore) {
  globalThis.__medxRateLimitStore = RATE_LIMIT_STORE;
}

export class ApiInputError extends Error {
  constructor(message, status = 400, details = undefined) {
    super(message);
    this.name = "ApiInputError";
    this.status = status;
    this.details = details;
  }
}

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function sanitizeDeep(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => sanitizeDeep(entry));
  }

  if (isPlainObject(value)) {
    return Object.entries(value).reduce((acc, [key, entryValue]) => {
      if (MONGO_OPERATOR_PATTERN.test(key)) {
        throw new ApiInputError(`Campo inválido: ${key}`, 400);
      }

      acc[key] = sanitizeDeep(entryValue);
      return acc;
    }, {});
  }

  if (typeof value === "string") {
    return value.trim();
  }

  return value;
}

export async function parseJsonBody(request, schema) {
  let rawBody;

  try {
    rawBody = await request.json();
  } catch {
    throw new ApiInputError("JSON inválido", 400);
  }

  const sanitizedBody = sanitizeDeep(rawBody);
  const parsed = schema.safeParse(sanitizedBody);

  if (!parsed.success) {
    const [issue] = parsed.error.issues;
    throw new ApiInputError(issue?.message || "Payload inválido", 400, parsed.error.flatten());
  }

  return parsed.data;
}

export function validateObjectId(value, fieldName = "id") {
  const normalized = typeof value === "string" ? value.trim() : "";

  if (!mongoose.Types.ObjectId.isValid(normalized)) {
    throw new ApiInputError(`${fieldName} inválido`, 400);
  }

  return normalized;
}

export function getClientIp(request) {
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

function cleanupRateLimitStore(now) {
  for (const [key, entry] of RATE_LIMIT_STORE.entries()) {
    if (entry.resetAt <= now) {
      RATE_LIMIT_STORE.delete(key);
    }
  }
}

export function consumeRateLimit(request, options = {}) {
  const {
    key = "default",
    limit = 60,
    windowMs = 60_000,
    identifier,
  } = options;

  const now = Date.now();
  cleanupRateLimitStore(now);

  const actor = identifier || getClientIp(request);
  const bucketKey = `${key}:${actor}`;
  const current = RATE_LIMIT_STORE.get(bucketKey);

  if (!current || current.resetAt <= now) {
    RATE_LIMIT_STORE.set(bucketKey, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      remaining: Math.max(limit - 1, 0),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(Math.ceil((current.resetAt - now) / 1000), 1),
    };
  }

  current.count += 1;
  RATE_LIMIT_STORE.set(bucketKey, current);

  return {
    allowed: true,
    remaining: Math.max(limit - current.count, 0),
    retryAfterSeconds: Math.max(Math.ceil((current.resetAt - now) / 1000), 1),
  };
}

export function enforceRateLimit(request, options = {}) {
  const result = consumeRateLimit(request, options);

  if (result.allowed) {
    return null;
  }

  return NextResponse.json(
    { ok: false, error: "Demasiadas solicitudes. Intenta más tarde." },
    {
      status: 429,
      headers: {
        "Retry-After": String(result.retryAfterSeconds),
      },
    }
  );
}

export async function getAuthenticatedRequestUser(request) {
  // 1. Intentar autenticación por header Bearer (app móvil)
  const authHeader = request.headers.get("authorization") || "";
  if (authHeader.startsWith("Bearer ")) {
    const mobileToken = authHeader.slice(7).trim();
    const mobileSecret = process.env.MOBILE_JWT_SECRET;
    if (mobileSecret && mobileToken) {
      try {
        const decoded = jwt.verify(mobileToken, mobileSecret);
        const email = decoded?.email;
        if (email && typeof email === "string") {
          await connectMongoDB();
          const user = await User.findOne({ email: email.toLowerCase() }).lean();
          if (user) return { token: decoded, user };
          // Usuario no encontrado en la DB — denegar
        }
      } catch {
        // token inválido o expirado — caer al flujo NextAuth
      }
    }
  }

  // 2. Autenticación por sesión NextAuth (web)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const email = token?.user?.email;
  if (!email || typeof email !== "string") {
    return null;
  }

  await connectMongoDB();

  const user = await User.findOne({ email: email.toLowerCase() }).lean();
  if (!user) {
    return null;
  }

  return { token, user };
}

export async function requireAuthenticatedUser(request) {
  const auth = await getAuthenticatedRequestUser(request);

  if (!auth) {
    return {
      error: NextResponse.json({ message: "No autenticado" }, { status: 401 }),
    };
  }

  return auth;
}

export async function requireAdminUser(request) {
  const auth = await requireAuthenticatedUser(request);

  if (auth.error) {
    return auth;
  }

  if (auth.user?.roles !== "admin") {
    return {
      error: NextResponse.json({ message: "No autorizado" }, { status: 403 }),
    };
  }

  return auth;
}

export function handleApiError(error, fallbackMessage = "Error interno del servidor") {
  if (error instanceof ApiInputError) {
    return NextResponse.json(
      {
        message: error.message,
        ...(error.details ? { details: error.details } : {}),
      },
      { status: error.status }
    );
  }

  console.error(fallbackMessage, error);
  return NextResponse.json({ message: fallbackMessage }, { status: 500 });
}
