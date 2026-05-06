import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSubscriptionInfo } from "@/lib/subscription";
import { TrialBanner } from "@/components/dashboard/TrialBanner";

export const metadata: Metadata = {
  title: "DocApp - Panel de Control",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ── Verificar sesión ─────────────────────────────────────────────────
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_user_id")?.value;

  if (!userId) {
    redirect("/login");
  }

  // ── Verificar estado del trial / suscripción ─────────────────────────
  const subInfo = await getSubscriptionInfo(userId);

  if (!subInfo || !subInfo.canAccess) {
    // Trial expirado → página de paywall
    redirect("/subscribe/expired");
  }

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Banner de trial si quedan ≤ 7 días */}
        {subInfo.isTrialActive && subInfo.daysRemaining <= 7 && (
          <TrialBanner daysRemaining={subInfo.daysRemaining} />
        )}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
