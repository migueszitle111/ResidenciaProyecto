import mongoose, {Schema} from "mongoose"; // Importa el paquete Mongoose para interactuar con MongoDB

// Define el esquema de la colección "temarios"
const TemarioSchema = new Schema({
    title: String,
    description: String,
    imageUrl: String,

    },
    
    {
        timestamps: true,
    }

);

const Temario = mongoose.models.Temario || mongoose.model("Temario", TemarioSchema); // Define el modelo "Temario" si no existe o reutiliza el existente

export default Temario;