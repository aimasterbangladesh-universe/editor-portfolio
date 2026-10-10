"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { BlogPost, BlogPostPayload } from "@/lib/blog-posts";

const EMPTY_FORM: BlogPostPayload = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  cover_image_url: "",
  published: false,
};

const inputClass =
  "w-full rounded-lg border border-charcoal/15 bg-background px-3 py-2 text-sm text-charcoal outline-none transition-colors focus:border-orange";
const labelClass = "block text-sm font-medium text-charcoal";

export default function BlogPostsPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogPostPayload>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Inline rather than window.confirm(), which blocks and is awkward to test.
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/blog-posts");
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "Could not load blog posts.");
      }
      setPosts(data.blogPosts ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load blog posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  function openCreateForm() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setFormError("");
    setFormOpen(true);
  }

  function openEditForm(post: BlogPost) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content ?? "",
      excerpt: post.excerpt ?? "",
      cover_image_url: post.cover_image_url ?? "",
      published: post.published,
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
        editingId
          ? `/api/admin/blog-posts/${editingId}`
          : "/api/admin/blog-posts",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "Could not save the blog post.");
      }
      setFormOpen(false);
      await loadPosts();
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
      const response = await fetch(`/api/admin/blog-posts/${id}`, {
        method: "DELETE",
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "Could not delete the blog post.");
      }
      setConfirmingDeleteId(null);
      await loadPosts();
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
          Blog Posts{" "}
          <span className="font-sans text-sm font-normal text-charcoal-light/60">
            ({posts.length})
          </span>
        </h2>
        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
        >
          <Plus size={16} aria-hidden="true" />
          Add New Post
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
            {editingId ? "Edit Blog Post" : "New Blog Post"}
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

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="slug">
                Slug
              </label>
              <input
                id="slug"
                placeholder="Leave blank to generate from the title"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className={`mt-1 ${inputClass}`}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="cover_image_url">
                Cover image URL
              </label>
              <input
                id="cover_image_url"
                value={form.cover_image_url ?? ""}
                onChange={(e) =>
                  setForm({ ...form, cover_image_url: e.target.value })
                }
                className={`mt-1 ${inputClass}`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="excerpt">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                rows={2}
                value={form.excerpt ?? ""}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className={`mt-1 ${inputClass}`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                rows={8}
                value={form.content ?? ""}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className={`mt-1 ${inputClass}`}
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-charcoal sm:col-span-2">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
                className="h-4 w-4 accent-orange"
              />
              Published (visible on the public blog)
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
              {saving ? "Saving…" : editingId ? "Save Changes" : "Create Post"}
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
              <th className="px-5 py-3 font-semibold">Slug</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-charcoal-light/60">
                  Loading…
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-charcoal-light/60">
                  No blog posts yet. Use “Add New Post” to create the first one.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-charcoal/5 last:border-0">
                  <td className="px-5 py-4 font-medium text-charcoal">
                    {post.title}
                  </td>
                  <td className="px-5 py-4 text-charcoal-light/75">
                    {post.slug}
                  </td>
                  <td className="px-5 py-4">
                    {post.published ? (
                      <span className="rounded-full bg-orange px-2.5 py-1 text-xs font-semibold text-white">
                        Published
                      </span>
                    ) : (
                      <span className="rounded-full border border-charcoal/20 px-2.5 py-1 text-xs font-semibold text-charcoal-light/60">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {confirmingDeleteId === post.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-charcoal-light/70">
                          Delete “{post.title}”?
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="rounded-full bg-orange-dark px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                        >
                          {deletingId === post.id ? "Deleting…" : "Yes, delete"}
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
                          onClick={() => openEditForm(post)}
                          aria-label={`Edit ${post.title}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/20 px-3 py-1.5 text-xs font-semibold text-charcoal transition-colors hover:border-orange hover:text-orange"
                        >
                          <Pencil size={13} aria-hidden="true" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingDeleteId(post.id)}
                          aria-label={`Delete ${post.title}`}
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
