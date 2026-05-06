import type { Metadata } from "next";
import DoctoresClient from "./DoctoresClient";

export const metadata: Metadata = {
  title: "Doctores - DocApp",
  description: "Gestione los médicos y secretarias vinculados a su suscripción.",
};

export default function DoctoresPage() {
  return <DoctoresClient />;
}
