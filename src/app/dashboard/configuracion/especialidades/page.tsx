import type { Metadata } from "next";
import EspecialidadesClient from "./EspecialidadesClient";

export const metadata: Metadata = {
  title: "Especialidades - DocApp",
  description: "Configure las especialidades médicas disponibles en su consultorio.",
};

export default function EspecialidadesPage() {
  return <EspecialidadesClient />;
}
