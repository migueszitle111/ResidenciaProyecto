// Importa la función connectMongoDB desde el módulo de MongoDB
import { connectMongoDB } from "@/lib/mongodb";
// Importa el modelo User para interactuar con la base de datos
import User from "@/models/user";
// Importa la clase NextResponse para manejar las respuestas HTTP en Next.js
import { NextResponse } from "next/server";
// Importa la biblioteca bcryptjs para el hash de contraseñas
import bcrypt from "bcryptjs";

// Función que maneja la solicitud POST para crear un nuevo usuario
export async function POST(req) {
  try {
    // Extrae los datos necesarios de la solicitud JSON
    const { name, lastname, cedula, especialidad, email, password, roles,imageUrl } = await req.json();
    
    // Genera un hash de la contraseña proporcionada
    const hashedPassword = await bcrypt.hash(password, 10);

    // Conecta a la base de datos MongoDB
    await connectMongoDB();

    // Crea un nuevo usuario en la base de datos utilizando el modelo User
    await User.create({
      name,
      lastname,
      cedula,
      email,
      especialidad,
      password: hashedPassword,
      roles,
      imageUrl
    });

    // Devuelve un mensaje de éxito y un código de estado 201 (Created)
    return NextResponse.json({ message: "Usuario creado correctamente" }, { status: 201 });
  } catch (error) {
    // Maneja errores y devuelve un mensaje de error con un código de estado 500 (Internal Server Error)
    console.error("Error al crear el usuario:", error);
    return NextResponse.json({ message: "Error al crear el usuario" }, { status: 500 });
  }
}
