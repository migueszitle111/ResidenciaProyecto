import mongoose, {Schema} from "mongoose"; // Importa el paquete Mongoose para interactuar con MongoDB

// Define el esquema de la colección "cursos"
const CursoSchema = new Schema({
    title: String,
    description: String,
    imageUrl: String,

    },
    
    {
        timestamps: true,
    }

);

const Curso = mongoose.models.Curso || mongoose.model("Curso", CursoSchema); // Define el modelo "Curso" si no existe o reutiliza el existente

export default Curso;