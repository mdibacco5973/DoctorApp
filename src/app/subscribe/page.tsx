import { SubscriptionForm } from "@/components/landing/SubscriptionForm";
import { Stethoscope } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suscribirse - DocApp",
  description: "Complete su registro para comenzar a gestionar su consultorio con DocApp.",
};

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Simple header */}
      <header className="border-b bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Stethoscope className="w-7 h-7" />
            <span>DocApp</span>
          </Link>
          <p className="text-sm text-muted-foreground hidden sm:block">
            ¿Ya tiene cuenta?{" "}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </header>

      {/* Page content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Comience su suscripción
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Complete sus datos profesionales para activar su cuenta gratuita por 14 días.
            Sin tarjeta de crédito requerida.
          </p>
        </div>
        <SubscriptionForm />
      </main>
    </div>
  );
}
