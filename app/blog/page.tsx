import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { formatPostDate, type BlogPost } from "@/lib/blog-posts";

// Posts change whenever the admin panel is used, so render per request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Yogesh Gonnade",
  description:
    "Notes on editing, storytelling and working in news and media production.",
};

export default async function BlogPage() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const posts = (data ?? []) as BlogPost[];

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-dark-text">
            Blog
          </p>
          <h1 className="mt-4 text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
            Notes From the Edit
          </h1>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-charcoal-light/80">
            Thoughts on editing, storytelling and working to deadline in news
            and media production.
          </p>

          {error ? (
            <p
              role="alert"
              className="mt-14 rounded-2xl border border-dashed border-charcoal/20 px-6 py-16 text-center text-charcoal-light/70"
            >
              Could not load posts right now. Please try again later.
            </p>
          ) : posts.length === 0 ? (
            <p className="mt-14 rounded-2xl border border-dashed border-charcoal/20 px-6 py-16 text-center text-charcoal-light/70">
              No posts yet.
            </p>
          ) : (
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-orange"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal/5">
                    {post.cover_image_url ? (
                      <Image
                        src={post.cover_image_url}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-charcoal-light/25">
                        <FileText size={40} aria-hidden="true" />
                      </div>
                    )}
                  </div>

                  <time
                    dateTime={post.created_at}
                    className="mt-5 block text-xs font-semibold uppercase tracking-[0.2em] text-orange-dark-text"
                  >
                    {formatPostDate(post.created_at)}
                  </time>
                  <h2 className="mt-2 font-heading text-lg font-bold text-charcoal">
                    {post.title}
                  </h2>
                  {post.excerpt ? (
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-light/75">
                      {post.excerpt}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
