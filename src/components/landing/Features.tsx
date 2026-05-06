"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  ShieldCheck, 
  Smartphone, 
  Zap 
} from "lucide-react";

const features = [
  {
    title: "Gestión Multi-Usuario",
    description: "Espacios dedicados para Doctor y Secretaria con permisos personalizados.",
    icon: Users,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Agenda Inteligente",
    description: "Gestione turnos de forma intuitiva, con recordatorios automáticos.",
    icon: Calendar,
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    title: "Historia Clínica Digital",
    description: "Acceso rápido y seguro a toda la información médica de sus pacientes.",
    icon: ClipboardList,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Seguridad de Datos",
    description: "Información encriptada y copias de seguridad diarias automáticas.",
    icon: ShieldCheck,
    color: "bg-green-500/10 text-green-600",
  },
  {
    title: "Acceso desde cualquier lugar",
    description: "Plataforma 100% en la nube, optimizada para móviles y tablets.",
    icon: Smartphone,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "Optimización de Tiempos",
    description: "Reduzca la carga administrativa y enfóquese en lo que importa: sus pacientes.",
    icon: Zap,
    color: "bg-yellow-500/10 text-yellow-600",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-zinc-50 dark:bg-zinc-950/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
            Todo lo que su consultorio necesita
          </h2>
          <p className="text-lg text-muted-foreground">
            Diseñamos DocApp para simplificar la vida del profesional de la salud y su equipo administrativo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-border hover:shadow-xl hover:shadow-primary/5 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
