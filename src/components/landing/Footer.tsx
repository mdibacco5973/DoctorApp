import { Stethoscope, Globe, Mail, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <Stethoscope className="w-8 h-8" />
              <span>DocApp</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La plataforma definitiva para la gestión médica moderna. Diseñada por expertos para profesionales de la salud.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Share2 className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Producto</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Funcionalidades</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Para Doctores</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Para Secretarias</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Seguridad</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Compañía</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Acerca de nosotros</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contacto</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Carreras</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Términos de servicio</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Política de privacidad</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 DocApp Inc. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ para la comunidad médica.</p>
        </div>
      </div>
    </footer>
  );
}
