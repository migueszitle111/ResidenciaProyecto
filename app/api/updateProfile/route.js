// Importa la función connectMongoDB desde el módulo de MongoDB
import { connectMongoDB } from "@/lib/mongodb";
// Importa el modelo User para interactuar con la base de datos
import User from "@/models/user";
// Importa la clase NextResponse para manejar las respuestas HTTP en Next.js
import { NextResponse } from "next/server";
// Importa la biblioteca bcryptjs para el hash y la comparación de contraseñas
import bcrypt from "bcryptjs";

// Función que maneja la solicitud PUT para actualizar un usuario
export async function PUT(req) {
  try {
    // Extrae los datos necesarios de la solicitud JSON
    const { userId, name, lastname, cedula, especialidad, email, password, newPassword, imageUrl} = await req.json();

    // Conecta a la base de datos MongoDB
    await connectMongoDB();

    // Busca al usuario que se va a actualizar usando el ID
    const userToUpdate = await User.findById(userId);

    // Verifica si el usuario existe
    if (!userToUpdate) {
      // Si no existe, devuelve un mensaje de error y un código de estado 404
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Actualiza los campos del usuario solo si se proporcionan en la solicitud
    if (name) {
      userToUpdate.name = name;
    }

    if (lastname) {
      userToUpdate.lastname = lastname;
    }

    if (cedula) {
      userToUpdate.cedula = cedula;
    }

    if (especialidad) {
      userToUpdate.especialidad = especialidad;
    }
    
    if (email) {
      userToUpdate.email = email;
    }
    if (imageUrl) {
      userToUpdate.imageUrl = imageUrl;
    }

    // Verifica la contraseña actual y actualiza la contraseña si es válida
    if (password && newPassword) {
      const isPasswordValid = await bcrypt.compare(password, userToUpdate.password);

      if (!isPasswordValid) {
        // Si la contraseña actual no es válida, devuelve un mensaje de error y un código de estado 400
        return NextResponse.json({ message: "La contraseña actual no es correcta" }, { status: 400 });
      }

      // Genera el hash de la nueva contraseña y la actualiza en el usuario
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      userToUpdate.password = hashedPassword;
    }

    // Guarda los cambios en la base de datos
    await userToUpdate.save();

    // Devuelve un mensaje de éxito y un código de estado 200
    return NextResponse.json({ message: "Usuario actualizado correctamente" }, { status: 200 });
  } catch (error) {
    // Maneja errores y devuelve un mensaje de error con un código de estado 500
    console.error("Error al actualizar el usuario:", error);
    return NextResponse.json({ message: `Error al actualizar el usuario: ${error.message}` }, { status: 500 });
  }
}
