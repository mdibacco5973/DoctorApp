import { UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DoctorConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Doctor</h1>
        <p className="text-muted-foreground text-sm mt-1">Datos del médico y perfil profesional.</p>
      </div>
      <Card className="border border-border bg-white dark:bg-zinc-900 shadow-sm max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-bold">
            <UserCog className="w-5 h-5 text-blue-600" />
            Perfil del Doctor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <UserCog className="w-12 h-12 text-muted-foreground/25 mb-4" />
            <p className="text-muted-foreground text-sm">
              Próximamente: edite su nombre, especialidad, matrícula y datos profesionales.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
