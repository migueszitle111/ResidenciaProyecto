import mongoose, { Schema } from 'mongoose'; // Importa el paquete Mongoose para interactuar con MongoDB

// Define el esquema de la colección "diplomados"
const DiplomadoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pdfContent: {
      type: String,  
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Diplomado = mongoose.models.Diplomado || mongoose.model('Diplomado', DiplomadoSchema); // Define el modelo "Diplomado" si no existe o reutiliza el existente

export default Diplomado;

