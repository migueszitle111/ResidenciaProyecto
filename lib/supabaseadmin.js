import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE,
  { auth: { persistSession: false } }
);

export const SHARE_BUCKET = process.env.SHARE_BUCKET || 'report-packages';
export const SHARE_BASE_URL = process.env.SHARE_BASE_URL || '';
