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

    // ── Validaciones de campos requeridos ──────────────────────────────────
    if (!email || !password || !firstName || !lastName || !idNumber || !idType || !gender || !specialty) {
      return { error: "Faltan campos requeridos. Por favor complete todos los campos." };
    }

    // ── Validación: email duplicado en tabla User ───────────────────────────
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "El correo electrónico ya está registrado en el sistema." };
    }

    // ── Validación: email duplicado en tabla Subscription ──────────────────
    const existingSubscriptionEmail = await prisma.subscription.findUnique({ where: { email } });
    if (existingSubscriptionEmail) {
      return { error: "Ya existe una suscripción registrada con ese correo electrónico." };
    }

    // ── Validación: número de documento duplicado en Subscription ──────────
    const existingIdNumber = await prisma.subscription.findUnique({ where: { idNumber } });
    if (existingIdNumber) {
      return { error: `El número de documento "${idNumber}" ya se encuentra registrado.` };
    }

    // ── Hash de contraseña ─────────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash(password, 10);

    // ── Crear Usuario y Suscripción en una transacción atómica ────────────
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

      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 30);

      const subscription = await tx.subscription.create({
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
          status: "TRIAL",
          trialEndsAt,
        },
      });

      return { user, subscription };
    });

    console.log("Registro completado con éxito para:", email);
    return { success: true, data: { userId: result.user.id } };
  } catch (error: any) {
    console.error("Error detallado en registro:", error);

    // Fallback por si alguna constraint única de la BD falla de todas formas
    if (error.code === "P2002") {
      const field = error.meta?.target as string[] | undefined;
      if (field?.includes("email")) {
        return { error: "El correo electrónico ya está en uso." };
      }
      if (field?.includes("idNumber")) {
        return { error: "El número de documento ya está registrado." };
      }
      return { error: "Ya existe un registro con esos datos. Verifique el correo y el número de documento." };
    }

    return { error: `Error del servidor: ${error.message || "Ocurrió un error inesperado"}` };
  }
}

