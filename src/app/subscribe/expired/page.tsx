import { Stethoscope, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suscripción Vencida - DocApp",
  description: "Su período de prueba gratuito ha finalizado. Contacte a soporte para activar su cuenta.",
};

export default function SubscriptionExpiredPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4">
      {/* Glow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-lg w-full">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-red-600/20 border border-red-600/30 mb-8 mx-auto">
          <Lock className="w-12 h-12 text-red-400" />
        </div>

        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-6 text-zinc-400">
          <Stethoscope className="w-5 h-5" />
          <span className="font-semibold tracking-wide">DocApp</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
          Período de prueba finalizado
        </h1>
        <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
          Su mes de uso gratuito ha expirado. Para continuar gestionando su
          consultorio con DocApp, active su suscripción contactando a nuestro
          equipo.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="mailto:soporte@docapp.com?subject=Activar+mi+suscripcion+DocApp"
            className={
              buttonVariants({ size: "lg" }) +
              " bg-blue-600 hover:bg-blue-500 text-white h-14 px-8 text-base font-bold shadow-xl shadow-blue-500/20"
            }
          >
            <Mail className="mr-2 w-5 h-5" />
            Contactar soporte
          </Link>
          <Link
            href="/login"
            className={
              buttonVariants({ variant: "outline", size: "lg" }) +
              " h-14 px-8 text-base font-medium border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            }
          >
            Volver al inicio de sesión
          </Link>
        </div>

        {/* Info */}
        <p className="text-zinc-600 text-sm mt-10">
          ¿Ya activó su cuenta?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Inicie sesión nuevamente
          </Link>
        </p>
      </div>
    </div>
  );
}
