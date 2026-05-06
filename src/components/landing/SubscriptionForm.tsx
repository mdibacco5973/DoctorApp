"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, User, Mail, Phone, Fingerprint, Stethoscope, Lock, Users } from "lucide-react";
import { registerDoctor } from "@/app/actions/register";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export function SubscriptionForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idType: "",
    idNumber: "",
    gender: "",
    specialty: "",
    password: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await registerDoctor(formData);
      
      if (result.error) {
        setStatus("error");
        setErrorMessage(result.error);
      } else {
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Ocurrió un error inesperado.");
    }
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center p-12 bg-white dark:bg-zinc-900 rounded-3xl border border-border shadow-2xl"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h3 className="text-3xl font-bold mb-4">¡Bienvenido a DocApp!</h3>
        <p className="text-xl text-muted-foreground mb-8">
          Su suscripción ha sido procesada con éxito. Ya puede acceder a su panel de control con su correo y contraseña.
        </p>
        <Link
          href="/login"
          className={buttonVariants({ size: "lg" }) + " h-14 px-12 text-lg font-bold bg-blue-600 hover:bg-blue-700"}
        >
          Ir al Login
        </Link>
      </motion.div>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto border-none shadow-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      <CardHeader className="pt-10 pb-6 text-center">
        <CardTitle className="text-3xl font-extrabold tracking-tight">Comience su Suscripción</CardTitle>
        <CardDescription className="text-lg">
          Complete sus datos profesionales para activar su cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personales */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-wider">
                <User className="w-4 h-4" />
                Información Personal
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  name="firstName"
                  placeholder="Nombre" 
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="h-12 bg-zinc-50 dark:bg-zinc-800/50"
                />
                <Input 
                  name="lastName"
                  placeholder="Apellido" 
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="h-12 bg-zinc-50 dark:bg-zinc-800/50"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  name="email"
                  type="email" 
                  placeholder="Correo electrónico" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 pl-10 bg-zinc-50 dark:bg-zinc-800/50"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  name="phone"
                  placeholder="Teléfono móvil" 
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-12 pl-10 bg-zinc-50 dark:bg-zinc-800/50"
                />
              </div>
            </div>

            {/* Profesionales */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 uppercase tracking-wider">
                <Fingerprint className="w-4 h-4" />
                Identificación y Perfil
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select onValueChange={(v) => handleSelectChange("idType", v)}>
                  <SelectTrigger className="h-12 bg-zinc-50 dark:bg-zinc-800/50">
                    <SelectValue placeholder="Tipo Doc." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DNI">DNI</SelectItem>
                    <SelectItem value="PASAPORTE">Pasaporte</SelectItem>
                    <SelectItem value="CEDULA">Cédula</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  name="idNumber"
                  placeholder="N° Documento" 
                  value={formData.idNumber}
                  onChange={handleChange}
                  required
                  className="h-12 bg-zinc-50 dark:bg-zinc-800/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select onValueChange={(v) => handleSelectChange("gender", v)}>
                  <SelectTrigger className="h-12 bg-zinc-50 dark:bg-zinc-800/50">
                    <SelectValue placeholder="Género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MASCULINO">Masculino</SelectItem>
                    <SelectItem value="FEMENINO">Femenino</SelectItem>
                    <SelectItem value="OTRO">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    name="specialty"
                    placeholder="Especialidad" 
                    value={formData.specialty}
                    onChange={handleChange}
                    required
                    className="h-12 pl-10 bg-zinc-50 dark:bg-zinc-800/50"
                  />
                </div>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  name="password"
                  type="password" 
                  placeholder="Crear contraseña" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-12 pl-10 bg-zinc-50 dark:bg-zinc-800/50"
                />
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {errorMessage}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-14 text-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Procesando su suscripción...
              </>
            ) : (
              "Confirmar y Empezar Ahora"
            )}
          </Button>
          
          <p className="text-center text-sm text-muted-foreground">
            Al registrarse, usted acepta recibir comunicaciones sobre su cuenta y servicios. 
            Su información está protegida bajo estándares HIPAA.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
