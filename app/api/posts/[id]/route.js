import { connectMongoDB } from "@/lib/mongodb"; // Importa la función connectMongoDB desde lib/mongodb.js
import Post from "@/models/post"; // Importa el modelo "Post" desde models/curso.js
import { NextResponse } from "next/server"; // Importa el objeto NextResponse desde next/server.js

// Funcion para manejar las peticiones de PUT
export async function PUT(request, { params }) {
  try {
    const { id } = params; //Aqui se obtiene el id de la petición
    const { title, description, imageUrl, videoUrl } = await request.json(); //Aqui se obtiene el body de la petición
    await connectMongoDB(); // Conección a la base de datos

    // Actualiza el curso con el id proporcionado
    const updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      { title, description, imageUrl, videoUrl },
      { new: true }
    );
    return NextResponse.json({ message: "Post actualizado", updatedPost }, { status: 200 }); // Retorna la respuesta
  } catch (error) {
    console.error("Error processing PUT request:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 }); // Retorna la respuesta
  }
}

// Funcion para manejar las peticiones de GET
export async function GET(request, { params }) {
  const { id } = params; //Aqui se obtiene el id de la petición
  await connectMongoDB(); // Conección a la base de datos
  const post = await Post.findOne({ _id: id }); // Busca el curso con el id proporcionado
  return NextResponse.json({ post }, { status: 200 }); // Retorna la respuesta
}