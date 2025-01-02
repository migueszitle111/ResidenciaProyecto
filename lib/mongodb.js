// Importa el paquete Mongoose para interactuar con MongoDB
import mongoose from 'mongoose';

// Crea una función asincrónica para conectarse a la base de datos MongoDB
export const connectMongoDB = async () => {
    try {
        // Utiliza el método connect de Mongoose para conectarse a la base de datos
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
        
          });

        // Muestra un mensaje en la consola si la conexión es exitosa
        console.log("DB connected");
    } catch (error) {
        // Muestra un mensaje de error en la consola si hay algún problema en la conexión
        console.error("Error connecting to DB:", error);
    }
};
