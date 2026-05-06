"use client";

import { buttonVariants } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    name: "Básico",
    price: "$29",
    description: "Ideal para doctores independientes que recién comienzan.",
    features: [
      "1 Consultorio",
      "1 Doctor + 1 Secretaria",
      "Gestión de Turnos",
      "Historia Clínica Básica",
      "Soporte por Email",
    ],
    cta: "Empezar Prueba Gratis",
    href: "/subscribe",
    popular: false,
  },
  {
    name: "Profesional",
    price: "$59",
    description: "La solución completa para consultorios en crecimiento.",
    features: [
      "Consultorios Ilimitados",
      "Hasta 3 Doctores + 3 Secretarias",
      "Agenda Avanzada",
      "Historias Clínicas Detalladas",
      "Facturación Electrónica",
      "Soporte Prioritario 24/7",
    ],
    cta: "Suscribirse Ahora",
    href: "/subscribe",
    popular: true,
  },
  {
    name: "Clínica",
    price: "$99",
    description: "Para centros médicos que necesitan control total.",
    features: [
      "Todo lo del plan Profesional",
      "Usuarios Ilimitados",
      "Reportes y Analíticas",
      "API de Integración",
      "Capacitación Personalizada",
    ],
    cta: "Contactar Ventas",
    href: "/subscribe",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
            Planes que crecen con usted
          </h2>
          <p className="text-lg text-muted-foreground">
            Suscríbase hoy y transforme la gestión de su consultorio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col p-8 rounded-3xl border ${
                plan.popular 
                ? "border-blue-500 shadow-2xl shadow-blue-500/10 bg-blue-50/50 dark:bg-blue-950/20" 
                : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                  MÁS POPULAR
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5 text-blue-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className={buttonVariants({ variant: plan.popular ? "default" : "outline" }) + ` w-full h-12 text-base font-semibold ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
