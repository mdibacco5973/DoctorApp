"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function loginUser(email: string, password: string) {
  try {
    if (!email || !password) {
      return { error: "Por favor complete todos los campos." };
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { subscription: true },
    });

    if (!user) {
      return { error: "Correo electrónico o contraseña incorrectos." };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { error: "Correo electrónico o contraseña incorrectos." };
    }

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: "Error del servidor. Por favor intente de nuevo." };
  }
}
