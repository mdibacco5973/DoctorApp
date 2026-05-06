"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Stethoscope className="w-8 h-8" />
          <span>DocApp</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#features" className="hover:text-primary transition-colors">Funcionalidades</Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors">Cómo funciona</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Planes</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>Iniciar sesión</Link>
          <Link href="/subscribe" className={buttonVariants({ size: "sm" }) + " bg-primary hover:bg-primary/90 text-primary-foreground"}>
            Empezar ahora
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
