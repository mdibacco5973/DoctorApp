import prisma from "@/lib/prisma";

export type SubscriptionStatus = "TRIAL" | "ACTIVE" | "PAST_DUE" | "EXPIRED";

export interface SubscriptionInfo {
  status: SubscriptionStatus;
  trialEndsAt: Date;
  daysRemaining: number;    // días restantes en el trial (negativo = expirado)
  isTrialActive: boolean;   // trial en curso y no expirado
  isTrialExpired: boolean;  // trial terminado sin pago
  canAccess: boolean;       // puede usar el dashboard
}

/**
 * Obtiene y evalúa el estado de suscripción de un usuario.
 * Devuelve null si no tiene suscripción.
 */
export async function getSubscriptionInfo(userId: string): Promise<SubscriptionInfo | null> {
  const sub = await prisma.subscription.findUnique({
    where: { userId },
    select: { status: true, trialEndsAt: true },
  });

  if (!sub) return null;

  const now = new Date();
  const trialEndsAt = new Date(sub.trialEndsAt);
  const msRemaining = trialEndsAt.getTime() - now.getTime();
  const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

  const isTrialActive = sub.status === "TRIAL" && now <= trialEndsAt;
  const isTrialExpired = sub.status === "TRIAL" && now > trialEndsAt;

  // Puede acceder si: trial vigente, o pago activo
  const canAccess = isTrialActive || sub.status === "ACTIVE";

  // Si el trial expiró pero el status aún dice TRIAL, lo actualizamos automáticamente
  if (isTrialExpired) {
    await prisma.subscription.update({
      where: { userId },
      data: { status: "EXPIRED" },
    });
  }

  return {
    status: isTrialExpired ? "EXPIRED" : (sub.status as SubscriptionStatus),
    trialEndsAt,
    daysRemaining,
    isTrialActive,
    isTrialExpired,
    canAccess,
  };
}
