export const ALLOWED_STORAGE_BUCKETS = new Set([
  "monitoreo-packages",
  "report-packages",
  "reportesnormales-packages",
]);

export const DEFAULT_STORAGE_BUCKET =
  process.env.DEFAULT_STORAGE_BUCKET || "monitoreo-packages";
export const PUBLIC_ASSETS_BUCKET =
  process.env.PUBLIC_ASSETS_BUCKET || "assets";
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

export function safeToken(value) {
  return (value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w.\-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "") || `archivo_${Date.now()}`;
}

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/csv",
  "application/octet-stream",
]);

export function isAllowedUploadMimeType(value) {
  // MIME vacío o desconocido: el browser a veces no lo detecta (docx, archivos raros)
  // Se permite y el servidor asigna application/octet-stream
  if (!value || typeof value !== "string" || value.trim() === "") {
    return true;
  }
  if (value.startsWith("image/") || value.startsWith("video/") || value.startsWith("audio/")) {
    return true;
  }
  return ALLOWED_MIME_TYPES.has(value);
}

export function isValidStoragePath(value) {
  if (!value || typeof value !== "string") {
    return false;
  }

  const normalized = value.trim().replace(/\\/g, "/");

  if (
    !normalized ||
    normalized.startsWith("/") ||
    normalized.includes("..") ||
    normalized.includes("//")
  ) {
    return false;
  }

  const [bucket, ...pathParts] = normalized.split("/");
  if (!ALLOWED_STORAGE_BUCKETS.has(bucket) || !pathParts.length) {
    return false;
  }

  const relativePath = pathParts.join("/");
  return /^[A-Za-z0-9._\-\/ ]+$/.test(relativePath);
}
