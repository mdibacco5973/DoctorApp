"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";

export async function registerDoctor(formData: any) {
  console.log("Iniciando registro de doctor:", formData.email);
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      idType,
      idNumber,
      gender,
      specialty,
      password,
    } = formData;

    // Validaciones básicas
    if (!email || !password || !firstName || !lastName || !idNumber) {
      return { error: "Faltan campos requeridos." };
    }

    // 1. Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("Usuario ya existe:", email);
      return { error: "El correo electrónico ya está registrado." };
    }

    // 2. Hash de contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crear Usuario y Suscripción en una transacción
    const result = await prisma.$transaction(async (tx) => {
      console.log("Creando registro en transacción...");
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name: `${firstName} ${lastName}`,
          role: UserRole.DOCTOR,
        },
      });

      const subscription = await tx.doctorSubscription.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          idType,
          idNumber,
          gender,
          specialty,
          userId: user.id,
        },
      });

      return { user, subscription };
    });

    console.log("Registro completado con éxito para:", email);
    return { success: true, data: { userId: result.user.id } };
  } catch (error: any) {
    console.error("Error detallado en registro:", error);
    
    if (error.code === 'P2002') {
      return { error: "El correo o número de documento ya se encuentra registrado." };
    }
    
    return { error: `Error del servidor: ${error.message || "Ocurrió un error inesperado"}` };
  }
}
