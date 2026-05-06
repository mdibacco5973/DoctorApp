import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HorariosConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Horarios de Atención</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure los días y horarios disponibles para turnos.</p>
      </div>
      <Card className="border border-border bg-white dark:bg-zinc-900 shadow-sm max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-bold">
            <Clock className="w-5 h-5 text-indigo-600" />
            Horarios del Consultorio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Clock className="w-12 h-12 text-muted-foreground/25 mb-4" />
            <p className="text-muted-foreground text-sm">
              Próximamente: configure días de atención, bloques horarios y duración de turnos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
