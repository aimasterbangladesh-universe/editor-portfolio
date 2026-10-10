"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  PROJECT_CATEGORIES,
  type Project,
  type ProjectPayload,
} from "@/lib/projects";

const EMPTY_FORM: ProjectPayload = {
  title: "",
  category: PROJECT_CATEGORIES[0],
  thumbnail_url: "",
  video_url: "",
  description: "",
  is_featured: false,
  display_order: 0,
};

const inputClass =
  "w-full rounded-lg border border-charcoal/15 bg-background px-3 py-2 text-sm text-charcoal outline-none transition-colors focus:border-orange";
const labelClass = "block text-sm font-medium text-charcoal";

export default function ProjectsPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectPayload>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Inline rather than window.confirm(), which blocks and is awkward to test.
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/projects");
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "Could not load projects.");
      }
      setProjects(data.projects ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  function openCreateForm() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setFormError("");
    setFormOpen(true);
  }

  function openEditForm(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      category: project.category,
      thumbnail_url: project.thumbnail_url ?? "",
      video_url: project.video_url ?? "",
      description: project.description ?? "",
      is_featured: project.is_featured,
      display_order: project.display_order,
    });
    setFormError("");
    setFormOpen(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFormError("");

    try {
      const response = await fetch(
        editingId ? `/api/admin/projects/${editingId}` : "/api/admin/projects",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "Could not save the project.");
      }
      setFormOpen(false);
      await loadProjects();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError("");
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "Could not delete the project.");
      }
      setConfirmingDeleteId(null);
      await loadProjects();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-heading text-xl font-bold text-charcoal">
          Projects{" "}
          <span className="font-sans text-sm font-normal text-charcoal-light/60">
            ({projects.length})
          </span>
        </h2>
        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
        >
          <Plus size={16} aria-hidden="true" />
          Add New Project
        </button>
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-sm font-medium text-orange-dark">
          {error}
        </p>
      ) : null}

      {formOpen ? (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border border-charcoal/10 bg-white p-6"
        >
          <h3 className="font-heading text-lg font-bold text-charcoal">
            {editingId ? "Edit Project" : "New Project"}
          </h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="title">
                Title
              </label>
              <input
                id="title"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={`mt-1 ${inputClass}`}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="category">
                Category
              </label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={`mt-1 ${inputClass}`}
              >
                {PROJECT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="display_order">
                Display order
              </label>
              <input
                id="display_order"
                type="number"
                value={form.display_order}
                onChange={(e) =>
                  setForm({ ...form, display_order: Number(e.target.value) })
                }
                className={`mt-1 ${inputClass}`}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="thumbnail_url">
                Thumbnail URL
              </label>
              <input
                id="thumbnail_url"
                value={form.thumbnail_url ?? ""}
                onChange={(e) =>
                  setForm({ ...form, thumbnail_url: e.target.value })
                }
                className={`mt-1 ${inputClass}`}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="video_url">
                Video URL
              </label>
              <input
                id="video_url"
                value={form.video_url ?? ""}
                onChange={(e) =>
                  setForm({ ...form, video_url: e.target.value })
                }
                className={`mt-1 ${inputClass}`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className={`mt-1 ${inputClass}`}
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-charcoal sm:col-span-2">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) =>
                  setForm({ ...form, is_featured: e.target.checked })
                }
                className="h-4 w-4 accent-orange"
              />
              Featured on the homepage
            </label>
          </div>

          {formError ? (
            <p role="alert" className="mt-4 text-sm font-medium text-orange-dark">
              {formError}
            </p>
          ) : null}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-dark disabled:opacity-60"
            >
              {saving ? "Saving…" : editingId ? "Save Changes" : "Create Project"}
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="rounded-full border border-charcoal/20 px-6 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:bg-charcoal/5"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-charcoal/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-charcoal/10 text-xs uppercase tracking-wider text-charcoal-light/60">
            <tr>
              <th className="px-5 py-3 font-semibold">Title</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Featured</th>
              <th className="px-5 py-3 font-semibold">Order</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-charcoal-light/60">
                  Loading…
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-charcoal-light/60">
                  No projects yet. Use “Add New Project” to create the first one.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="border-b border-charcoal/5 last:border-0">
                  <td className="px-5 py-4 font-medium text-charcoal">
                    {project.title}
                  </td>
                  <td className="px-5 py-4 text-charcoal-light/75">
                    {project.category}
                  </td>
                  <td className="px-5 py-4">
                    {project.is_featured ? (
                      <span className="rounded-full bg-orange px-2.5 py-1 text-xs font-semibold text-white">
                        Featured
                      </span>
                    ) : (
                      <span className="text-charcoal-light/40">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 tabular-nums text-charcoal-light/75">
                    {project.display_order}
                  </td>
                  <td className="px-5 py-4">
                    {confirmingDeleteId === project.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-charcoal-light/70">
                          Delete “{project.title}”?
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id)}
                          disabled={deletingId === project.id}
                          className="rounded-full bg-orange-dark px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                        >
                          {deletingId === project.id ? "Deleting…" : "Yes, delete"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingDeleteId(null)}
                          className="rounded-full border border-charcoal/20 px-3 py-1.5 text-xs font-semibold text-charcoal"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(project)}
                          aria-label={`Edit ${project.title}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/20 px-3 py-1.5 text-xs font-semibold text-charcoal transition-colors hover:border-orange hover:text-orange"
                        >
                          <Pencil size={13} aria-hidden="true" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingDeleteId(project.id)}
                          aria-label={`Delete ${project.title}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/20 px-3 py-1.5 text-xs font-semibold text-charcoal transition-colors hover:border-orange-dark hover:text-orange-dark"
                        >
                          <Trash2 size={13} aria-hidden="true" />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
