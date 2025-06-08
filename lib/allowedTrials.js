// lib/allowedTrials.js

export const ALLOWED_TRIAL_EMAILS = [
  "edxTijuana@gmail.com",
  "miguelzitle111@gmail.com",
  "drjosearmandolz@gmail.com",
  "gqp1139@hotmail.com",
  "darwin1854@hotmail.com",
  "hnietor1@yahoo.com",
  "clinineurodechiapas@hotmail.com",
  "galleasneuro@outlook.com",
  "z.villarruel@hotmaul.com",
  "alex.becerril89@mac.com",
  "coyac@hotmail.com",
  "rafaelglezb@hotmail.com",
  "jrosaslima@gmail.com",
];

export function isAllowedForTrial(email) {
  if (!email) return false;
  return ALLOWED_TRIAL_EMAILS.includes(email.trim().toLowerCase());
}
