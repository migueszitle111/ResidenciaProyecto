import mongoose, {Schema} from "mongoose"; // Importa el paquete Mongoose para interactuar con MongoDB

// Define el esquema de la colección "congresos"
const CongresoSchema = new Schema({
    title: String,
    description: String,
    imageUrl: String,

    },
    
    {
        timestamps: true,
    }

);

const Congreso = mongoose.models.Congreso || mongoose.model("Congreso", CongresoSchema); // Define el modelo "Congreso" si no existe o reutiliza el existente

export default Congreso;