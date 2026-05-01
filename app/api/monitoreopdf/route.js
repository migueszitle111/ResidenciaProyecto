// app/api/monitoreopdf/route.js
// Proxy server-side que sirve recursos del backend Express al navegador.
// Evita CORS: el navegador solo habla con Next.js, Next.js habla con el backend.

import { NextResponse } from "next/server";

const BACKEND_URL = (
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5001"
).replace(/\/$/, "");

const ALLOWED_PREFIXES = ["/monitoreopdfs/", "/plantillasmonitoreo/"];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pdfPath = searchParams.get("path");
  const plantilla = searchParams.get("plantilla");

  let backendPath;

  if (plantilla) {
    const safeName = plantilla.replace(/[^a-zA-Z0-9_.\- ]/g, "");
    backendPath = `/plantillasmonitoreo/${safeName}`;
  } else if (pdfPath) {
    if (pdfPath.includes("..") || pdfPath.includes("\\")) {
      return NextResponse.json({ error: "ruta inválida" }, { status: 400 });
    }

    const normalized = pdfPath.startsWith("/monitoreopdfs/")
      ? pdfPath
      : `/monitoreopdfs${pdfPath.startsWith("/") ? pdfPath : `/${pdfPath}`}`;

    backendPath = normalized;
  } else {
    return NextResponse.json(
      { error: "Parámetro path o plantilla requerido" },
      { status: 400 }
    );
  }

  const allowed = ALLOWED_PREFIXES.some((prefix) => backendPath.startsWith(prefix));
  if (!allowed) {
    return NextResponse.json({ error: "ruta no permitida" }, { status: 403 });
  }

  const url = `${BACKEND_URL}${backendPath}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Recurso no encontrado: ${backendPath}` },
        { status: res.status }
      );
    }

    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar al backend" },
      { status: 502 }
    );
  }
}
