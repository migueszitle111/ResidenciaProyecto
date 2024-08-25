import { connectMongoDB } from "@/lib/mongodb"; // Importa la función connectMongoDB desde lib/mongodb.js
import Temario from "@/models/temario"; // Importa el modelo "Temario" desde models/temario.js
import { NextResponse } from "next/server"; // Importa el objeto NextResponse desde next/server.js


// Funcion para manejar las peticiones de POST
export async function POST(request) {
  try {
    const { title, description, imageUrl } = await request.json(); //Aqui se obtiene el body de la petición
    await connectMongoDB(); // Conección a la base de datos
    await Temario.create({ title, description, imageUrl }); // Crea un nuevo temario 
    return NextResponse.json({ message: "Topic created successfully" }, { status: 201 }); // Retorna la respuesta
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 }); // Retorna la respuesta
  }
}

// Funcion para manejar las peticiones de GET
export async function GET() {
  try {
    await connectMongoDB(); // Conección a la base de datos
    const temarios = await Temario.find(); // Busca todos los temarios
    return NextResponse.json({ temarios }, { status: 200}); // Retorna la respuesta
  } catch (error) {
    console.error("Error processing GET request:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 }); // Retorna la respuesta
  }
}

// Funcion para manejar las peticiones de DELETE
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id"); //Aqui se obtiene el id de la petición
    await connectMongoDB(); // Conección a la base de datos
    await Temario.findByIdAndDelete(id); // Elimina el temario con el id proporcionado
    return NextResponse.json({ message: "Topic deleted successfully" }, { status: 200 }); // Retorna la respuesta
  } catch (error) {
    console.error("Error processing DELETE request:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 }); // Retorna la respuesta
  }
}
