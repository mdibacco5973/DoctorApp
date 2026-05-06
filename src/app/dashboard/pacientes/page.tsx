import { Users, Search, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PacientesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Pacientes</h1>
          <p className="text-muted-foreground text-sm mt-1">Gestione el listado de pacientes del consultorio.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Nuevo Paciente
        </button>
      </div>

      <Card className="border border-border bg-white dark:bg-zinc-900 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-bold">
            <Users className="w-5 h-5 text-blue-600" />
            Listado de Pacientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="w-14 h-14 text-muted-foreground/25 mb-4" />
            <h3 className="font-semibold text-lg mb-1">Sin pacientes aún</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Comience agregando su primer paciente para gestionar sus turnos e historia clínica.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
