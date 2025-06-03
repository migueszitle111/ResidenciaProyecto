// lib/allowedTrials.js

// Lista de correos que recibirán trial gratuito de 90 días.
export const ALLOWED_TRIAL_EMAILS = [
  "miguelzitle111@gmail.com",
];

export function isAllowedForTrial(email) {
  if (!email) return false;
  return ALLOWED_TRIAL_EMAILS.includes(email.toLowerCase());
}
