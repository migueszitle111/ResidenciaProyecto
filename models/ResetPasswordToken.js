// Importa mongoose
import mongoose, {Schema} from "mongoose";

// Crea un esquema para el modelo ResetPasswordToken
const resetPasswordTokenSchema = new Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' } // Token expira después de 1 hora
});

const resetPasswordToken = mongoose.models.ResetPasswordToken || mongoose.model('ResetPasswordToken', resetPasswordTokenSchema);


// Exporta el esquema, no el modelo compilado
export default resetPasswordToken;
