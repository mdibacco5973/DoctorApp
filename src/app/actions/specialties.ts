"use server";

import prisma from "@/lib/prisma";
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

export async function getSpecialties() {
  const userId = await getSessionUserId();
  if (!userId) return { error: "No autenticado." };

  const subscriptionId = await getOwnerSubscriptionId(userId);
  if (!subscriptionId) return { error: "Sin suscripción activa." };

  const specialties = await prisma.specialty.findMany({
    where: { subscriptionId },
    select: { id: true, name: true, createdAt: true },
    orderBy: { name: "asc" },
  });

  return { success: true, data: specialties };
}

// ─── Create ──────────────────────────────────────────────────────────────────

export async function createSpecialty(name: string) {
  const userId = await getSessionUserId();
  if (!userId) return { error: "No autenticado." };

  const subscriptionId = await getOwnerSubscriptionId(userId);
  if (!subscriptionId) return { error: "Sin suscripción activa." };

  const trimmed = name.trim();
  if (!trimmed) return { error: "El nombre de la especialidad es obligatorio." };

  // Verificar duplicado dentro de la suscripción
  const existing = await prisma.specialty.findUnique({
    where: { subscriptionId_name: { subscriptionId, name: trimmed } },
  });
  if (existing) return { error: `La especialidad "${trimmed}" ya existe.` };

  await prisma.specialty.create({
    data: { name: trimmed, subscriptionId },
  });

  revalidatePath("/dashboard/configuracion/especialidades");
  return { success: true };
}

// ─── Update ──────────────────────────────────────────────────────────────────

export async function updateSpecialty(id: string, name: string) {
  const userId = await getSessionUserId();
  if (!userId) return { error: "No autenticado." };

  const subscriptionId = await getOwnerSubscriptionId(userId);
  if (!subscriptionId) return { error: "Sin suscripción activa." };

  // Verificar pertenencia
  const specialty = await prisma.specialty.findFirst({
    where: { id, subscriptionId },
  });
  if (!specialty) return { error: "Especialidad no encontrada." };

  const trimmed = name.trim();
  if (!trimmed) return { error: "El nombre es obligatorio." };

  // Verificar duplicado (excluyendo el actual)
  if (trimmed.toLowerCase() !== specialty.name.toLowerCase()) {
    const conflict = await prisma.specialty.findUnique({
      where: { subscriptionId_name: { subscriptionId, name: trimmed } },
    });
    if (conflict) return { error: `Ya existe la especialidad "${trimmed}".` };
  }

  await prisma.specialty.update({ where: { id }, data: { name: trimmed } });

  revalidatePath("/dashboard/configuracion/especialidades");
  return { success: true };
}

// ─── Delete ──────────────────────────────────────────────────────────────────

export async function deleteSpecialty(id: string) {
  const userId = await getSessionUserId();
  if (!userId) return { error: "No autenticado." };

  const subscriptionId = await getOwnerSubscriptionId(userId);
  if (!subscriptionId) return { error: "Sin suscripción activa." };

  const specialty = await prisma.specialty.findFirst({
    where: { id, subscriptionId },
  });
  if (!specialty) return { error: "Especialidad no encontrada." };

  await prisma.specialty.delete({ where: { id } });

  revalidatePath("/dashboard/configuracion/especialidades");
  return { success: true };
}
