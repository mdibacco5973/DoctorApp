import {
  Users,
  CalendarDays,
  CalendarCheck,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Pacientes Totales",
    value: "0",
    icon: Users,
    color: "bg-blue-500/10 text-blue-600",
    trend: "+0%",
  },
  {
    title: "Turnos Hoy",
    value: "0",
    icon: CalendarDays,
    color: "bg-indigo-500/10 text-indigo-600",
    trend: "+0%",
  },
  {
    title: "Turnos Este Mes",
    value: "0",
    icon: CalendarCheck,
    color: "bg-purple-500/10 text-purple-600",
    trend: "+0%",
  },
  {
    title: "Tasa de Asistencia",
    value: "—",
    icon: TrendingUp,
    color: "bg-green-500/10 text-green-600",
    trend: "0%",
  },
];

export default function DashboardPage() {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          {greeting}, Doctor 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          {now.toLocaleDateString("es-AR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="border border-border bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <ArrowUpRight className="w-3 h-3 text-green-500" />
                {stat.trend} vs. mes anterior
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Próximos turnos placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border bg-white dark:bg-zinc-900 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              Próximos Turnos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarCheck className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground text-sm">
                No hay turnos programados para hoy.
              </p>
              <a
                href="/dashboard/turnos"
                className="mt-3 text-sm text-blue-600 hover:underline font-medium"
              >
                Agregar turno →
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-white dark:bg-zinc-900 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <Clock className="w-5 h-5 text-indigo-600" />
              Acceso Rápido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Nuevo turno", href: "/dashboard/turnos", color: "bg-blue-50 hover:bg-blue-100 text-blue-700" },
              { label: "Nuevo paciente", href: "/dashboard/pacientes", color: "bg-indigo-50 hover:bg-indigo-100 text-indigo-700" },
              { label: "Configurar consultorio", href: "/dashboard/configuracion/consultorios", color: "bg-purple-50 hover:bg-purple-100 text-purple-700" },
              { label: "Configurar horarios", href: "/dashboard/configuracion/horarios", color: "bg-green-50 hover:bg-green-100 text-green-700" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${item.color}`}
              >
                {item.label}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
