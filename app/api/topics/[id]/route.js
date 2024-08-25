import { connectMongoDB } from "@/lib/mongodb"; // Importa la función connectMongoDB desde lib/mongodb.js
import Topic from "@/models/topic"; // Importa el modelo "Topic" desde models/topic.js
import { NextResponse } from "next/server"; // Importa el objeto NextResponse desde next/server.js

// Funcion para manejar las peticiones de PUT
export async function PUT(request, { params }) {
  try {
    const { id } = params; //Aqui se obtiene el id de la petición
    const { title, description,imageUrl  } = await request.json(); //Aqui se obtiene el body de la petición
    await connectMongoDB(); // Conección a la base de datos

    // Actualiza el topic con el id proporcionado
    const updatedTopic = await Topic.findOneAndUpdate(
      { _id: id },
      { title, description, imageUrl },
      { new: true }
    );

    return NextResponse.json({ message: "Topic updated successfully", updatedTopic }, { status: 200 }); // Retorna la respuesta
  } catch (error) {
    console.error("Error processing PUT request:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 }); // Retorna la respuesta
  }
}

// Funcion para manejar las peticiones de GET
export async function GET(request, { params }) {
  const { id } = params; //Aqui se obtiene el id de la petición
  await connectMongoDB(); // Conección a la base de datos
  const topic = await Topic.findOne({ _id: id });  // Busca el topic con el id proporcionado
  return NextResponse.json({ topic }, { status: 200 }); // Retorna la respuesta
}
