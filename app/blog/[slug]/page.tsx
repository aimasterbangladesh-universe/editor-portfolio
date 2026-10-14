import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { formatPostDate, type BlogPost } from "@/lib/blog-posts";

export const dynamic = "force-dynamic";

type PageProps = { params: { slug: string } };

/** Only published posts are reachable — drafts 404 like any unknown slug. */
async function getPost(slug: string): Promise<BlogPost | null> {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  return (data as BlogPost | null) ?? null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post not found — Yogesh Gonnade" };

  return {
    title: `${post.title} — Yogesh Gonnade`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  // Content is stored as plain text. Blank lines separate paragraphs; single
  // newlines inside a paragraph are preserved by `whitespace-pre-line`.
  const paragraphs = (post.content ?? "")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <article className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal-light/70 transition-colors hover:text-orange-dark-text"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to blog
          </Link>

          <time
            dateTime={post.created_at}
            className="mt-10 block text-xs font-semibold uppercase tracking-[0.2em] text-orange-dark-text"
          >
            {formatPostDate(post.created_at)}
          </time>

          <h1 className="mt-3 text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="mt-5 text-pretty text-lg leading-relaxed text-charcoal-light/80">
              {post.excerpt}
            </p>
          ) : null}

          {post.cover_image_url ? (
            <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal/5">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          {paragraphs.length > 0 ? (
            <div className="mt-10 space-y-5">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="whitespace-pre-line text-pretty leading-relaxed text-charcoal-light/85"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-charcoal-light/70">
              This post has no content yet.
            </p>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
