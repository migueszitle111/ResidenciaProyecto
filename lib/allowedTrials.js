// Lista cruda (corrigí hotmaul -> hotmail y normalicé a minúsculas donde tenía mayúsculas).
export const ALLOWED_TRIAL_EMAILS = [
  "edxtijuana@gmail.com",
  "miguelzitle111@gmail.com",
  "drjosearmandolz@gmail.com",
  "gqp1139@hotmail.com",
  "darwin1854@hotmail.com",
  "hnietor1@yahoo.com",
  "clinineurodechiapas@hotmail.com",
  "galleasneuro@outlook.com",
  "z.villarruel@hotmail.com",           // corregido
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
  "gabrielcarranco@msn.com",
  "dr.rosalesgutierrez@gmail.com",
  "karlanayelirojas@gmail.com",         // normalizado
  "gaau09@gmail.com",                   // normalizado
];

/**
 * Canoniza el correo:
 * - lower/trim
 * - gmail/googlemail: quita puntos y "+tag", y normaliza dominio a gmail.com
 */
function canonicalize(email = "") {
  email = (email || "").trim().toLowerCase();
  const parts = email.split("@");
  if (parts.length !== 2) return email;

  let [local, domain] = parts;
  if (domain === "googlemail.com") domain = "gmail.com";

  if (domain === "gmail.com") {
    local = local.split("+")[0];      // quita +tag
    local = local.replace(/\./g, ""); // quita puntos
  }
  return `${local}@${domain}`;
}

// Set interno normalizado para búsqueda O(1)
const __NORMALIZED_TRIAL_SET = new Set(ALLOWED_TRIAL_EMAILS.map(canonicalize));

export function isAllowedForTrial(email) {
  if (!email) return false;
  return __NORMALIZED_TRIAL_SET.has(canonicalize(email));
}
