"use client";

import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                <Star className="w-3 h-3 fill-primary" />
                La plataforma #1 para consultorios
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Gestione su consultorio con <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">inteligencia</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0"
            >
              La herramienta integral para doctores y secretarias. Administre turnos, historias clínicas y facturación en un solo lugar. Más tiempo para sus pacientes, menos para el papeleo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/subscribe"
                className={buttonVariants({ size: "lg" }) + " h-14 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"}
              >
                Empezar ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className={buttonVariants({ size: "lg", variant: "outline" }) + " h-14 px-8 text-lg font-semibold"}
              >
                Ver demostración
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Prueba gratis 14 días
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Sin tarjeta de crédito
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Soporte 24/7
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm p-2 shadow-2xl overflow-hidden group">
               <div className="rounded-xl overflow-hidden border border-border bg-background shadow-inner aspect-[4/3] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-950 flex flex-col">
                    <div className="h-12 border-b bg-background flex items-center px-4 justify-between">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="w-40 h-6 bg-muted rounded-md" />
                      <div className="w-8 h-8 rounded-full bg-blue-200" />
                    </div>
                    <div className="flex-1 p-6 grid grid-cols-12 gap-6">
                      <div className="col-span-3 space-y-4">
                        <div className="h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-full" />
                        <div className="h-8 bg-muted rounded-lg w-full" />
                        <div className="h-8 bg-muted rounded-lg w-full" />
                        <div className="h-8 bg-muted rounded-lg w-full" />
                      </div>
                      <div className="col-span-9 space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-24 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border p-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-2" />
                            <div className="h-4 bg-muted rounded w-1/2" />
                          </div>
                          <div className="h-24 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border p-4">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-2" />
                            <div className="h-4 bg-muted rounded w-1/2" />
                          </div>
                          <div className="h-24 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border p-4">
                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-2" />
                            <div className="h-4 bg-muted rounded w-1/2" />
                          </div>
                        </div>
                        <div className="h-48 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border p-4 space-y-4">
                           <div className="flex justify-between">
                              <div className="h-6 bg-muted rounded w-1/3" />
                              <div className="h-6 bg-blue-500 rounded w-20" />
                           </div>
                           <div className="space-y-2">
                              <div className="h-10 bg-zinc-50 dark:bg-zinc-800 rounded-lg" />
                              <div className="h-10 bg-zinc-50 dark:bg-zinc-800 rounded-lg" />
                              <div className="h-10 bg-zinc-50 dark:bg-zinc-800 rounded-lg" />
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 z-20 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-xl border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Turnos hoy</p>
                  <p className="text-lg font-bold">12 Pacientes</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-xl border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ingresos</p>
                  <p className="text-lg font-bold">+24% este mes</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
