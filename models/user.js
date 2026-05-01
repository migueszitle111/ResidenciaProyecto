// models/user.js
// Esquema sincronizado con el backend de la app móvil (colección UserInfo)
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  idprofessional: { type: String, required: true },
  specialty: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  imageUrl: { type: String },
  roles: { type: String, enum: ["user", "admin"], default: "user", index: true },
  provider: { type: String, default: "credentials" },
  stripeCustomerId: { type: String, default: null },
  stripeSubscriptionId: { type: String, default: null },
  subscriptionActive: { type: Boolean, default: false },
  trialEndsAt: { type: Date, default: null },

  appleUserId: { type: String, default: null },

  // Control de aceptación de términos
  termsAccepted: { type: Boolean, default: false },
  termsAcceptedAt: { type: Date, default: null },
  termsVersion: { type: String, default: "1.0" },

  // Control de aceptación de Disclaimer
  disclaimerAccepted: { type: Boolean, default: false },
  disclaimerAcceptedAt: { type: Date, default: null },
  disclaimerVersion: { type: String, default: "1.0" },

  // Suscripción (iOS y Android)
  subscription: {
    productId: String,
    purchaseToken: String,
    appleTransactionId: String,
    appleOriginalTransactionId: String,
    platform: { type: String, enum: ["android", "ios"], default: "android" },
    startDate: Date,
    expiryDate: Date,
    valid: Boolean,
    autoRenewing: Boolean,
    cancelReason: Number,
    paymentState: Number,
    environment: String,
    ultimaVerificacionDate: Date,
  },

  // Campos para restablecimiento de contraseña (usados solo en web)
  passwordResetToken: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null },
}, {
  collection: "UserInfo",
  timestamps: true,
});

const User = models.UserInfo || model("UserInfo", userSchema);
export default User;
