// Importa las dependencias necesarias
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import resetPasswordToken from "@/models/ResetPasswordToken";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
// Importa la biblioteca bcryptjs para el hash y la comparación de contraseñas
import bcrypt from "bcryptjs";

// Define la función de manejo para la solicitud PUT
export async function PUT(request) {
  try {
    // Extrae la información del cuerpo de la solicitud
    const { email, token, newPassword, confirmPassword } = await request.json();

    // Conecta a la base de datos MongoDB
    await connectMongoDB();

    // Verifica si el usuario existe en la base de datos
    const existingUser = await User.findOne({ email });

    // Si el usuario no existe, devuelve un mensaje de error
    if (!existingUser) {
      return NextResponse.json({ message: "Usuario no encontrado", redirectUrl: null }, { status: 404 });
    }

    // Use findOneAndDelete to find and remove the token in a single operation
    const validToken = await resetPasswordToken.findOneAndDelete({ email, token });

    // Si el token no es válido, devuelve un mensaje de error
    if (!validToken) {
      return NextResponse.json({ message: "Token inválido", redirectUrl: null }, { status: 400 });
    }


// Verifica la nueva contraseña y actualiza la contraseña si es válida
if (newPassword && confirmPassword) {
  // Genera el hash de la nueva contraseña y la actualiza en el usuario
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  existingUser.password = hashedPassword;
}

    await existingUser.save();

    // Devuelve un mensaje de éxito
    return NextResponse.json({ message: "Contraseña actualizada exitosamente", redirectUrl: "/Login" }, { status: 200 });
  } catch (error) {
    console.error("Error processing PUT request:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 });
  }
}


// Define la función de manejo para la solicitud POST
export async function POST(request) {
  try {
    // Extrae el correo electrónico del cuerpo de la solicitud
    const { email } = await request.json();

    // Conecta a la base de datos MongoDB
    await connectMongoDB();

    // Verifica si el usuario existe en la base de datos
    const existingUser = await User.findOne({ email });

    // Si el usuario no existe, devuelve un mensaje de error
    if (!existingUser) {
      return NextResponse.json({ message: "Usuario no encontrado", redirectUrl: null }, { status: 404 });
    }

    // Genera un token único y lo guarda en la colección ResetPasswordToken
    const token = generateUniqueToken();
    await resetPasswordToken.create({ email, token });

    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com', // Servidor SMTP
      port: 587, // Puerto para SMTP
      secure: false,  // true para usar TLS, false para usar STARTTLS
      auth: {
        user: 'residencia@medxproapp.com',
        pass: 'VKcBJ4SbXEpRvT6n', 
      },
      authMethod: 'PLAIN', // Método de autenticación
    });
    
    // Configura el contenido del correo electrónico
    const mailOptions = {
      from: 'residencia@medxproapp.com',
      to: email,
      subject: 'Solicitud de restablecimiento de contraseña',
      text: `Utiliza este token para restablecer tu contraseña: ${token} Nota: Solo es válido por 1 hora.`,
    };

    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);

    // Devuelve un mensaje de éxito y la URL de redireccionamiento
    return NextResponse.json({ message: "Token generado y correo electrónico enviado exitosamente", token, redirectUrl: "/ResetForm" }, { status: 200 });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 });
  }
}

// Función para generar un token único
function generateUniqueToken() {
  return uuidv4();
}



