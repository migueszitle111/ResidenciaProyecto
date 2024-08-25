// Importa mongoose y Schema de mongoose
import mongoose, { Schema, models } from "mongoose";

// Define el esquema del usuario
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    cedula: {
        type: String,
        required: true,
    },
    especialidad: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    imageUrl: {
        type: String,
        required: false,
    },
    
},
    { timestamps: true } // Registra la fecha de creación y modificación
);


const User = models.User || mongoose.model("User", userSchema);  // Define el modelo "User" si no existe o reutiliza el existente


export default User;
