"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Stethoscope,
  LayoutDashboard,
  Users,
  CalendarDays,
  Settings,
  ChevronDown,
  ChevronRight,
  UserCog,
  Clock,
  Building2,
  LogOut,
  Menu,
  X,
  UserRound,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Pacientes",
    href: "/dashboard/pacientes",
    icon: Users,
  },
  {
    label: "Doctores",
    href: "/dashboard/doctores",
    icon: UserRound,
  },
  {
    label: "Turnos",
    href: "/dashboard/turnos",
    icon: CalendarDays,
  },
  {
    label: "Configuración",
    href: "/dashboard/configuracion",
    icon: Settings,
    children: [
      {
        label: "Doctor",
        href: "/dashboard/configuracion/doctor",
        icon: UserCog,
      },
      {
        label: "Especialidades",
        href: "/dashboard/configuracion/especialidades",
        icon: BookOpen,
      },
      {
        label: "Horarios de Atención",
        href: "/dashboard/configuracion/horarios",
        icon: Clock,
      },
      {
        label: "Consultorios",
        href: "/dashboard/configuracion/consultorios",
        icon: Building2,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [configOpen, setConfigOpen] = useState(
    pathname.startsWith("/dashboard/configuracion")
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/20">
          <Stethoscope className="w-5 h-5 text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">DocApp</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          if (item.children) {
            return (
              <div key={item.href}>
                <button
                  onClick={() => setConfigOpen(!configOpen)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {configOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {configOpen && (
                  <div className="mt-1 ml-3 pl-4 border-l border-white/20 space-y-1">
                    {item.children.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all",
                            childActive
                              ? "bg-white/20 text-white font-medium"
                              : "text-white/60 hover:bg-white/10 hover:text-white"
                          )}
                        >
                          <child.icon className="w-4 h-4 shrink-0" />
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/10">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Doctor</p>
            <p className="text-white/50 text-xs truncate">doctor@docapp.com</p>
          </div>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-blue-600 text-white shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-blue-700 to-indigo-800 shadow-2xl transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-white/70 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-gradient-to-b from-blue-700 to-indigo-800 shadow-xl">
        <SidebarContent />
      </aside>
    </>
  );
}
