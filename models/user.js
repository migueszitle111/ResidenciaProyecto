// app/models/user.js
import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name:                { type: String },
  lastname:            { type: String },
  cedula:              { type: String },
  especialidad:        { type: String },
  email:               { type: String, unique: true },

  // Para cuentas Google no hay contraseña obligatoria
  password:            { type: String },

  roles:               { type: String, enum: ["user", "admin"], default: "user" },
  imageUrl:            { type: String },

  // Nuevo para controlar OAuth y suscripción
  provider:            { type: String, enum: ["credentials", "google"], default: "credentials" },
  subscriptionActive:  { type: Boolean, default: false },
}, {
  timestamps: true
});

// Evita recompilar el modelo si ya existe (en hot-reload de Next.js)
const User = models.User || model("User", userSchema);

export default User;
