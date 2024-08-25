// Importa la función connectMongoDB desde el módulo de MongoDB
import { connectMongoDB } from "@/lib/mongodb";
// Importa el modelo User para interactuar con la base de datos
import User from "@/models/user";
// Importa la clase NextResponse para manejar las respuestas HTTP en Next.js
import { NextResponse } from "next/server";

// Función que maneja la solicitud POST para buscar un usuario por su correo electrónico
export async function POST(req) {
  try {
    // Conecta a la base de datos MongoDB
    await connectMongoDB();

    // Extrae el correo electrónico de la solicitud JSON
    const { email } = await req.json();

    // Busca un usuario en la base de datos con el correo electrónico proporcionado
    const user = await User.findOne({ email }).select("_id");

    // Imprime el usuario encontrado en la consola (para fines de depuración)
    console.log("user", user);

    // Devuelve el usuario encontrado como respuesta JSON
    return NextResponse.json({ user });
  } catch (error) {
    // Maneja errores y registra el error en la consola
    console.error(error);
  }
}
