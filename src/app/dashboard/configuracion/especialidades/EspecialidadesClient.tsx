"use client";

import { useState, useEffect, useTransition } from "react";
import {
  BookOpen,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Search,
  Check,
} from "lucide-react";
import {
  getSpecialties,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
} from "@/app/actions/specialties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Types ───────────────────────────────────────────────────────────────────

type Specialty = {
  id: string;
  name: string;
  createdAt: Date;
};

type ModalMode = "create" | "edit" | "delete" | null;

// ─── Component ───────────────────────────────────────────────────────────────

export default function EspecialidadesClient() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [filtered, setFiltered] = useState<Specialty[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selected, setSelected] = useState<Specialty | null>(null);
  const [inputName, setInputName] = useState("");
  const [formError, setFormError] = useState("");
  const [isPending, startTransition] = useTransition();

  // Inline edit (quick-edit directly on the row)
  const [inlineEditId, setInlineEditId] = useState<string | null>(null);
  const [inlineName, setInlineName] = useState("");
  const [inlineError, setInlineError] = useState("");
  const [isInlinePending, startInlineTransition] = useTransition();

  // ── Load ──
  const loadSpecialties = async () => {
    setLoading(true);
    const res = await getSpecialties();
    if (res.success && res.data) {
      setSpecialties(res.data as Specialty[]);
      setFiltered(res.data as Specialty[]);
    }
    setLoading(false);
  };

  useEffect(() => { loadSpecialties(); }, []);

  // ── Search ──
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(specialties.filter((s) => s.name.toLowerCase().includes(q)));
  }, [search, specialties]);

  // ── Modals ──
  const openCreate = () => {
    setInputName("");
    setFormError("");
    setModalMode("create");
  };

  const openDelete = (s: Specialty) => {
    setSelected(s);
    setFormError("");
    setModalMode("delete");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelected(null);
  };

  // ── Create submit ──
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    startTransition(async () => {
      const res = await createSpecialty(inputName);
      if (res?.error) {
        setFormError(res.error);
      } else {
        closeModal();
        await loadSpecialties();
      }
    });
  };

  // ── Inline edit ──
  const startInlineEdit = (s: Specialty) => {
    setInlineEditId(s.id);
    setInlineName(s.name);
    setInlineError("");
  };

  const cancelInlineEdit = () => {
    setInlineEditId(null);
    setInlineName("");
    setInlineError("");
  };

  const confirmInlineEdit = (id: string) => {
    setInlineError("");
    startInlineTransition(async () => {
      const res = await updateSpecialty(id, inlineName);
      if (res?.error) {
        setInlineError(res.error);
      } else {
        cancelInlineEdit();
        await loadSpecialties();
      }
    });
  };

  // ── Delete ──
  const handleDelete = () => {
    if (!selected) return;
    startTransition(async () => {
      const res = await deleteSpecialty(selected.id);
      if (res?.error) {
        setFormError(res.error);
      } else {
        closeModal();
        await loadSpecialties();
      }
    });
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Especialidades</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Configure las especialidades médicas disponibles en su consultorio.
          </p>
        </div>
        <Button
          id="btn-nueva-especialidad"
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          Nueva Especialidad
        </Button>
      </div>

      {/* Search */}
      {specialties.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="search-especialidades"
            placeholder="Buscar especialidad…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 bg-white dark:bg-zinc-900"
          />
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
          </div>
        ) : specialties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Sin especialidades</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Agregue las especialidades disponibles en su consultorio.
            </p>
            <Button
              onClick={openCreate}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Especialidad
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <Search className="w-9 h-9 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground text-sm">
              Sin resultados para "{search}".
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-zinc-50 dark:bg-zinc-800/50 text-left">
                <th className="px-6 py-3 font-semibold text-muted-foreground w-full">
                  Especialidad
                </th>
                <th className="px-6 py-3 font-semibold text-muted-foreground hidden sm:table-cell whitespace-nowrap">
                  Fecha de Alta
                </th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group"
                >
                  {/* Name — inline editable */}
                  <td className="px-6 py-3">
                    {inlineEditId === s.id ? (
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Input
                            id={`inline-edit-${s.id}`}
                            value={inlineName}
                            onChange={(e) => setInlineName(e.target.value)}
                            autoFocus
                            className="h-9 text-sm"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") confirmInlineEdit(s.id);
                              if (e.key === "Escape") cancelInlineEdit();
                            }}
                          />
                          <button
                            onClick={() => confirmInlineEdit(s.id)}
                            disabled={isInlinePending}
                            className="p-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors shrink-0"
                            title="Confirmar"
                          >
                            {isInlinePending ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Check className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={cancelInlineEdit}
                            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-muted-foreground transition-colors shrink-0"
                            title="Cancelar"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {inlineError && (
                          <p className="text-xs text-red-500 mt-0.5">{inlineError}</p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="font-medium">{s.name}</span>
                      </div>
                    )}
                  </td>

                  {/* Fecha */}
                  <td className="px-6 py-3 text-xs text-muted-foreground hidden sm:table-cell whitespace-nowrap">
                    {new Date(s.createdAt).toLocaleDateString("es-AR")}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-3">
                    {inlineEditId !== s.id && (
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          id={`btn-edit-${s.id}`}
                          onClick={() => startInlineEdit(s)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          id={`btn-delete-${s.id}`}
                          onClick={() => openDelete(s)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-border">
                <td colSpan={3} className="px-6 py-2.5 text-xs text-muted-foreground">
                  {filtered.length} especialidad{filtered.length !== 1 ? "es" : ""}
                  {search && ` · filtrando por "${search}"`}
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>

      {/* ── Modal Create ─────────────────────────────────────────────────────── */}
      {modalMode === "create" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-border overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold">Nueva Especialidad</h2>
              </div>
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="px-5 py-4 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="new-specialty-name">
                  Nombre de la especialidad
                </label>
                <Input
                  id="new-specialty-name"
                  placeholder="Ej: Cardiología, Pediatría…"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  autoFocus
                  required
                  className="h-11 bg-zinc-50 dark:bg-zinc-800/50"
                />
              </div>

              {formError && (
                <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl px-3 py-2">
                  {formError}
                </p>
              )}

              <div className="flex gap-3 pt-1">
                <Button type="button" variant="outline" className="flex-1" onClick={closeModal} disabled={isPending}>
                  Cancelar
                </Button>
                <Button
                  id="btn-guardar-especialidad"
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  disabled={isPending}
                >
                  {isPending ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Guardando...</>
                  ) : (
                    "Agregar"
                  )}
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
              <h2 className="text-lg font-bold mb-2">Eliminar Especialidad</h2>
              <p className="text-muted-foreground text-sm mb-6">
                ¿Está seguro que desea eliminar{" "}
                <strong>"{selected.name}"</strong>?
              </p>
              {formError && <p className="text-red-600 text-sm mb-4">{formError}</p>}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal} disabled={isPending}>
                  Cancelar
                </Button>
                <Button
                  id="btn-confirmar-eliminar-especialidad"
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
