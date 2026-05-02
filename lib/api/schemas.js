import { z } from "zod";

const assetUrlSchema = z
  .string()
  .trim()
  .max(2048, "URL demasiado larga")
  .refine(
    (value) => value === "" || /^https?:\/\//i.test(value) || value.startsWith("/"),
    "URL inválida"
  );

const titleSchema = z.string().trim().min(1, "El título es requerido").max(200, "El título es demasiado largo");
const descriptionSchema = z.string().trim().max(50_000, "La descripción es demasiado larga");
const videoUrlSchema = z
  .string()
  .trim()
  .max(2048, "URL de video demasiado larga")
  .refine(
    (value) => value === "" || /^https?:\/\//i.test(value) || value.startsWith("/"),
    "URL de video inválida"
  );

function requireAtLeastOneField(data) {
  return Object.values(data).some((value) => value !== undefined);
}

export const topicCreateSchema = z.object({
  title: titleSchema,
  description: descriptionSchema.optional().default(""),
  imageUrl: assetUrlSchema.optional().default(""),
}).strict();

export const topicUpdateSchema = z.object({
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  imageUrl: assetUrlSchema.optional(),
}).strict().refine(requireAtLeastOneField, {
  message: "Debes enviar al menos un campo para actualizar",
});

export const temarioCreateSchema = topicCreateSchema;
export const temarioUpdateSchema = topicUpdateSchema;
export const cursoCreateSchema = topicCreateSchema;
export const cursoUpdateSchema = topicUpdateSchema;
export const congresoCreateSchema = topicCreateSchema;
export const congresoUpdateSchema = topicUpdateSchema;

export const postCreateSchema = z.object({
  title: titleSchema,
  description: descriptionSchema.optional().default(""),
  imageUrl: assetUrlSchema.optional().default(""),
  videoUrl: videoUrlSchema.optional().default(""),
}).strict();

export const postUpdateSchema = z.object({
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  imageUrl: assetUrlSchema.optional(),
  videoUrl: videoUrlSchema.optional(),
}).strict().refine(requireAtLeastOneField, {
  message: "Debes enviar al menos un campo para actualizar",
});

export const diplomadoCreateSchema = z.object({
  title: titleSchema,
  pdfContent: z
    .string()
    .trim()
    .min(1, "El PDF es requerido")
    .max(20_000_000, "El PDF es demasiado grande"),
}).strict();

export const registerSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido").max(120, "El nombre es demasiado largo"),
  lastname: z.string().trim().min(1, "El apellido es requerido").max(120, "El apellido es demasiado largo"),
  idprofessional: z.string().trim().min(1, "La cédula profesional es requerida").max(80, "La cédula profesional es demasiado larga"),
  specialty: z.string().trim().min(1, "La especialidad es requerida").max(120, "La especialidad es demasiado larga"),
  email: z.string().trim().email("Correo inválido").max(254, "Correo demasiado largo").transform((value) => value.toLowerCase()),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(128, "La contraseña es demasiado larga"),
  imageUrl: assetUrlSchema.optional().default(""),
}).strict();

export const credentialsSchema = z.object({
  email: z.string().trim().email("Correo inválido").max(254, "Correo demasiado largo").transform((value) => value.toLowerCase()),
  password: z.string().min(1, "La contraseña es requerida").max(128, "La contraseña es demasiado larga"),
}).strict();

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Correo inválido").max(254, "Correo demasiado largo").transform((value) => value.toLowerCase()),
}).strict();

export const resetPasswordSchema = z.object({
  token: z.string().trim().regex(/^[a-f0-9]{64}$/i, "Token inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(128, "La contraseña es demasiado larga"),
}).strict();

export const updateProfileSchema = z.object({
  userId: z.string().trim().min(1, "userId es requerido"),
  name: z.string().trim().min(1, "Nombre inválido").max(120, "Nombre demasiado largo").optional(),
  lastname: z.string().trim().min(1, "Apellido inválido").max(120, "Apellido demasiado largo").optional(),
  idprofessional: z.string().trim().min(1, "Cédula profesional inválida").max(80, "Cédula profesional demasiado larga").optional(),
  specialty: z.string().trim().min(1, "Especialidad inválida").max(120, "Especialidad demasiado larga").optional(),
  email: z.string().trim().email("Correo inválido").max(254, "Correo demasiado largo").transform((value) => value.toLowerCase()).optional(),
  password: z.string().min(1, "La contraseña actual es requerida").max(128, "La contraseña actual es demasiado larga").optional(),
  newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres").max(128, "La nueva contraseña es demasiado larga").optional(),
  imageUrl: assetUrlSchema.optional(),
}).strict().refine(
  (data) => {
    const hasUpdateField = [
      data.name,
      data.lastname,
      data.idprofessional,
      data.specialty,
      data.email,
      data.imageUrl,
      data.newPassword,
    ].some((value) => value !== undefined);

    return hasUpdateField;
  },
  { message: "Debes enviar al menos un campo para actualizar" }
).refine(
  (data) => (data.newPassword ? Boolean(data.password) : true),
  { message: "Debes enviar la contraseña actual para cambiar la contraseña", path: ["password"] }
);

export const shareInitSchema = z.object({
  title: z.string().trim().max(140, "El título es demasiado largo").optional().default(""),
  message: z.string().trim().max(2_000, "El mensaje es demasiado largo").optional().default(""),
  expiresInSeconds: z.coerce.number().int().min(0).max(60 * 60 * 24 * 30, "La expiración máxima es de 30 días").optional().default(0),
  patient: z.string().trim().max(160, "El nombre del paciente es demasiado largo").nullable().optional(),
  doctor: z.string().trim().max(160, "El nombre del médico es demasiado largo").nullable().optional(),
  studyType: z.string().trim().max(120, "El tipo de estudio es demasiado largo").nullable().optional(),
  doctorLogo: assetUrlSchema.nullable().optional(),
  meta: z.record(z.string(), z.any()).optional(),
}).strict();

export const shareCompleteSchema = z.object({
  linkId: z.string().trim().uuid("linkId inválido"),
  files: z.array(
    z.object({
      name: z.string().trim().min(1, "El nombre del archivo es requerido").max(255, "El nombre del archivo es demasiado largo"),
      mime_type: z.string().trim().min(1, "El tipo MIME es requerido").max(120, "El tipo MIME es demasiado largo"),
      size_bytes: z.coerce.number().int().min(0, "El tamaño del archivo es inválido").max(50_000_000, "El archivo es demasiado grande").nullable().optional(),
      storage_path: z.string().trim().min(1, "La ruta de almacenamiento es requerida").max(1024, "La ruta es demasiado larga"),
    }).strict()
  ).min(1, "Debes incluir al menos un archivo").max(20, "Demasiados archivos"),
}).strict();

export const sharePurgeSchema = z.object({
  slug: z.string().trim().regex(/^[A-Za-z0-9_-]{8,64}$/, "Slug inválido"),
}).strict();

export const signedUploadSchema = z.object({
  path: z.string().trim().min(1, "La ruta es requerida").max(1024, "La ruta es demasiado larga"),
  upsert: z.boolean().optional().default(false),
}).strict();

const qrChallengeIdSchema = z
  .string()
  .trim()
  .regex(/^[A-Za-z0-9_-]{16,64}$/, "challengeId invalido");

const qrSecretSchema = z
  .string()
  .trim()
  .regex(/^[a-f0-9]{64}$/i, "Secreto QR invalido");

export const qrLoginStatusSchema = z.object({
  challengeId: qrChallengeIdSchema,
  browserCode: qrSecretSchema,
}).strict();

export const qrLoginCompleteSchema = qrLoginStatusSchema;

export const qrLoginApproveSchema = z.object({
  challengeId: qrChallengeIdSchema,
  challengeSecret: qrSecretSchema,
  mobileToken: z.string().trim().min(20, "Token movil invalido").max(5000, "Token movil demasiado largo"),
  deviceName: z.string().trim().max(120, "Nombre de dispositivo demasiado largo").optional().default(""),
}).strict();
