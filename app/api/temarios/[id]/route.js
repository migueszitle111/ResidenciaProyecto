import { connectMongoDB } from "@/lib/mongodb"; // Importa la función connectMongoDB desde lib/mongodb.js
import Temario from "@/models/temario"; // Importa el modelo "Temario" desde models/temario.js
import { NextResponse } from "next/server"; // Importa el objeto NextResponse desde next/server.js

// Funcion para manejar las peticiones de PUT
export async function PUT(request, { params }) {
  try {
    const { id } = params; //Aqui se obtiene el id de la petición
    const { title, description, imageUrl } = await request.json(); //Aqui se obtiene el body de la petición
    await connectMongoDB(); // Conección a la base de datos

    // Actualiza el temario con el id proporcionado
    const updatedTemario = await Temario.findOneAndUpdate(
      { _id: id },
      { title, description, imageUrl },
      { new: true }
    );

    return NextResponse.json({ message: "Temario actualizado", updatedTemario }, { status: 200 }); // Retorna la respuesta
  } catch (error) {
    console.error("Error processing PUT request:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 }); // Retorna la respuesta
  }
}

// Funcion para manejar las peticiones de GET
export async function GET(request, { params }) {
  const { id } = params; //Aqui se obtiene el id de la petición
  await connectMongoDB(); // Conección a la base de datos
  const temarios = await Temario.findOne({ _id: id }); // Busca el temario con el id proporcionado
  return NextResponse.json({ temarios }, { status: 200 }); // Retorna la respuesta
}
