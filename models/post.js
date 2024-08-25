import mongoose, {Schema} from "mongoose"; // Importa el paquete Mongoose para interactuar con MongoDB

// Define el esquema de la colección "Post"
const postSchema = new Schema({
    title: String,
    description: String,
    imageUrl: String,
    videoUrl: String,
    },
    
    {
        timestamps: true,
    }

);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema); // Define el modelo "Post" si no existe o reutiliza el existente

export default Post;