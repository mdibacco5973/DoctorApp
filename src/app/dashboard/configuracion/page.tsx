import { Settings, UserCog, Clock, Building2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  {
    label: "Doctor",
    description: "Datos del médico, especialidad y matrícula profesional.",
    href: "/dashboard/configuracion/doctor",
    icon: UserCog,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    label: "Horarios de Atención",
    description: "Configure los días y horarios en que atiende el consultorio.",
    href: "/dashboard/configuracion/horarios",
    icon: Clock,
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    label: "Consultorios",
    description: "Gestione la información y ubicación de sus consultorios.",
    href: "/dashboard/configuracion/consultorios",
    icon: Building2,
    color: "bg-purple-500/10 text-purple-600",
  },
];

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Personalice su perfil profesional, horarios y datos del consultorio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="border border-border bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all group cursor-pointer h-full">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${section.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <section.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-base font-bold flex items-center justify-between">
                  {section.label}
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
