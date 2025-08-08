// lib/allowedTrials.js

export const ALLOWED_TRIAL_EMAILS = [
  "edxtijuana@gmail.com",
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
  "samanthaggmedicina@gmail.com",
  "jairo_cervantes@hotmail.com",
  "jdiegoferreira@hotmail.com",
  "clasificacionulloa@gmail.com",
  "saikbell_kawaii@hotmail.com",
  "javan.21093@gmail.com",

];

export function isAllowedForTrial(email) {
  if (!email) return false;
  return ALLOWED_TRIAL_EMAILS.includes(email.trim().toLowerCase());
}
