"use client";

import { useState, useEffect, useTransition } from "react";
import {
  UserPlus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Stethoscope,
  Eye,
  EyeOff,
  Users,
  Phone,
  Mail,
  Search,
} from "lucide-react";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "@/app/actions/doctors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Types ───────────────────────────────────────────────────────────────────

type Doctor = {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  email: string;
  phone: string;
  createdAt: Date;
  user: { role: string } | null;
};

type ModalMode = "create" | "edit" | "delete" | null;

const emptyForm = {
  firstName: "",
  lastName: "",
  specialty: "",
  email: "",
  phone: "",
  password: "",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function DoctoresClient() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filtered, setFiltered] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selected, setSelected] = useState<Doctor | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [isPending, startTransition] = useTransition();

  // ── Load ──────────────────────────────────────────────────────────────────
  const loadDoctors = async () => {
    setLoading(true);
    const res = await getDoctors();
    if (res.success && res.data) {
      setDoctors(res.data as Doctor[]);
      setFiltered(res.data as Doctor[]);
    }
    setLoading(false);
  };

  useEffect(() => { loadDoctors(); }, []);

  // ── Search filter ─────────────────────────────────────────────────────────
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      doctors.filter(
        (d) =>
          d.firstName.toLowerCase().includes(q) ||
          d.lastName.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.email.toLowerCase().includes(q)
      )
    );
  }, [search, doctors]);

  // ── Modals ────────────────────────────────────────────────────────────────
  const openCreate = () => {
    setForm(emptyForm);
    setFormError("");
    setShowPassword(false);
    setSelected(null);
    setModalMode("create");
  };

  const openEdit = (doc: Doctor) => {
    setForm({
      firstName: doc.firstName,
      lastName: doc.lastName,
      specialty: doc.specialty,
      email: doc.email,
      phone: doc.phone,
      password: "",
    });
    setFormError("");
    setShowPassword(false);
    setSelected(doc);
    setModalMode("edit");
  };

  const openDelete = (doc: Doctor) => {
    setSelected(doc);
    setFormError("");
    setModalMode("delete");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelected(null);
  };

  // ── Submit Create / Edit ──────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    startTransition(async () => {
      let res;
      if (modalMode === "create") {
        res = await createDoctor(form);
      } else if (modalMode === "edit" && selected) {
        res = await updateDoctor(selected.id, form);
      } else return;

      if (res?.error) {
        setFormError(res.error);
      } else {
        closeModal();
        await loadDoctors();
      }
    });
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = () => {
    if (!selected) return;
    startTransition(async () => {
      const res = await deleteDoctor(selected.id);
      if (res?.error) {
        setFormError(res.error);
      } else {
        closeModal();
        await loadDoctors();
      }
    });
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Doctores</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gestione los médicos vinculados a su suscripción.
          </p>
        </div>
        <Button
          id="btn-nuevo-doctor"
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          Nuevo Doctor
        </Button>
      </div>

      {/* Search */}
      {doctors.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="search-doctores"
            placeholder="Buscar por nombre, especialidad…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 bg-white dark:bg-zinc-900"
          />
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : doctors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Sin doctores aún</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Agregue el primer doctor vinculado a su cuenta.
            </p>
            <Button
              onClick={openCreate}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Agregar Doctor
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground text-sm">
              No se encontraron resultados para "{search}".
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-zinc-50 dark:bg-zinc-800/50 text-left">
                  <th className="px-6 py-3 font-semibold text-muted-foreground">Doctor</th>
                  <th className="px-6 py-3 font-semibold text-muted-foreground">Especialidad</th>
                  <th className="px-6 py-3 font-semibold text-muted-foreground hidden md:table-cell">Contacto</th>
                  <th className="px-6 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Alta</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                  >
                    {/* Doctor */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 text-white font-bold text-sm">
                          {doc.firstName.charAt(0)}{doc.lastName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                            Dr. {doc.firstName} {doc.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">{doc.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Especialidad */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                        <Stethoscope className="w-3 h-3" />
                        {doc.specialty}
                      </span>
                    </td>
                    {/* Contacto */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {doc.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          {doc.email}
                        </div>
                      </div>
                    </td>
                    {/* Alta */}
                    <td className="px-6 py-4 text-xs text-muted-foreground hidden lg:table-cell">
                      {new Date(doc.createdAt).toLocaleDateString("es-AR")}
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          id={`btn-edit-${doc.id}`}
                          onClick={() => openEdit(doc)}
                          className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          id={`btn-delete-${doc.id}`}
                          onClick={() => openDelete(doc)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Modal Create / Edit ─────────────────────────────────────────────── */}
      {(modalMode === "create" || modalMode === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-border overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold">
                  {modalMode === "create" ? "Nuevo Doctor" : "Editar Doctor"}
                </h2>
              </div>
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              {/* Nombre + Apellido */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" htmlFor="doc-firstname">Nombre</label>
                  <Input
                    id="doc-firstname"
                    placeholder="Juan"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    required
                    className="h-11 bg-zinc-50 dark:bg-zinc-800/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" htmlFor="doc-lastname">Apellido</label>
                  <Input
                    id="doc-lastname"
                    placeholder="García"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    required
                    className="h-11 bg-zinc-50 dark:bg-zinc-800/50"
                  />
                </div>
              </div>

              {/* Especialidad */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="doc-specialty">Especialidad</label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="doc-specialty"
                    placeholder="Cardiología, Clínica General…"
                    value={form.specialty}
                    onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                    required
                    className="h-11 pl-10 bg-zinc-50 dark:bg-zinc-800/50"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="doc-email">Correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="doc-email"
                    type="email"
                    placeholder="doctor@ejemplo.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="h-11 pl-10 bg-zinc-50 dark:bg-zinc-800/50"
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="doc-phone">Teléfono móvil</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="doc-phone"
                    placeholder="+54 11 1234-5678"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    className="h-11 pl-10 bg-zinc-50 dark:bg-zinc-800/50"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="doc-pass">
                  Contraseña{" "}
                  {modalMode === "edit" && (
                    <span className="text-muted-foreground font-normal text-xs">(dejar vacío para no cambiar)</span>
                  )}
                </label>
                <div className="relative">
                  <Input
                    id="doc-pass"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required={modalMode === "create"}
                    className="h-11 pr-10 bg-zinc-50 dark:bg-zinc-800/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 text-sm rounded-xl">
                  {formError}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <Button type="button" variant="outline" className="flex-1" onClick={closeModal} disabled={isPending}>
                  Cancelar
                </Button>
                <Button
                  id="btn-guardar-doctor"
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  disabled={isPending}
                >
                  {isPending ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Guardando...</>
                  ) : modalMode === "create" ? "Crear Doctor" : "Guardar Cambios"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal Delete ────────────────────────────────────────────────────── */}
      {modalMode === "delete" && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-border p-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-red-500" />
              </div>
              <h2 className="text-lg font-bold mb-2">Eliminar Doctor</h2>
              <p className="text-muted-foreground text-sm mb-6">
                ¿Está seguro que desea eliminar al{" "}
                <strong>Dr. {selected.firstName} {selected.lastName}</strong>?
                Se eliminará también su acceso al sistema. Esta acción no se puede deshacer.
              </p>
              {formError && <p className="text-red-600 text-sm mb-4">{formError}</p>}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal} disabled={isPending}>
                  Cancelar
                </Button>
                <Button
                  id="btn-confirmar-eliminar"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
                  onClick={handleDelete}
                  disabled={isPending}
                >
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Eliminar"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
