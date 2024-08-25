import { connectMongoDB } from "@/lib/mongodb"; // Importa la función connectMongoDB desde lib/mongodb.js
import Post from "@/models/post"; // Importa el modelo "Post" desde models/post.js
import { NextResponse } from "next/server";  // Importa el objeto NextResponse desde next/server.js


// Funcion para manejar las peticiones de POST
export async function POST(request) {
  try {
    const { title, description, imageUrl, videoUrl } = await request.json(); //Aqui se obtiene el body de la petición
    await connectMongoDB(); // Conexión a la base de datos
    await Post.create({ title, description, imageUrl, videoUrl }); // Crea un nuevo post
    return NextResponse.json({ message: "Curso created successfully" }, { status: 201 }); // Retorna la respuesta
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 }); // Retorna la respuesta
  }
}

// Funcion para manejar las peticiones de GET
export async function GET() {
  try {
    await connectMongoDB(); // Conección a la base de datos
    const posts = await Post.find(); // Busca todos los posts
    return NextResponse.json({ posts }, { status: 200}); // Retorna la respuesta
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
    await Post.findByIdAndDelete(id); // Elimina el post con el id proporcionado
    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 }); // Retorna la respuesta
  } catch (error) {
    console.error("Error processing DELETE request:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 }); // Retorna la respuesta
  }
}