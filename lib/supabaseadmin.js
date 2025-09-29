// lib/supabaseadmin.js
import 'server-only';
import { createClient } from '@supabase/supabase-js';

export const SHARE_BUCKET = process.env.SHARE_BUCKET || 'report-packages';

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
