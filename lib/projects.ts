export const PROJECT_CATEGORIES = [
  "News",
  "Documentary",
  "Corporate",
  "Short-Form",
] as const;

export type Project = {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string | null;
  video_url: string | null;
  description: string | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
};

export type ProjectPayload = {
  title: string;
  category: string;
  thumbnail_url: string | null;
  video_url: string | null;
  description: string | null;
  is_featured: boolean;
  display_order: number;
};

/** Trims to known columns so a caller cannot set `id` or `created_at`. */
export function parseProjectPayload(
  body: unknown,
): { ok: true; data: ProjectPayload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Expected a JSON object." };
  }

  const raw = body as Record<string, unknown>;
  const text = (value: unknown): string | null => {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  };

  const title = text(raw.title);
  if (!title) return { ok: false, error: "Title is required." };

  const category = text(raw.category);
  if (!category) return { ok: false, error: "Category is required." };

  const displayOrder = Number(raw.display_order ?? 0);
  if (!Number.isFinite(displayOrder)) {
    return { ok: false, error: "Display order must be a number." };
  }

  return {
    ok: true,
    data: {
      title,
      category,
      thumbnail_url: text(raw.thumbnail_url),
      video_url: text(raw.video_url),
      description: text(raw.description),
      is_featured: raw.is_featured === true,
      display_order: Math.trunc(displayOrder),
    },
  };
}
