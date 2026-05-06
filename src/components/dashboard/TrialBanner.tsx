"use client";

import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface TrialBannerProps {
  daysRemaining: number;
}

export function TrialBanner({ daysRemaining }: TrialBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const isUrgent = daysRemaining <= 3;

  return (
    <div
      className={`flex items-center justify-between gap-4 px-6 py-3 text-sm font-medium transition-all ${
        isUrgent
          ? "bg-red-600 text-white"
          : "bg-amber-500 text-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        {daysRemaining <= 0 ? (
          <span>Su período de prueba ha vencido hoy.</span>
        ) : (
          <span>
            Su período de prueba gratuito vence en{" "}
            <strong>{daysRemaining} {daysRemaining === 1 ? "día" : "días"}</strong>.
          </span>
        )}
        <Link
          href="mailto:soporte@docapp.com?subject=Activar+suscripcion"
          className="underline underline-offset-2 hover:no-underline ml-1"
        >
          Contactar para continuar →
        </Link>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="hover:opacity-70 transition-opacity shrink-0"
        aria-label="Cerrar aviso"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
