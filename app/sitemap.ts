import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site-url";

const STATIC_PATHS = ["", "/about", "/services", "/portfolio", "/blog", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  // Published posts get their own entries. A database problem must not break
  // the sitemap, so fall back to the static routes alone.
  try {
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, created_at")
      .eq("published", true);

    for (const post of data ?? []) {
      entries.push({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.created_at),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    // Intentionally ignored — static entries are still valid.
  }

  return entries;
}
