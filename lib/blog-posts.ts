export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
};

export type BlogPostPayload = {
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  cover_image_url: string | null;
  published: boolean;
};

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Trims to known columns so a caller cannot set `id` or `created_at`. */
export function parseBlogPostPayload(
  body: unknown,
): { ok: true; data: BlogPostPayload } | { ok: false; error: string } {
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

  const slugInput = text(raw.slug) ?? slugify(title);
  const slug = slugify(slugInput);
  if (!slug) return { ok: false, error: "Slug is required." };

  return {
    ok: true,
    data: {
      title,
      slug,
      content: text(raw.content),
      excerpt: text(raw.excerpt),
      cover_image_url: text(raw.cover_image_url),
      published: raw.published === true,
    },
  };
}
