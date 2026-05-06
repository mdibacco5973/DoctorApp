"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// ─── helpers ────────────────────────────────────────────────────────────────

async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("session_user_id")?.value ?? null;
}

async function getOwnerSubscriptionId(userId: string): Promise<string | null> {
  const sub = await prisma.subscription.findUnique({
    where: { userId },
    select: { id: true },
  });
  return sub?.id ?? null;
}

// ─── List ────────────────────────────────────────────────────────────────────

export async function getDoctors() {
  const userId = await getSessionUserId();
  if (!userId) return { error: "No autenticado." };

  const subscriptionId = await getOwnerSubscriptionId(userId);
  if (!subscriptionId) return { error: "Sin suscripción activa." };

  const doctors = await prisma.doctor.findMany({
    where: { subscriptionId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      specialty: true,
      email: true,
      phone: true,
      createdAt: true,
      user: { select: { role: true } },
    },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });

  return { success: true, data: doctors };
}

// ─── Create ──────────────────────────────────────────────────────────────────

export async function createDoctor(formData: {
  firstName: string;
  lastName: string;
  specialty: string;
  email: string;
  phone: string;
  password: string;
}) {
  const userId = await getSessionUserId();
  if (!userId) return { error: "No autenticado." };

  const subscriptionId = await getOwnerSubscriptionId(userId);
  if (!subscriptionId) return { error: "Sin suscripción activa." };

  const { firstName, lastName, specialty, email, phone, password } = formData;

  if (!firstName || !lastName || !specialty || !email || !phone || !password) {
    return { error: "Todos los campos son obligatorios." };
  }

  // Email único en Doctor
  const existingDoctor = await prisma.doctor.findUnique({ where: { email } });
  if (existingDoctor) return { error: "Ya existe un doctor con ese correo electrónico." };

  // Email único en User
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return { error: "El correo electrónico ya está registrado como usuario." };

  const hashedPassword = await bcrypt.hash(password, 10);

  // Transacción: crear User + Doctor juntos
  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        role: UserRole.DOCTOR,
      },
    });

    await tx.doctor.create({
      data: {
        firstName,
        lastName,
        specialty,
        email,
        phone,
        subscriptionId,
        userId: user.id,
      },
    });
  });

  revalidatePath("/dashboard/doctores");
  return { success: true };
}

// ─── Update ──────────────────────────────────────────────────────────────────

export async function updateDoctor(
  doctorId: string,
  formData: {
    firstName: string;
    lastName: string;
    specialty: string;
    email: string;
    phone: string;
    password?: string;
  }
) {
  const userId = await getSessionUserId();
  if (!userId) return { error: "No autenticado." };

  const subscriptionId = await getOwnerSubscriptionId(userId);
  if (!subscriptionId) return { error: "Sin suscripción activa." };

  const doctor = await prisma.doctor.findFirst({
    where: { id: doctorId, subscriptionId },
  });
  if (!doctor) return { error: "Doctor no encontrado." };

  const { firstName, lastName, specialty, email, phone, password } = formData;

  // Si el email cambia, validar unicidad en ambas tablas
  if (email !== doctor.email) {
    const conflictDoc = await prisma.doctor.findUnique({ where: { email } });
    if (conflictDoc) return { error: "Ya existe un doctor con ese correo electrónico." };

    const conflictUser = await prisma.user.findUnique({ where: { email } });
    if (conflictUser) return { error: "El correo electrónico ya está en uso." };
  }

  await prisma.$transaction(async (tx) => {
    await tx.doctor.update({
      where: { id: doctorId },
      data: { firstName, lastName, specialty, email, phone },
    });

    const userUpdate: any = {
      name: `${firstName} ${lastName}`,
      email,
    };
    if (password && password.trim() !== "") {
      userUpdate.password = await bcrypt.hash(password, 10);
    }

    await tx.user.update({
      where: { id: doctor.userId },
      data: userUpdate,
    });
  });

  revalidatePath("/dashboard/doctores");
  return { success: true };
}

// ─── Delete ──────────────────────────────────────────────────────────────────

export async function deleteDoctor(doctorId: string) {
  const userId = await getSessionUserId();
  if (!userId) return { error: "No autenticado." };

  const subscriptionId = await getOwnerSubscriptionId(userId);
  if (!subscriptionId) return { error: "Sin suscripción activa." };

  const doctor = await prisma.doctor.findFirst({
    where: { id: doctorId, subscriptionId },
    select: { userId: true },
  });
  if (!doctor) return { error: "Doctor no encontrado." };

  // Transacción: eliminar Doctor primero (FK), luego User
  await prisma.$transaction(async (tx) => {
    await tx.doctor.delete({ where: { id: doctorId } });
    await tx.user.delete({ where: { id: doctor.userId } });
  });

  revalidatePath("/dashboard/doctores");
  return { success: true };
}
