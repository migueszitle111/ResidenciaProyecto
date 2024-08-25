import mongoose, {Schema} from "mongoose"; // Importa el paquete Mongoose para interactuar con MongoDB

// Define el esquema de la colección "topics"
const TopicSchema = new Schema({
    title: String,
    description: String,
    imageUrl: String,

    },
    
    {
        timestamps: true,
    }

);

const Topic = mongoose.models.Topic || mongoose.model("Topic", TopicSchema); // Define el modelo "Topic" si no existe o reutiliza el existente

export default Topic;