import { customAlphabet } from 'nanoid';

export const nanoid8 = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 8);

export function sanitizeFileName(name = '') {
  return name
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s.-]/gu, '')
    .trim().replace(/\s+/g, '_');
}

export function addInterval(baseDate, expiry) {
  if (expiry === 'unlimited') return null;
  const addMs = expiry === '24h' ? 24*3600*1000 : 5*24*3600*1000;
  return new Date(baseDate.getTime() + addMs);
}
