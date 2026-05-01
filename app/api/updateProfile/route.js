// app/api/updateProfile/route.js
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import {
  handleApiError,
  parseJsonBody,
  requireAuthenticatedUser,
  validateObjectId,
} from "@/lib/api/security";
import { updateProfileSchema } from "@/lib/api/schemas";

export async function PUT(req) {
  try {
    const auth = await requireAuthenticatedUser(req);
    if (auth.error) {
      return auth.error;
    }

    const payload = await parseJsonBody(req, updateProfileSchema);
    const userId = validateObjectId(payload.userId, "userId");
    const requesterId = auth.user?._id?.toString();
    const isAdmin = auth.user?.roles === "admin";

    if (!isAdmin && requesterId !== userId) {
      return NextResponse.json({ message: "No autorizado" }, { status: 403 });
    }

    await connectMongoDB();

    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    if (payload.email && payload.email !== userToUpdate.email) {
      const existingUser = await User.findOne({ email: payload.email }).lean();
      if (existingUser && existingUser._id.toString() !== userId) {
        return NextResponse.json(
          { message: "El correo ya está en uso por otro usuario" },
          { status: 409 }
        );
      }
    }

    if (payload.name !== undefined) userToUpdate.name = payload.name;
    if (payload.lastname !== undefined) userToUpdate.lastname = payload.lastname;
    if (payload.idprofessional !== undefined) userToUpdate.idprofessional = payload.idprofessional;
    if (payload.specialty !== undefined) userToUpdate.specialty = payload.specialty;
    if (payload.email !== undefined) userToUpdate.email = payload.email;
    if (payload.imageUrl !== undefined) userToUpdate.imageUrl = payload.imageUrl;

    if (payload.password && payload.newPassword) {
      const isPasswordValid = await bcrypt.compare(payload.password, userToUpdate.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "La contraseña actual no es correcta" },
          { status: 400 }
        );
      }

      userToUpdate.password = await bcrypt.hash(payload.newPassword, 10);
    }

    await userToUpdate.save();
    return NextResponse.json(
      { message: "Usuario actualizado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error, "Error al actualizar el usuario");
  }
}
