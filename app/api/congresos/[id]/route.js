import { connectMongoDB } from "@/lib/mongodb"; // Importa la función connectMongoDB desde lib/mongodb.js
import Congreso from "@/models/congreso"; // Importa el modelo "Congreso" desde models/congreso.js
import { NextResponse } from "next/server"; // Importa el objeto NextResponse desde next/server.js

// Funcion para manejar las peticiones de PUT
export async function PUT(request, { params }) {
  try {
    const { id } = params; //Aqui se obtiene el id de la petición
    const { title, description, imageUrl} = await request.json(); //Aqui se obtiene el body de la petición

    // Conección a la base de datos
    await connectMongoDB();

    // Actualiza el congreso con el id proporcionado
    const updatedCongreso = await Congreso.findOneAndUpdate(
      { _id: id },
      { title, description, imageUrl },
      { new: true }
    );

    // Retorna la respuesta
    return NextResponse.json({ message: "Congreso actualizado", updatedCongreso }, { status: 200 });
  } catch (error) {
    console.error("Error processing PUT request:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 });
  }
}

// Funcion para manejar las peticiones de GET
export async function GET(request, { params }) {
  const { id } = params; //Aqui se obtiene el id de la petición
  await connectMongoDB(); // Conección a la base de datos
  const congresos = await Congreso.findOne({ _id: id }); // Busca el congreso con el id proporcionado

  return NextResponse.json({ congresos }, { status: 200 }); // Retorna la respuesta
}
