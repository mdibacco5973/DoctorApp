import { CalendarDays, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TurnosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Turnos</h1>
          <p className="text-muted-foreground text-sm mt-1">Gestione la agenda de turnos del consultorio.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Nuevo Turno
        </button>
      </div>

      <Card className="border border-border bg-white dark:bg-zinc-900 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-bold">
            <CalendarDays className="w-5 h-5 text-indigo-600" />
            Agenda de Turnos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CalendarDays className="w-14 h-14 text-muted-foreground/25 mb-4" />
            <h3 className="font-semibold text-lg mb-1">Sin turnos programados</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Cree su primer turno asignando un paciente, fecha y horario de atención.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
