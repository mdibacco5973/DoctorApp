"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { getSubscriptionInfo } from "@/lib/subscription";

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

    // ── Verificar estado del trial/suscripción ────────────────────────────
    const subInfo = await getSubscriptionInfo(user.id);

    if (!subInfo) {
      return { error: "No se encontró una suscripción asociada a este usuario." };
    }

    if (!subInfo.canAccess) {
      // Trial expirado o cuenta suspendida
      return {
        error: "Su período de prueba ha finalizado. Por favor contacte soporte para activar su cuenta.",
        subscriptionExpired: true,
      };
    }

    // ── Guardar sesión en cookie httpOnly ─────────────────────────────────
    const cookieStore = await cookies();
    cookieStore.set("session_user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      trialDaysRemaining: subInfo.isTrialActive ? subInfo.daysRemaining : null,
    };
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: "Error del servidor. Por favor intente de nuevo." };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("session_user_id");
}
