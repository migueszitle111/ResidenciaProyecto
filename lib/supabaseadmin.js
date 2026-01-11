// lib/supabaseadmin.js
import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Bucket por defecto (para reportes diagnósticos)
export const SHARE_BUCKET = process.env.SHARE_BUCKET || 'report-packages';

// Función para detectar el bucket según la ruta del archivo
// Soporta tanto 'report-packages' como 'monitoreo-packages'
export function getBucketFromPath(storagePath) {
  if (!storagePath) return SHARE_BUCKET;

  // Si la ruta empieza con el nombre del bucket, extráelo
  const segments = storagePath.split('/');
  const firstSegment = segments[0];

  // Lista de buckets válidos
  const validBuckets = ['report-packages', 'monitoreo-packages', 'reportesnormales-packages'];

  if (validBuckets.includes(firstSegment)) {
    return firstSegment;
  }

  // Si no se detecta, usa el bucket por defecto
  return SHARE_BUCKET;
}

// Función para extraer la ruta relativa sin el bucket
// Convierte 'monitoreo-packages/paciente/archivo.pdf' -> 'paciente/archivo.pdf'
export function getPathWithoutBucket(storagePath) {
  if (!storagePath) return storagePath;

  const segments = storagePath.split('/');
  const firstSegment = segments[0];

  // Lista de buckets válidos
  const validBuckets = ['report-packages', 'monitoreo-packages', 'reportesnormales-packages'];

  // Si el primer segmento es un bucket, quítalo
  if (validBuckets.includes(firstSegment)) {
    return segments.slice(1).join('/');
  }

  // Si no hay bucket en la ruta, retorna la ruta original
  return storagePath;
}

let _adminClient = null;

export function getSupabaseAdmin() {
  if (_adminClient) return _adminClient;

  // Usa SUPABASE_URL si existe; si no, cae en NEXT_PUBLIC_SUPABASE_URL
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error('Missing env: SUPABASE_URL o NEXT_PUBLIC_SUPABASE_URL');
  if (!key) throw new Error('Missing env: SUPABASE_SERVICE_ROLE_KEY');

  _adminClient = createClient(url, key, { auth: { persistSession: false } });
  return _adminClient;
}
