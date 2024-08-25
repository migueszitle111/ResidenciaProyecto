// Importa la función connectMongoDB desde el módulo MongoDB para establecer la conexión con la base de datos
import { connectMongoDB } from "@/lib/mongodb";
// Importa el modelo User para interactuar con los datos de usuario en la base de datos
import User from "@/models/user";
// Importa el módulo de autenticación de NextAuth y el proveedor de credenciales
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
// Importa la biblioteca bcryptjs para la comparación segura de contraseñas
import bcrypt from "bcryptjs";

// Configuración de opciones para NextAuth
const authOptions = {
    // Proveedores de autenticación configurados, en este caso, solo se usa el proveedor de credenciales
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            // Función de autorización que verifica las credenciales proporcionadas
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    // Conecta a la base de datos MongoDB
                    await connectMongoDB();
                    // Busca un usuario en la base de datos con el correo electrónico proporcionado
                    const user = await User.findOne({ email });

                    // Si el usuario no existe, devuelve null
                    if (!user) {
                        return null;
                    }

                    // Compara las contraseñas usando bcrypt para verificar la autenticidad
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    // Si las contraseñas no coinciden, devuelve null
                    if (!passwordsMatch) {
                        return null;
                    }

                    // Devuelve la información del usuario si la autenticación es exitosa
                    return {
                        email: user.email,
                        name: user.name,
                        lastname: user.lastname,
                        cedula: user.cedula,
                        especialidad: user.especialidad,
                        imageUrl: user.imageUrl,
                        roles: user.roles,
                    };
                } catch (error) {
                    // Maneja errores y registra el error en la consola
                    console.error("Error: ", error);
                }
            },
        }),
    ],
    // Configuración de sesión, en este caso, se usa el strategy "jwt"
    session: {
        strategy: "jwt",
    },
    // Callbacks para manipular los tokens y las sesiones
    callbacks: {
        jwt: async ({ token, user }) => {
            // Asigna la información del usuario al token si está presente
            user && (token.user = user);
            return token;
        },
        session: async ({ session, token }) => {
            // Intenta cargar la información del usuario directamente desde la base de datos al crear una sesión
            const user = await User.findOne({ email: token.user.email });

            // Si se encuentra el usuario, asigna la información del usuario a la sesión
            if (user) {
                session.user = user;
            }

            return session;
        },
    },
    // Clave secreta para firmar los tokens de sesión
    secret: process.env.NEXTAUTH_SECRET,
    // Páginas personalizadas para el inicio de sesión, cierre de sesión y manejo de errores
    pages: {
        signIn: "/",
        signOut: "/Login",
        error: "/Login",
    },
};

// Manejador de NextAuth con las opciones de configuración
const handler = NextAuth(authOptions);

// Exporta el manejador para diferentes tipos de solicitudes (GET, POST, PUT, DELETE)
export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
