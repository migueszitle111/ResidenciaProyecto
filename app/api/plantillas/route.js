// app/api/plantillas/route.js
// Proxy server-side para servir las plantillas PDF del backend Express.
// Evita CORS: el navegador solo habla con Next.js, Next.js habla con el backend.
// Uso: GET /api/plantillas?file=PLANTILLA_A_VERTICAL-1.pdf

import { NextResponse } from 'next/server';

const BACKEND_URL = (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001').replace(/\/$/, '');

// Solo caracteres seguros para nombres de archivo
const SAFE_FILENAME = /^[A-Z0-9_\-\.]+\.pdf$/i;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file || !SAFE_FILENAME.test(file)) {
    return NextResponse.json({ error: 'Nombre de archivo inválido' }, { status: 400 });
  }

  const url = `${BACKEND_URL}/plantillas/${file}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.json({ error: `Plantilla no encontrada: ${file}` }, { status: res.status });
    }
    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline',
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'No se pudo conectar al backend' }, { status: 502 });
  }
}
